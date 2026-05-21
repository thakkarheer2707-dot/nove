"use client";

import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, CheckCircle, ShieldCheck, CreditCard, Truck, Mail, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useAuth } from "./AuthProvider";

// Dynamically loads the Razorpay checkout script only when needed
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type AuthStep = "idle" | "email" | "otp";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  // Auth State (Legacy/COD email verification)
  const [authStep, setAuthStep] = useState<AuthStep>("idle");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState("");

  // Shipping State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({ street: "", city: "", pincode: "", phone: "", email: "" });

  const recordOrder = async (orderEmail: string, integrityToken?: string) => {
    try {
      await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: orderEmail,
          integrityToken,
          orderDetails: {
            total: cartTotal,
            items: items,
            paymentMethod: paymentMethod,
            shippingAddress: address
          }
        }),
      });
    } catch (err) {
      console.error("Failed to record order history:", err);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    // First validate if we have address
    if (!address.street || !address.city || !address.pincode || !address.phone) {
      setShowAddressForm(true);
      return;
    }

    if (paymentMethod === "cod") {
      // Direct placement for COD (Guest or User)
      setIsProcessing(true);
      try {
        await recordOrder(user?.email || address.email);
        setPaymentSuccess(true);
        if (clearCart) clearCart();
      } catch (err) {
        alert("Failed to place order. Please try again.");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // --- PAY ONLINE (RAZORPAY) ---
    setIsProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const order = await res.json();

      if (!order.id) throw new Error("Order creation failed. Please try again.");

      if (order._isDemoMode) {
        await new Promise((r) => setTimeout(r, 1400));
        // For demo mode, we might need a dummy token if the server requires it, 
        // but usually we'll handle it in the verify API
        const verifyRes = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ razorpay_order_id: order.id, razorpay_payment_id: "demo", razorpay_signature: "demo" }),
        });
        const verifyData = await verifyRes.json();
        
        if (user) await recordOrder(user.email, verifyData.integrityToken);
        setIsProcessing(false);
        setPaymentSuccess(true);
        if (clearCart) clearCart();
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Payment gateway failed to load. Check your internet connection.");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NOVE Luxury",
        description: "Premium Handbag Collection",
        image: "/favicon.ico",
        order_id: order.id,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verifyRes.json();
          if (result.success) {
            if (user) await recordOrder(user.email, result.integrityToken);
            setPaymentSuccess(true);
            if (clearCart) clearCart();
          }
          else alert("Payment verification failed. Please contact support@nove.in");
        },
        prefill: { name: user?.name || "Guest", email: user?.email || address.email, contact: address.phone },
        theme: { color: "#1d1d1f" },
        modal: { ondismiss: () => setIsProcessing(false) },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        alert(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout error occurred.";
      alert(msg);
      setIsProcessing(false);
    }
  };


  const handleSendOtp = async () => {
    if (!email.includes("@")) {
      setAuthError("Please enter a valid email.");
      return;
    }
    setAuthError("");
    setIsProcessing(true);
    try {
      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      setAuthStep("otp");
    } catch (e: any) {
      setAuthError(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      setAuthError("Please enter the complete verification code.");
      return;
    }
    setAuthError("");
    setIsProcessing(true);
    try {
      const res = await fetch("/api/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed.");

      // Success! Record order to the logged-in user OR the verified email
      await recordOrder(user?.email || email);

      setAuthStep("idle");
      setPaymentSuccess(true);
      if (clearCart) clearCart();
    } catch (e: any) {
      setAuthError(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#fbfbfd]/95 backdrop-blur-3xl border-l border-black/5 z-50 flex flex-col shadow-2xl"
          >
            {/* ── Payment Success Overlay ── */}
            <AnimatePresence>
              {paymentSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-[#fbfbfd] z-30 flex flex-col items-center justify-center text-center p-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                    className="mb-8"
                  >
                    <CheckCircle size={72} strokeWidth={1} className="text-[#1d1d1f]" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-[#1d1d1f] mb-3 tracking-tight">Order Placed!</h2>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    Welcome to the world of NOVE.<br />Your masterpiece is on its way.
                  </p>
                  
                  {paymentMethod === "cod" && (
                    <div className="bg-white border border-black/5 shadow-sm rounded-2xl p-5 mb-10 w-full text-left flex items-start space-x-4">
                      <Truck size={24} className="text-[#1d1d1f] flex-shrink-0" />
                      <div>
                        <h4 className="text-[#1d1d1f] font-bold mb-1">Cash on Delivery</h4>
                        <p className="text-sm text-gray-500 leading-snug">Please keep exact change ready. You will pay ₹{cartTotal.toLocaleString()} at the time of delivery.</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => { setPaymentSuccess(false); setIsCartOpen(false); }}
                    className="px-10 py-4 bg-[#1d1d1f] text-white rounded-full font-bold hover:bg-black transition-colors w-full shadow-lg shadow-black/10"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── SHIPPING ADDRESS OVERLAY ── */}
            <AnimatePresence>
              {showAddressForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#fbfbfd] z-40 flex flex-col p-8"
                >
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/5 pt-2">
                    <h2 className="text-xl font-bold text-[#1d1d1f] tracking-widest uppercase">Delivery Details</h2>
                    <button onClick={() => setShowAddressForm(false)} className="text-gray-400 hover:text-[#1d1d1f] transition-colors bg-black/5 p-2 rounded-full">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-8">
                     <p className="text-gray-500 font-medium text-sm leading-relaxed">
                        Where should we dispatch your NOVE artisan selections? Please provide a precise destination.
                     </p>

                     <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 block">Street Address / Apartment</label>
                        <input 
                          type="text"
                          placeholder="Ex: 123 Luxury Lane, Suite 402"
                          value={address.street}
                          onChange={(e) => setAddress({...address, street: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[#1d1d1f] placeholder:text-gray-400 focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] focus:outline-none transition-all shadow-sm"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 block">City</label>
                           <input 
                            type="text"
                            placeholder="MUMBAI"
                            value={address.city}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[#1d1d1f] placeholder:text-gray-400 focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] focus:outline-none transition-all shadow-sm"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 block">Pincode</label>
                           <input 
                            type="text"
                            placeholder="400001"
                            maxLength={6}
                            value={address.pincode}
                            onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, '')})}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[#1d1d1f] placeholder:text-gray-400 focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] focus:outline-none transition-all tracking-[0.2em] shadow-sm"
                           />
                        </div>
                     </div>

                     <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 block">Mobile Number</label>
                        <input 
                          type="tel"
                          placeholder="Ex: 9876543210"
                          value={address.phone}
                          onChange={(e) => setAddress({...address, phone: e.target.value.replace(/\D/g, '')})}
                          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[#1d1d1f] placeholder:text-gray-400 focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] focus:outline-none transition-all tracking-[0.1em] shadow-sm"
                        />
                     </div>

                    {(!user || user.isGuest) &&(
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 block">Email Address (For Order Tracking)</label>
                          <input 
                            type="email"
                            placeholder="you@example.com"
                            value={address.email}
                            onChange={(e) => setAddress({...address, email: e.target.value})}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[#1d1d1f] placeholder:text-gray-400 focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                      )}

                      <div className="pt-8">
                        <button
                          onClick={() => {
                            const isEmailValid = (user && !user.isGuest) || (address.email && address.email.includes("@"));
                            if (address.street && address.city && address.pincode.length >= 6 && address.phone.length >= 10 && isEmailValid) {
                              setShowAddressForm(false);
                            } else {
                              alert("Please complete every field accurately (ensure valid email, pincode and phone number).");
                            }
                          }}
                          className="w-full bg-[#1d1d1f] text-white py-5 rounded-full font-bold hover:bg-black transition-colors shadow-lg shadow-black/10 active:scale-[0.98]"
                        >
                          {paymentMethod === "online" ? "Save & Continue to Payment" : "Save & Place Order"}
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Header ── */}
            <div className="flex items-center justify-between p-8 border-b border-black/5 pt-10">
              <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">Your Bag.</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-[#1d1d1f] bg-black/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Cart Items ── */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center">
                    <Trash2 size={24} className="text-gray-400" />
                  </div>
                  <p className="font-medium tracking-wide">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex space-x-6">
                    <div className="relative w-28 h-32 bg-white rounded-[20px] p-2 flex-shrink-0 shadow-sm border border-black/5">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col py-1 justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[#1d1d1f] font-semibold text-base tracking-tight leading-snug">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.color)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">{item.color}</p>
                      <div className="mt-auto flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Qty: {item.quantity}</span>
                        <span className="text-[#1d1d1f] font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Checkout Footer ── */}
            {items.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-white">
                
                {/* Payment Method Selector */}
                <div className="mb-6 space-y-3">
                  <button 
                    onClick={() => setPaymentMethod("online")}
                    className={`w-full flex items-center justify-between p-4 rounded-[20px] border transition-all ${
                      paymentMethod === "online" ? "border-[#1d1d1f] bg-black/5 shadow-sm" : "border-gray-200 bg-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard size={20} className={paymentMethod === "online" ? "text-[#1d1d1f]" : "text-gray-400"} />
                      <span className={`text-sm font-bold ${paymentMethod === "online" ? "text-[#1d1d1f]" : "text-gray-500"}`}>Pay Online (UPI/Cards)</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-[#1d1d1f]" : "border-gray-300"}`}>
                      {paymentMethod === "online" && <div className="w-2 h-2 rounded-full bg-[#1d1d1f]" />}
                    </div>
                  </button>

                  <button 
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full flex items-center justify-between p-4 rounded-[20px] border transition-all ${
                      paymentMethod === "cod" ? "border-[#1d1d1f] bg-black/5 shadow-sm" : "border-gray-200 bg-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Truck size={20} className={paymentMethod === "cod" ? "text-[#1d1d1f]" : "text-gray-400"} />
                      <span className={`text-sm font-bold ${paymentMethod === "cod" ? "text-[#1d1d1f]" : "text-gray-500"}`}>Cash on Delivery</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-[#1d1d1f]" : "border-gray-300"}`}>
                      {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-[#1d1d1f]" />}
                    </div>
                  </button>
                </div>

                <div className="flex justify-between text-[#1d1d1f] mb-6">
                  <span className="font-medium text-gray-500">Total</span>
                  <span className="font-bold text-2xl tracking-tight">₹{cartTotal.toLocaleString()}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#1d1d1f] text-white py-5 rounded-full flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-lg shadow-black/10 active:scale-[0.98] disabled:opacity-60 font-bold"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      {paymentMethod === "online" ? <ShieldCheck size={18} /> : <Truck size={18} />}
                      <span className="tracking-wide text-sm">
                        {paymentMethod === "online" ? "Secure Checkout" : "Continue to Verify"}
                      </span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-6 font-bold">
                  {paymentMethod === "online" ? "256-bit SSL Encrypted · Powered by Razorpay" : "Verified 1-Click Checkout Experience"}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
