import React from 'react';
import { X, Trash2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b flex justify-between items-center bg-stone-50">
            <h2 className="text-xl font-bold text-stone-800">سلة المشتريات</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <p>السلة فارغة حالياً</p>
                <button onClick={onClose} className="mt-4 text-amber-600 font-bold underline">تصفح المنتجات</button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 border rounded-xl bg-stone-50 hover:border-amber-200 transition-colors">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <p className="text-xs text-stone-500 mt-1">{item.details}</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="font-bold text-amber-600">{item.price} د.أ</span>
                      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t bg-stone-50">
            <div className="flex items-center gap-2 text-green-700 text-sm mb-4 bg-green-50 p-2 rounded-lg">
              <ShieldCheck size={16} />
              <span>منتجات أصلية بجودة عالية</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-600">المجموع الكلي</span>
              <span className="text-2xl font-bold text-stone-900">{total} د.أ</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
              إتمام الطلب الآن
            </button>
            <p className="text-center text-xs text-stone-400 mt-3">الدفع الآمن متاح عبر مدى، فيزا، أو عند الاستلام</p>
          </div>
        </div>
      </div>
    </div>
  );
};