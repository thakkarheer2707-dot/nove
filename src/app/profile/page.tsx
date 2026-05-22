"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, User, LogOut, ChevronRight, ShoppingBag, Clock, CreditCard, Truck, Heart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistProvider";
import OrderTimeline from "@/components/OrderTimeline";

interface Order {
  id: string;
  date: string;
  total: number;
  items: any[];
  status: string;
  paymentMethod: string;
  shippingAddress?: {
    street: string;
    city: string;
    pincode: string;
  };
}

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user && !user.isGuest) {
      fetch(`/api/orders/history?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrders(data.orders);
          }
        })
        .catch(err => console.error("Error fetching orders:", err))
        .finally(() => setFetchingOrders(false));
    } else if (user && user.isGuest) {
      setFetchingOrders(false);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 border-t-[#1d1d1f] rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-2 tracking-tight">Bonjour, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500 font-medium text-lg">Manage your NOVE experience and collection.</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-[#1d1d1f] transition-colors text-sm uppercase tracking-widest font-bold"
          >
            Sign Out <LogOut size={16} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar / Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <User size={32} className="text-[#1d1d1f]" />
              </div>
              <h3 className="text-lg font-bold mb-1">{user.name}</h3>
              <p className="text-gray-500 text-sm font-medium mb-6">{user.email}</p>
              
              <button className="w-full py-3 bg-black/5 hover:bg-black/10 rounded-xl text-sm font-bold transition-all">
                Edit Profile
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">Membership</h3>
              <div className="flex items-center gap-3">
                {user.isGuest ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="font-bold tracking-tight text-sm text-gray-500">Guest Status</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="font-bold tracking-tight text-sm">NOVE Elite Status</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content / Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {user.isGuest && (
              <div className="bg-gradient-to-br from-[#1d1d1f] to-[#424245] text-white rounded-[32px] p-8 shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">Unlock the Full NOVE Experience</h3>
                <p className="text-gray-300 font-light text-sm mb-6 max-w-md leading-relaxed">
                  You are currently browsing as a guest. Create a permanent account to enjoy Elite membership privileges, track all your past collections, and manage your artisan selections.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold hover:bg-gray-100 transition-all shadow-md group"
                >
                  Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-[40px] p-10 min-h-[400px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Recent Orders</h2>
                <span className="bg-black/5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-gray-500">
                  {orders.length} TOTAL
                </span>
              </div>

              {fetchingOrders ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="w-6 h-6 border-2 border-black/10 border-t-[#1d1d1f] rounded-full animate-spin" />
                  <p className="text-gray-500 text-sm font-medium">Retrieving your collection...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="group flex flex-col"
                    >
                      <div 
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className={`bg-[#fbfbfd] hover:bg-black/5 border transition-all flex items-center justify-between p-6 cursor-pointer ${expandedOrder === order.id ? 'rounded-t-[32px] border-gray-300' : 'rounded-[32px] border-gray-200'}`}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                            <ShoppingBag size={20} className="text-gray-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold tracking-tight text-sm">Order #{order.id.slice(-6).toUpperCase()}</h4>
                              <span className={`flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border ${
                                order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 
                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                'bg-orange-50 text-orange-700 border-orange-200'
                              }`}>
                                {order.status !== 'Delivered' && <span className="w-1 h-1 rounded-full bg-current animate-pulse" />}
                                {order.status || 'Artisan Crafting'}
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-4">
                              <span>{order.date}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300" />
                              <span>{order.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="text-lg font-bold tracking-tight">₹{order.total.toLocaleString('en-IN')}</div>
                             <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{order.items.length} Items</div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedOrder === order.id ? 90 : 0 }}
                          >
                            <ChevronRight size={18} className="text-gray-400" />
                          </motion.div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedOrder === order.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-[#fbfbfd] border-x border-b border-gray-300 rounded-b-[32px]"
                          >
                            <div className="p-8 border-t border-gray-200">
                               <h5 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-6">Artisan Journey</h5>
                               <OrderTimeline currentStatus={order.status || 'Artisan Crafting'} />
                               
                               <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
                                  <div>
                                     <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Destination</h5>
                                     <p className="text-sm font-medium text-[#1d1d1f] leading-relaxed">
                                        {order.shippingAddress?.street}<br />
                                        {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
                                     </p>
                                  </div>
                                  <div>
                                     <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Service</h5>
                                     <div className="flex items-center gap-2 text-sm font-medium text-[#1d1d1f]">
                                        <Truck size={16} className="text-gray-600" />
                                        <span>Concierge Shipping (2-4 Days)</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-[#fbfbfd] border border-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Package size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                  <p className="text-gray-500 font-medium mb-8 max-w-xs text-sm">Your NOVE journey begins with your first selection.</p>
                  <Link 
                    href="/store"
                    className="bg-[#1d1d1f] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-black transition-colors"
                  >
                    Explore Collection
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist Section */}
            <div id="wishlist" className="bg-white border border-gray-200 rounded-[40px] p-10 min-h-[300px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Heart size={24} className="text-[#1d1d1f]" />
                  <h2 className="text-2xl font-bold tracking-tight">Artisan Wishlist</h2>
                </div>
                <span className="bg-black/5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-gray-500">
                  {wishlist.length} ITEMS
                </span>
              </div>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="group bg-[#fbfbfd] hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm rounded-3xl p-4 transition-all flex items-center gap-4">
                       <div className="relative w-16 h-20 bg-white border border-gray-50 rounded-2xl p-2 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#1d1d1f] mb-1 line-clamp-1">{item.name}</h4>
                          <p className="text-xs font-medium text-gray-500">₹{item.price.toLocaleString()}</p>
                       </div>
                       <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                          >
                             <Trash2 size={14} />
                          </button>
                          <Link 
                            href={`/product/${item.id}`}
                            className="p-2 bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-colors flex items-center justify-center"
                          >
                             <ArrowRight size={14} />
                          </Link>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart size={32} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 text-sm font-medium">Your wishlist is waiting for its first masterpiece.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
