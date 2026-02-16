import React, { useState } from 'react';
import { 
  ChefHat, 
  Droplets, 
  Armchair, 
  Coffee, 
  Utensils, 
  ArrowLeft, 
  Check, 
  MessageCircle, 
  Ruler, 
  Palette,
  Layout,
  Layers,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { MARBLE_TYPES, PROJECTS } from '../constants';
import { CartItem } from '../types';

interface DesignHubProps {
  onAddToCart: (item: CartItem) => void;
}

type CategoryType = 'kitchen' | 'washbasin' | 'console' | 'coffee-table' | 'coffee-corner' | 'dining-table';

interface DesignOption {
  id: CategoryType;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const DesignHub: React.FC<DesignHubProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  
  // Form States (Shared & Specific)
  const [selectedMarble, setSelectedMarble] = useState(MARBLE_TYPES[0].id);
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '', depth: '' });
  const [notes, setNotes] = useState('');
  
  // Specific States
  const [washbasinType, setWashbasinType] = useState('integrated'); // integrated vs custom
  const [hasShelves, setHasShelves] = useState(false);
  const [hasGrooves, setHasGrooves] = useState(false);
  const [tableShape, setTableShape] = useState('rectangle');
  const [skirtThickness, setSkirtThickness] = useState('5');

  const categories: DesignOption[] = [
    { id: 'kitchen', title: 'تصميم أسطح مطبخ عالي جودة', icon: <ChefHat size={32} />, description: 'أسطح مطابخ مودرن، مقاومة للبكتيريا والحرارة' },
    { id: 'washbasin', title: 'تصميم مغاسل عالي جودة', icon: <Droplets size={32} />, description: 'مغاسل أحواض متصلة أو منفصلة بتصاميم فندقية' },
    { id: 'console', title: 'تصميم كونسول مدخل', icon: <Armchair size={32} />, description: 'كونسول استقبال فخم لمداخل المنازل والشركات' },
    { id: 'coffee-table', title: 'تصميم طاولات قهوة', icon: <Coffee size={32} />, description: 'طاولات وسط وخدمة بأشكال هندسية مميزة' },
    { id: 'coffee-corner', title: 'تصميم كوفي كورنر', icon: <Layout size={32} />, description: 'ركن قهوة متكامل بتصميم سطح عملي وأنيق' },
    { id: 'dining-table', title: 'تصميم طاولات طعام', icon: <Utensils size={32} />, description: 'طاولات طعام عائلية فاخرة بأي مقاس' },
  ];

  const handleReset = () => {
    setSelectedCategory(null);
    setDimensions({ length: '', width: '', height: '', depth: '' });
    setNotes('');
  };

  const handleSubmit = () => {
    const categoryName = categories.find(c => c.id === selectedCategory)?.title;
    const marbleName = MARBLE_TYPES.find(m => m.id === selectedMarble)?.name;
    
    let details = `نوع الرخام: ${marbleName}\n`;
    
    if (selectedCategory === 'kitchen') {
      details += `الأبعاد: ${dimensions.length || '?'}x${dimensions.width || '?'} سم\n`;
    } else if (selectedCategory === 'washbasin') {
      details += `النوع: ${washbasinType === 'integrated' ? 'حوض متصل' : 'تفصيل حوض مع سطح'}\n`;
      if (hasShelves) details += `+ رفوف جانبية/سفلية\n`;
      if (hasGrooves) details += `+ فرزات جمالية\n`;
    } else if (selectedCategory === 'coffee-table' || selectedCategory === 'dining-table') {
      details += `الشكل: ${tableShape}\nسمك الشرشف: ${skirtThickness} سم\n`;
      details += `الأبعاد: ${dimensions.length}x${dimensions.width}x${dimensions.height} سم\n`;
    }

    onAddToCart({
      id: `custom-req-${Date.now()}`,
      name: `طلب تفصيل: ${categoryName}`,
      details: details,
      price: 50, // Downpayment or estimation fee
      image: MARBLE_TYPES.find(m => m.id === selectedMarble)?.image || '',
      quantity: 1
    });

    // Reset or show success (For now, just reset logic implied by cart opening)
    handleReset();
  };

  // Helper to get relevant images
  const getRelevantProjects = () => {
    if (!selectedCategory) return [];
    
    let filterCategory = '';
    switch(selectedCategory) {
      case 'kitchen': filterCategory = 'kitchen'; break;
      case 'washbasin': filterCategory = 'washbasin'; break;
      case 'console': filterCategory = 'console'; break;
      case 'coffee-table': 
      case 'dining-table': 
        filterCategory = 'tables'; break;
      default: filterCategory = 'other';
    }

    return PROJECTS.filter(p => p.category === filterCategory);
  };

  const ExamplesGallery = () => {
    const examples = getRelevantProjects();
    if (examples.length === 0) return null;

    return (
      <div className="mt-12 pt-8 border-t border-stone-100">
        <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <ImageIcon className="text-amber-500" />
          نماذج من {categories.find(c => c.id === selectedCategory)?.title} قمنا بتنفيذها
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {examples.map(project => (
            <div key={project.id} className="rounded-xl overflow-hidden shadow-sm aspect-square relative group">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                 <span className="text-white text-xs font-bold">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKitchenForm = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 text-sm flex gap-2">
        <MessageCircle size={20} />
        <p>نقوم بتفصيل أسطح المطابخ بدقة عالية. يمكنك تحديد الألوان والمقاسات التقريبية، وسيقوم فريقنا بالتواصل معك لأخذ القياسات النهائية.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-stone-700 mb-3">حدد لون ونوع الرخام</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MARBLE_TYPES.map(marble => (
            <div 
              key={marble.id}
              onClick={() => setSelectedMarble(marble.id)}
              className={`cursor-pointer rounded-xl border-2 overflow-hidden relative ${selectedMarble === marble.id ? 'border-amber-500' : 'border-transparent'}`}
            >
              <img src={marble.image} alt={marble.name} className="w-full h-24 object-cover" />
              <div className="p-2 bg-white text-xs font-bold text-center">{marble.name}</div>
              {selectedMarble === marble.id && <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1"><Check size={12} /></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">الطول الإجمالي (سم)</label>
          <input 
            type="number" 
            value={dimensions.length}
            onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500"
            placeholder="مثال: 300"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">عمق السطح (سم)</label>
          <input 
            type="number" 
            value={dimensions.width}
            onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500"
            placeholder="عادة 60 سم"
          />
        </div>
      </div>

      <div className="flex justify-center">
         <button className="text-amber-600 underline text-sm font-bold flex items-center gap-2 hover:text-amber-700">
           <Phone size={16} />
           ما بتعرف القياسات؟ تواصل معنا لرفع المساحات
         </button>
      </div>
    </div>
  );

  const renderWashbasinForm = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Type Selection */}
      <div>
        <label className="block text-lg font-bold text-stone-800 mb-4">نوع التصميم</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setWashbasinType('integrated')}
            className={`p-4 rounded-xl border-2 text-right transition-all ${washbasinType === 'integrated' ? 'border-amber-500 bg-amber-50' : 'border-stone-200 hover:border-stone-300'}`}
          >
            <span className="font-bold block mb-1">أسطح مغاسل أحواض متصلة</span>
            <span className="text-xs text-stone-500">الحوض والسطح قطعة واحدة بدون فواصل (سهل التنظيف)</span>
          </button>
          <button
            onClick={() => setWashbasinType('custom')}
            className={`p-4 rounded-xl border-2 text-right transition-all ${washbasinType === 'custom' ? 'border-amber-500 bg-amber-50' : 'border-stone-200 hover:border-stone-300'}`}
          >
            <span className="font-bold block mb-1">تفصيل مغاسل حوض مع سطح</span>
            <span className="text-xs text-stone-500">تصميم مودرن مركب، إمكانية دمج ألوان مختلفة</span>
          </button>
        </div>
      </div>

      {/* Marble Selection */}
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-3">لون ونوع الرخام</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MARBLE_TYPES.map(marble => (
            <div 
              key={marble.id}
              onClick={() => setSelectedMarble(marble.id)}
              className={`cursor-pointer rounded-xl border-2 overflow-hidden relative ${selectedMarble === marble.id ? 'border-amber-500' : 'border-transparent'}`}
            >
              <img src={marble.image} alt={marble.name} className="w-full h-24 object-cover" />
              <div className="p-2 bg-white text-xs font-bold text-center">{marble.name}</div>
              {selectedMarble === marble.id && <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1"><Check size={12} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={hasShelves}
            onChange={(e) => setHasShelves(e.target.checked)}
            className="w-5 h-5 accent-amber-500 rounded"
          />
          <span className="font-bold text-stone-700">إضافة رفوف جانبية أو سفلية</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={hasGrooves}
            onChange={(e) => setHasGrooves(e.target.checked)}
            className="w-5 h-5 accent-amber-500 rounded"
          />
          <span className="font-bold text-stone-700">عمل فرزات جمالية للمغسلة (Grooves)</span>
        </label>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">الطول (سم)</label>
            <input type="number" className="w-full px-3 py-2 rounded-lg border border-stone-200" onChange={(e) => setDimensions({...dimensions, length: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">العرض/العمق (سم)</label>
            <input type="number" className="w-full px-3 py-2 rounded-lg border border-stone-200" onChange={(e) => setDimensions({...dimensions, width: e.target.value})} />
          </div>
      </div>
    </div>
  );

  const renderTableForm = () => (
    <div className="space-y-8 animate-fade-in">
       {/* Shape */}
       <div>
         <label className="block text-lg font-bold text-stone-800 mb-4">شكل الطاولة</label>
         <div className="flex flex-wrap gap-4">
           {['rectangle', 'circle', 'square', 'oval'].map(shape => (
             <button
              key={shape}
              onClick={() => setTableShape(shape)}
              className={`px-6 py-3 rounded-xl border-2 font-bold capitalize ${tableShape === shape ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}
             >
               {shape === 'rectangle' ? 'مستطيل' : shape === 'circle' ? 'دائري' : shape === 'square' ? 'مربع' : 'بيضوي'}
             </button>
           ))}
         </div>
       </div>

       {/* Marble */}
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-3">اختر الرخام</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MARBLE_TYPES.map(marble => (
            <div 
              key={marble.id}
              onClick={() => setSelectedMarble(marble.id)}
              className={`cursor-pointer rounded-xl border-2 overflow-hidden relative ${selectedMarble === marble.id ? 'border-amber-500' : 'border-transparent'}`}
            >
              <img src={marble.image} alt={marble.name} className="w-full h-24 object-cover" />
              <div className="p-2 bg-white text-xs font-bold text-center">{marble.name}</div>
              {selectedMarble === marble.id && <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full p-1"><Check size={12} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Skirt Thickness */}
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-2">ارتفاع/سمك شرشف الطاولة (سم)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="2" 
            max="15" 
            value={skirtThickness}
            onChange={(e) => setSkirtThickness(e.target.value)}
            className="flex-grow h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="font-bold text-xl text-stone-900 w-16 text-center">{skirtThickness} سم</span>
        </div>
        <p className="text-xs text-stone-400 mt-1">يحدد سماكة حافة الطاولة الجانبية لمظهر أكثر فخامة.</p>
      </div>

       {/* Dimensions */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl">
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">الطول / القطر (سم)</label>
            <input type="number" className="w-full px-3 py-2 rounded-lg border border-stone-200" onChange={(e) => setDimensions({...dimensions, length: e.target.value})} />
          </div>
          {tableShape !== 'circle' && tableShape !== 'square' && (
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1">العرض (سم)</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-stone-200" onChange={(e) => setDimensions({...dimensions, width: e.target.value})} />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">الارتفاع (سم)</label>
            <input type="number" className="w-full px-3 py-2 rounded-lg border border-stone-200" onChange={(e) => setDimensions({...dimensions, height: e.target.value})} />
          </div>
      </div>
    </div>
  );

  const renderConsoleForm = () => (
    <div className="space-y-6 animate-fade-in">
       {/* Use Table Form logic but simplified for Console */}
       {renderTableForm()}
    </div>
  );

  const renderGenericForm = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center">
         <p className="text-stone-600 mb-4">هذا القسم يتطلب تفاصيل مخصصة لسطح العمل.</p>
         {renderKitchenForm()}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">صمم الي بدك اياه !</h1>
          <p className="text-stone-500">اختر الفئة، حدد المواصفات، ونحن نتكفل بالباقي بدقة واحترافية.</p>
        </div>

        {!selectedCategory ? (
          /* Category Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {categories.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-500 cursor-pointer transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-700 group-hover:bg-amber-500 group-hover:text-white transition-colors mb-6">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{cat.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Specific Form Wizard */
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
            {/* Form Header */}
            <div className="bg-stone-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={handleReset} className="hover:bg-stone-700 p-2 rounded-full transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h2>
              </div>
              <div className="hidden md:block text-stone-400 text-sm">خطوة 1 من 1</div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {selectedCategory === 'kitchen' && renderKitchenForm()}
              {selectedCategory === 'washbasin' && renderWashbasinForm()}
              {(selectedCategory === 'coffee-table' || selectedCategory === 'dining-table') && renderTableForm()}
              {selectedCategory === 'console' && renderConsoleForm()}
              {selectedCategory === 'coffee-corner' && renderGenericForm()}
              
              {/* Common Notes Field */}
              <div className="mt-8 pt-8 border-t border-stone-100">
                <label className="block text-sm font-bold text-stone-700 mb-3">ملاحظات إضافية (اختياري)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 resize-none bg-stone-50"
                  placeholder="أضف أي تفاصيل أخرى ترغب بها..."
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-amber-500 text-stone-900 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  إضافة الطلب للسلة (طلب تسعير)
                </button>
              </div>

               {/* RELEVANT EXAMPLES (New Feature) */}
               <ExamplesGallery />

            </div>
          </div>
        )}

      </div>
    </div>
  );
};