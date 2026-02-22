import React, { useState } from 'react';
import { ShoppingBag, Search, Eye } from 'lucide-react';
import { CartItem, Product } from '../types';

interface StoreProps {
  onAddToCart: (item: CartItem) => void;
  onViewProduct: (id: string) => void;
  products: Product[];
}

export const Store: React.FC<StoreProps> = ({ onAddToCart, onViewProduct, products }) => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent navigating to details when clicking cart icon
    
    // Calculate price with discount for cart
    const price = (product.discountPercentage && product.discountPercentage > 0)
      ? Math.round(product.price * (1 - (product.discountPercentage / 100)))
      : product.price;

    onAddToCart({
      id: product.id,
      name: product.name,
      details: product.category,
      price: price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">المتجر</h1>
          <p className="text-stone-500 max-w-xl mx-auto">تصفح مجموعتنا المختارة من طاولات الرخام الجاهزة، المصممة لتناسب مختلف الأذواق والمساحات.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
             {categories.map(cat => (
               <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors border ${
                  filter === cat 
                    ? 'bg-stone-900 text-white border-stone-900' 
                    : 'bg-white text-stone-600 border-stone-200 hover:border-amber-500'
                }`}
               >
                 {cat === 'all' ? 'الكل' : cat}
               </button>
             ))}
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="بحث..." 
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
             const hasDiscount = (product.discountPercentage || 0) > 0;
             const finalPrice = hasDiscount 
              ? Math.round(product.price * (1 - (product.discountPercentage! / 100))) 
              : product.price;

            return (
              <div 
                key={product.id} 
                onClick={() => onViewProduct(product.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-stone-100"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                      -{product.discountPercentage}%
                    </div>
                  )}

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <button 
                      onClick={(e) => handleAdd(e, product)}
                      className="bg-stone-900 text-white p-3 rounded-full shadow-lg hover:bg-amber-500 transition-colors"
                      title="إضافة للسلة"
                    >
                      <ShoppingBag size={20} />
                    </button>
                    <button 
                      className="bg-white text-stone-900 p-3 rounded-full shadow-lg hover:bg-stone-100 transition-colors"
                      title="عرض التفاصيل"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-stone-500 mb-1">{product.category}</p>
                  <h3 className="font-bold text-stone-900 text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600 text-xl">{finalPrice} د.أ</span>
                    {hasDiscount && (
                      <span className="text-sm text-stone-400 line-through">{product.price} د.أ</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};