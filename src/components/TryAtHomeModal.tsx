"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Sparkles, MapPin, Calendar, Clock, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { products } from "@/data/products";

interface TryAtHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TryAtHomeModal({ isOpen, onClose }: TryAtHomeModalProps) {
  const [selectedBags, setSelectedBags] = useState<string[]>(["ember", "terra"]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Mumbai",
    preferredDate: "",
    preferredTime: "11:00 AM - 01:00 PM"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleBagSelection = (id: string) => {
    if (selectedBags.includes(id)) {
      if (selectedBags.length > 1) {
        setSelectedBags(selectedBags.filter((b) => b !== id));
      }
    } else {
      if (selectedBags.length < 3) {
        setSelectedBags([...selectedBags, id]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl md:rounded-[36px] shadow-2xl z-10 border border-black/5 p-6 sm:p-8 md:p-10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-[#1d1d1f] cursor-pointer z-20"
            >
              <X size={18} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1d1d1f]">Private Trial Booked</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || "valued client"}. Our concierge will contact you via WhatsApp at {formData.phone || "your number"} to confirm your door appointment.
                  </p>
                </div>
                <div className="bg-[#fbfbfd] p-4 rounded-2xl border border-black/5 max-w-md mx-auto text-left space-y-2">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">Selected Handbags ({selectedBags.length})</div>
                  <div className="text-sm font-medium text-[#1d1d1f]">
                    {selectedBags.map((id) => products.find((p) => p.id === id)?.name).join(", ")}
                  </div>
                </div>
                <button
                  onClick={resetAndClose}
                  className="bg-[#1d1d1f] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="space-y-2 mb-8 pr-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#9b4922] text-[10px] uppercase font-bold tracking-widest">
                    <Sparkles size={12} />
                    Complimentary · Mumbai &amp; Metro
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-[#1d1d1f] font-semibold">
                    Try at home. No pressure.
                  </h2>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    Select up to 3 bags. We bring them directly to your door so you can feel the plant-based leather and see them in your natural light before deciding.
                  </p>
                </div>

                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span>Choose up to 3 bags</span>
                      <span>{selectedBags.length} / 3 selected</span>
                    </div>

                    {/* Bags Selection Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                      {products.map((bag) => {
                        const isSelected = selectedBags.includes(bag.id);
                        const image = bag.variants[0]?.images[0] || "/products/Ember/ember_5.png";
                        return (
                          <div
                            key={bag.id}
                            onClick={() => toggleBagSelection(bag.id)}
                            className={`relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col items-center text-center ${
                              isSelected
                                ? "border-black bg-stone-50/70 shadow-sm"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <div className="relative w-28 h-28 mb-3">
                              <Image
                                src={image}
                                alt={bag.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider">{bag.name}</div>
                            <div className="text-xs text-gray-400 font-light mt-0.5">₹{bag.basePrice.toLocaleString()}</div>
                            
                            {/* Checkmark badge */}
                            <div
                              className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                                isSelected ? "bg-black text-white" : "border border-gray-300 text-transparent"
                              }`}
                            >
                              ✓
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={selectedBags.length === 0}
                      className="w-full mt-4 bg-[#1d1d1f] hover:bg-black text-white py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Choose Date &amp; Address →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ananya Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Apartment, Street, Area (e.g. Bandra West, Mumbai)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                          Time Slot
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black bg-white"
                        >
                          <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                          <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                          <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                          <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3.5 rounded-full border border-gray-300 text-xs uppercase tracking-widest font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                      >
                        Confirm Complimentary Booking
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
