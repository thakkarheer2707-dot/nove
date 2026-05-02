"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

type Review = {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

const SEEDED_REVIEWS: Review[] = [];

export default function ProductReviews() {
  return (
    <section className="py-24 border-t border-black/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Artisan Feedback.</h2>
          <div className="flex items-center space-x-4">
            <div className="flex text-gray-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="none" strokeWidth={1} />
              ))}
            </div>
            <span className="text-gray-500 font-medium tracking-wide">Be among the first to experience NOVE.</span>
          </div>
        </div>
        
        <button className="px-8 py-3 rounded-full border-2 border-[#1d1d1f] text-[#1d1d1f] text-sm hover:bg-[#1d1d1f] hover:text-white transition-all font-bold uppercase tracking-widest">
          Share Your Experience
        </button>
      </div>

      {SEEDED_REVIEWS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEEDED_REVIEWS.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] flex flex-col h-full border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-gray-300 group-hover:text-[#1d1d1f] transition-colors">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1} />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{review.date}</span>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#1d1d1f]">
                    {review.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-[#1d1d1f] font-semibold">{review.user}</span>
                </div>
                {review.verified && (
                  <div className="flex items-center space-x-1 text-[10px] text-gray-500 uppercase tracking-tighter font-bold">
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
    </section>
  );
}
