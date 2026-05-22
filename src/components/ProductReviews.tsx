"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, MessageSquare, X } from "lucide-react";
import { useAuth } from "./AuthProvider";

type Review = {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

const DEFAULT_SEEDED_REVIEWS: Review[] = [
  {
    id: "rev-1",
    user: "Rajesh Sharma",
    rating: 5,
    date: "14 May 2026",
    comment: "The NOVE Ember bag is an absolute masterpiece. The structure and organic feel of the leather are outstanding. Insured concierge delivery was flawless.",
    verified: true
  },
  {
    id: "rev-2",
    user: "Aishwarya Sen",
    rating: 5,
    date: "19 May 2026",
    comment: "I am in awe of the Aero series. Minimalist design done to perfection. Will definitely be purchasing from the next edition.",
    verified: true
  }
];

export default function ProductReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nove_reviews");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(DEFAULT_SEEDED_REVIEWS);
      }
    } else {
      setReviews(DEFAULT_SEEDED_REVIEWS);
      localStorage.setItem("nove_reviews", JSON.stringify(DEFAULT_SEEDED_REVIEWS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    
    // Simulate slight delay for ultra-premium UX feel
    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        user: name.trim() || user?.name || "Anonymous Guest",
        rating,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        comment: comment.trim(),
        verified: !!user && !user.isGuest
      };

      const updated = [newReview, ...reviews];
      setReviews(updated);
      localStorage.setItem("nove_reviews", JSON.stringify(updated));

      // Reset
      setName("");
      setRating(5);
      setComment("");
      setShowForm(false);
      setSubmitting(false);
      
      alert("Thank you for sharing your experience! Your review is now live.");
    }, 800);
  };

  return (
    <section className="py-24 border-t border-black/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Artisan Feedback.</h2>
          <div className="flex items-center space-x-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" className="stroke-none" />
              ))}
            </div>
            <span className="text-gray-500 font-medium tracking-wide">
              {reviews.length} Experiences Shared
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => {
            if (user) {
              setName(user.name);
            }
            setShowForm(true);
          }}
          className="px-8 py-3 rounded-full border-2 border-[#1d1d1f] text-[#1d1d1f] text-sm hover:bg-[#1d1d1f] hover:text-white transition-all font-bold uppercase tracking-widest cursor-pointer"
        >
          Share Your Experience
        </button>
      </div>

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] flex flex-col h-full border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < review.rating ? "currentColor" : "none"} 
                      className={i < review.rating ? "stroke-none" : "text-gray-200 stroke-current"} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{review.date}</span>
              </div>

              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold text-[#1d1d1f]">
                    {review.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-[#1d1d1f] font-semibold">{review.user}</span>
                </div>
                {review.verified && (
                  <div className="flex items-center space-x-1 text-[10px] text-green-600 uppercase tracking-tighter font-bold">
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 rounded-[48px] bg-white border border-dashed border-gray-200 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-400">
             <Star size={32} strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-serif text-[#1d1d1f] mb-2">No reviews yet.</h3>
          <p className="text-gray-500 font-light max-w-sm">Be one of our early adopters and share your thoughts on the Edition 01 collection.</p>
        </div>
      )}

      {/* Review Submission Modal Dialog */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-6 md:inset-auto md:w-[480px] bg-white rounded-[40px] shadow-2xl z-[101] flex flex-col p-10 self-center justify-self-center border border-gray-100"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-8 text-gray-400 hover:text-black transition-colors bg-black/5 p-2 rounded-full cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#fbfbfd] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-black/5">
                  <MessageSquare size={24} className="text-[#1d1d1f]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Share Your Experience</h3>
                <p className="text-gray-400 font-light text-sm mt-1">We cherish your luxury aesthetic perspective.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder={user?.name || "Ex: Rajesh Sharma"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl px-5 py-4 text-[#1d1d1f] placeholder:text-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3 block">Craftsmanship Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        onMouseEnter={() => setHoveredStar(num)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={28}
                          className="transition-colors"
                          fill={num <= (hoveredStar ?? rating) ? "#fbbf24" : "none"}
                          color={num <= (hoveredStar ?? rating) ? "#fbbf24" : "#e5e7eb"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Your Perspective / Review</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the texture, weight, structure, or design aesthetic…"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#fbfbfd] border border-gray-100 rounded-2xl px-5 py-4 text-[#1d1d1f] placeholder:text-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none transition-all shadow-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1d1d1f] text-white py-5 rounded-full font-bold hover:bg-black transition-colors shadow-lg shadow-black/10 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Publish Review"
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// Simple loader helper inside this component
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin h-5 w-5 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
