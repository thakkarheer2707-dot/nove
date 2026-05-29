import { products } from "@/data/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import RecentlyViewedTracker from "@/components/RecentlyViewedTracker";
import ArtisanRecommendations from "@/components/ArtisanRecommendations";
import ProductView from "@/components/ProductView";
import ProductStory from "@/components/ProductStory";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pt-8 pb-32">
      <RecentlyViewedTracker 
        product={{
          id: product.id,
          name: product.name,
          price: product.variants[0].price || product.basePrice,
          image: product.variants[0].images[0]
        }} 
      />
      
      {/* Breadcrumbs & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 mb-8 flex justify-between items-center z-10">
        <Link href="/store" className="flex items-center text-gray-500 hover:text-black transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light uppercase tracking-widest">Back to Collection</span>
        </Link>
      </div>

      {/* Interactive Product View */}
      <ProductView product={product} />

      {/* Product Story Section */}
      <ProductStory productId={product.id} />

      {/* Featured Reviews & Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-32">
        <ArtisanRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
}
