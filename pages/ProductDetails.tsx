import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { CartItem, Product, Review } from '../types';
import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, Tag } from 'lucide-react';

interface ProductDetailsProps {
  productId: string;
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onAddToCart, onBack }) => {
  const product = PRODUCTS.find(p => p.id === productId);
  
  // States
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [reviews, setReviews] = useState<Review[]>(product?.reviews || []);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">المنتج غير موجود</h2>
          <button onClick={onBack} className="text-amber-600 underline">العودة للمتجر</button>
        </div>
      </div>
    );
  }

  // Price Calculation with Discount
  const hasDiscount = (product.discountPercentage || 0) > 0;
  const originalPrice = product.price;
  const finalPrice = hasDiscount 
    ? Math.round(originalPrice * (1 - (product.discountPercentage! / 100))) 
    : originalPrice;

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      details: selectedSize || product.category,
      price: finalPrice,
      image: product.image,
      quantity: 1
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    const review: Review = {
      id: `r-${Date.now()}`,
      user: userName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, review]);
    setNewComment('');
    setUserName('');
    setNewRating(5);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 'جديد';

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          العودة للمنتجات
        </button>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Right: Image */}
            <div className="relative h-[400px] lg:h-[600px] bg-stone-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse flex items-center gap-2">
                  <Tag size={16} />
                  خصم {product.discountPercentage}%
                </div>
              )}
            </div>

            {/* Left: Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-auto">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="text-amber-600 font-bold text-sm tracking-wider mb-2">{product.category}</h5>
                    <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-50 px-3 py-1 rounded-lg">
                    <Star className="fill-amber-400 text-amber-400" size={18} />
                    <span className="font-bold text-stone-700">{averageRating}</span>
                    <span className="text-stone-400 text-xs">({reviews.length} تقييم)</span>
                  </div>
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl font-bold text-stone-900">{finalPrice} د.أ</span>
                  {hasDiscount && (
                    <span className="text-xl text-stone-400 line-through mb-1">{originalPrice} د.أ</span>
                  )}
                </div>

                <p className="text-stone-600 leading-relaxed mb-8 text-lg">
                  {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
                </p>

                {/* Sizes Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-stone-800 mb-3">اختر المقاس:</label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl border transition-all ${
                            selectedSize === size 
                              ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold' 
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-8 border-t border-stone-100">
                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ShoppingCart size={20} />
                    إضافة للسلة
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-xs text-stone-500 pt-4">
                  <div className="flex items-center gap-2">
                    <Truck size={16} />
                    توصيل مجاني للطلبات فوق 500 د.أ
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    جودة تصنيع عالية
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reviews List */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-stone-100">
            <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-2">
              تقييمات العملاء
              <span className="bg-stone-100 text-stone-600 text-sm px-3 py-1 rounded-full">{reviews.length}</span>
            </h3>
            
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-stone-400 text-center py-8">لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-amber-700 font-bold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">{review.user}</h4>
                          <span className="text-xs text-stone-400">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-white rounded-3xl p-8 border border-stone-100 h-fit">
            <h3 className="text-xl font-bold text-stone-900 mb-6">أضف تقييمك</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">اسمك</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                  placeholder="الاسم الكريم"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">التقييم</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={28} 
                        className={`${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">تعليقك</label>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50 h-32 resize-none"
                  placeholder="شاركنا تجربتك مع المنتج..."
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors"
              >
                نشر التقييم
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};