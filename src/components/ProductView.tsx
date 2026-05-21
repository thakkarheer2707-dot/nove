"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ShieldCheck, Truck, Award, Recycle, Heart, ShieldAlert, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";
import { useWishlist } from "./WishlistProvider";
import Link from "next/link";
import { Product, ProductVariant } from "@/data/products";

const getColorCode = (colorName: string) => {
  const map: Record<string, string> = {
    'Black': '#1c1c1e',
    'Olive Green': '#4a5d23',
    'White': '#f8f9fa',
    'Cherry Red': '#990f02',
    'Dusty Pink': '#dcae96',
    'Heather Brown': '#6b4f4f'
  };
  return map[colorName] || '#1c1c1e';
};

export default function ProductView({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const { addToCart } = useCart();
  const { user, loginAsGuest } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextImage();
    } else if (info.offset.x > swipeThreshold) {
      prevImage();
    }
    setTimeout(() => setIsDragging(false), 50);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedVariant.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedVariant.images.length) % selectedVariant.images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomActive) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setLensPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthGate(true);
      return;
    }

    addToCart({
      id: `${product.id}-${selectedVariant.color.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${product.name} - ${selectedVariant.color}`,
      price: selectedVariant.price || product.basePrice,
      image: selectedVariant.images[0],
      color: selectedVariant.color,
      quantity: 1
    });
  };

  const price = selectedVariant.price || product.basePrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
      {/* Left: Image Viewer */}
      <div className="flex flex-col space-y-6 lg:sticky lg:top-32 h-fit">
        <div 
          className={`relative aspect-[4/5] glass-panel rounded-[40px] flex items-center justify-center p-8 md:p-12 overflow-hidden group/viewer ${isZoomActive ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onMouseMove={handleMouseMove}
          onClick={() => !isDragging && setIsZoomActive(!isZoomActive)}
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${selectedVariant.color}-${currentImageIndex}`}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
              className="relative w-full h-full touch-none"
            >
              <Image 
                src={selectedVariant.images[currentImageIndex]} 
                alt={`${product.name} ${selectedVariant.color}`} 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain product-image pointer-events-none"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Magnifying Lens - Only when enabled */}
          <AnimatePresence>
            {isZoomActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[40px]"
              >
                <div 
                  className="absolute w-full h-full transition-transform duration-300 ease-out"
                  style={{
                    backgroundImage: `url(${selectedVariant.images[currentImageIndex]})`,
                    backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                    backgroundSize: '250%',
                    transform: 'scale(1.02)',
                  }}
                />
                <div className="absolute inset-0 border-[30px] border-white/10 backdrop-blur-[2px] rounded-[40px] pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PC Navigation Arrows */}
          <div className="hidden md:block">
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-black opacity-0 group-hover/viewer:opacity-100 transition-all hover:bg-white hover:scale-110 z-20"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-black opacity-0 group-hover/viewer:opacity-100 transition-all hover:bg-white hover:scale-110 z-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Zoom Toggle Indicator */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomActive(!isZoomActive); }}
            className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-black transition-all hover:bg-white z-20 flex items-center gap-2"
          >
            {isZoomActive ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">
              {isZoomActive ? 'Exit Detail' : 'View Detail'}
            </span>
          </button>

          {/* Image Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {selectedVariant.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? "w-8 bg-black/60" : "w-1.5 bg-black/10 hover:bg-black/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        {selectedVariant.images.length > 1 && (
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {selectedVariant.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`relative w-20 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
        
        {/* Color Selection (Mobile Optimized Position) */}
        <div className="lg:hidden pt-4 border-t border-black/5 mt-4">
          <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest mb-4">
            Finish: <span className="text-gray-500 font-medium">{selectedVariant.color}</span>
          </h3>
          <div className="flex space-x-4">
            {product.variants.map((variant) => (
              <button 
                key={variant.color} 
                onClick={() => handleVariantChange(variant)}
                className="group flex flex-col items-center"
              >
                <div 
                  className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedVariant.color === variant.color ? 'border-black scale-110' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: getColorCode(variant.color) }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex flex-col justify-center py-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">Edition 01</span>
          <span className="w-1 h-1 rounded-full bg-gray-700"></span>
          <span className="text-[10px] tracking-widest text-[#a8a8a9] uppercase font-bold border border-black/5 px-2 py-0.5 rounded">Limited Batch</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] mb-6 tracking-tight">{product.name}</h1>
        
        <div className="flex items-baseline space-x-4 mb-8">
          <p className="text-4xl font-medium text-[#1d1d1f]">₹{price.toLocaleString()}</p>
        </div>
        
        <div className="h-px w-full bg-black/5 mb-10"></div>
        
        {/* Color Selection (Desktop Position) */}
        <div className="hidden lg:block mb-10">
          <h3 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-4">
            Finish: <span className="text-gray-500 font-medium">{selectedVariant.color}</span>
          </h3>
          <div className="flex space-x-4">
            {product.variants.map((variant) => (
              <button 
                key={variant.color} 
                onClick={() => handleVariantChange(variant)}
                className="group flex flex-col items-center space-y-2"
              >
                <div 
                  className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedVariant.color === variant.color ? 'border-black scale-110' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: getColorCode(variant.color) }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-[#424245] font-light leading-relaxed mb-8 text-xl">
          {product.description}
        </p>

        {/* Technical Specifications */}
        <div className="bg-[#fbfbfd] border border-gray-100 rounded-[32px] p-8 mb-10">
          <h3 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-6 flex items-center gap-2">
            <Maximize2 size={16} />
            Dimensions & Capacity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Height</span>
              <p className="text-sm text-[#1d1d1f] font-medium">{product.dimensions.height}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Width</span>
              <p className="text-sm text-[#1d1d1f] font-medium">{product.dimensions.width}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Depth</span>
              <p className="text-sm text-[#1d1d1f] font-medium">{product.dimensions.depth}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Capacity</span>
              <p className="text-sm text-[#1d1d1f] font-medium">{product.dimensions.capacity}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#1d1d1f] text-white rounded-[24px] py-6 text-xl font-bold hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
          >
            Add to Bag
          </button>

          <button 
            onClick={() => {
              if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist({
                  id: product.id,
                  name: product.name,
                  price: price,
                  image: selectedVariant.images[0]
                });
              }
            }}
            className={`w-20 h-20 rounded-[24px] flex items-center justify-center border-2 transition-all active:scale-[0.98] ${
              isInWishlist(product.id) 
                ? 'bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-xl shadow-black/10' 
                : 'bg-white border-gray-100 text-[#1d1d1f] hover:border-gray-200 shadow-lg shadow-black/[0.02]'
            }`}
          >
            <Heart size={28} className={isInWishlist(product.id) ? "fill-current" : ""} />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-8 pt-10 border-t border-black/5">
          <div className="flex items-start space-x-4">
             <div className="mt-1 p-2 rounded-xl bg-black/5 text-gray-600">
                <Award size={20} />
             </div>
             <div>
                <h4 className="text-[#1d1d1f] text-sm font-bold mb-1">Artisan Warranty</h4>
                <p className="text-xs text-[#86868b] font-light leading-relaxed">1-year global craftsmanship warranty.</p>
             </div>
          </div>
          <div className="flex items-start space-x-4">
             <div className="mt-1 p-2 rounded-xl bg-black/5 text-gray-600">
                <Recycle size={20} />
             </div>
             <div>
                <h4 className="text-[#1d1d1f] text-sm font-bold mb-1">Sustainable Soul</h4>
                <p className="text-xs text-[#86868b] font-light leading-relaxed">Carbon-neutral eucalyptus leather.</p>
             </div>
          </div>
          <div className="flex items-start space-x-4">
             <div className="mt-1 p-2 rounded-xl bg-black/5 text-gray-600">
                <ShieldCheck size={20} />
             </div>
             <div>
                <h4 className="text-[#1d1d1f] text-sm font-bold mb-1">Authenticity Portal</h4>
                <p className="text-xs text-[#86868b] font-light leading-relaxed">Verified digital NFC certificate.</p>
             </div>
          </div>
          <div className="flex items-start space-x-4">
             <div className="mt-1 p-2 rounded-xl bg-black/5 text-gray-600">
                <Truck size={20} />
             </div>
             <div>
                <h4 className="text-[#1d1d1f] text-sm font-bold mb-1">Concierge Shipping</h4>
                <p className="text-xs text-[#86868b] font-light leading-relaxed">Insured white-glove delivery.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Auth Gate Modal */}
      <AnimatePresence>
        {showAuthGate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthGate(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] px-6"
            >
              <div className="bg-[#1c1c1e] border border-white/10 rounded-[40px] p-10 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <button 
                  onClick={() => setShowAuthGate(false)}
                  className="absolute top-6 right-8 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-20 h-20 bg-white/5 rounded-[24px] flex items-center justify-center mx-auto mb-8">
                  <ShieldAlert size={40} className="text-white" />
                </div>

                <h2 className="text-3xl font-serif text-white mb-4">Elevate the Experience</h2>
                <p className="text-gray-400 font-light mb-10 text-lg leading-relaxed">
                  Join the NOVE world to build your luxury collection and manage your artisan selections.
                </p>

                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-bold hover:bg-gray-200 transition-colors group"
                  >
                    Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => {
                      loginAsGuest();
                      setShowAuthGate(false);
                      addToCart({
                        id: `${product.id}-${selectedVariant.color.toLowerCase().replace(/\s+/g, '-')}`,
                        name: `${product.name} - ${selectedVariant.color}`,
                        price: selectedVariant.price || product.basePrice,
                        image: selectedVariant.images[0],
                        color: selectedVariant.color,
                        quantity: 1
                      });
                    }}
                    className="text-sm text-gray-500 font-medium hover:text-gray-300 transition-colors"
                  >
                    Browse as Guest
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
