import React, { useState } from 'react';
import { ArrowLeft, Star, Truck, ShieldCheck, PenTool, Eye, Sparkles, Droplets, Grid, Palette, ChevronLeft } from 'lucide-react';
import { PRODUCTS, PROJECTS } from '../constants';

interface HomeProps {
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onViewProduct }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1920" 
            alt="Modern American Solids Interior" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-amber-500 text-black font-bold rounded-full mb-6 text-sm">
              الشركة الأمريكية للرخام الصناعي
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              فخامة الأسطح <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">الصلبة</span>
            </h1>
            <p className="text-xl text-stone-200 mb-10 max-w-xl leading-relaxed">
              في "American Solids Service"، نقدم لك أحدث تقنيات الكوريان والأسطح الصلبة. جودة عالمية، تصاميم لا نهائية، وضمان حقيقي يدوم لسنوات.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('customizer')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-900 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  صمم طاولتك بنفسك (3D)
                  <PenTool size={20} />
                </button>
                <button 
                  onClick={() => onNavigate('store')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  تصفح المجموعة الجاهزة
                </button>
              </div>
              
              <button 
                onClick={() => onNavigate('design-hub')}
                className="w-full sm:w-fit px-8 py-4 bg-stone-900/80 backdrop-blur border border-amber-500/50 text-amber-500 font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 mt-2 group"
              >
                <Palette className="group-hover:rotate-12 transition-transform" size={20} />
                صمم الي بدك اياه ! (مطابخ، مغاسل، كونسول...)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Trust Signals */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">لماذا American Solids Service؟</h2>
            <p className="text-stone-400">الحل الأمثل الذي يجمع بين أناقة الرخام وعملية التكنولوجيا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6 border border-stone-800 rounded-2xl hover:border-amber-500/50 transition-colors">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">مقاوم للبكتيريا والبقع</h3>
              <p className="text-stone-400">سطح غير مسامي 100% يمنع امتصاص السوائل وتكون البكتيريا، مما يجعله الخيار الصحي الأول.</p>
            </div>
            <div className="p-6 border border-stone-800 rounded-2xl hover:border-amber-500/50 transition-colors">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">قابل للتجديد والإصلاح</h3>
              <p className="text-stone-400">يمكن إزالة الخدوش البسيطة بسهولة وإعادة تلميع السطح ليعود جديداً تماماً حتى بعد سنوات.</p>
            </div>
            <div className="p-6 border border-stone-800 rounded-2xl hover:border-amber-500/50 transition-colors">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <Droplets size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">تصميم بدون فواصل</h3>
              <p className="text-stone-400">تقنية اللحام الحراري تمنحك قطعة واحدة متصلة مهما كان الحجم، لمظهر انسيابي غاية في الجمال.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Highlight Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-amber-600 font-bold tracking-wider text-sm uppercase">أعمالنا</span>
              <h2 className="text-4xl font-bold text-stone-900 mt-2">مشاريع نفخر بتنفيذها</h2>
              <p className="text-stone-500 mt-2 max-w-lg">
                لمحة سريعة عن دقة التنفيذ وجودة التشطيب في مشاريعنا السابقة.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('portfolio')}
              className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              عرض جميع المشاريع
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECTS.slice(0, 8).map((project) => (
              <div key={project.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer" onClick={() => onNavigate('portfolio')}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold border border-white/30 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                    {project.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-amber-600 font-bold tracking-wider text-sm uppercase">مختارات مميزة</span>
              <h2 className="text-4xl font-bold text-stone-900 mt-2">الأكثر مبيعاً</h2>
            </div>
            <button 
              onClick={() => onNavigate('store')}
              className="hidden md:flex items-center gap-2 text-stone-600 hover:text-amber-600 font-bold transition-colors"
            >
              عرض الكل <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => onViewProduct(product.id)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-stone-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      className="bg-white text-stone-900 px-6 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Eye size={18} />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                <p className="text-stone-500 mb-2">{product.category}</p>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold text-lg">{product.price} د.أ</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">هل لديك مقاسات خاصة؟</h2>
          <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto">
            ميزة الرخام الكوري هي مرونة التصميم. يمكننا تنفيذ أي شكل أو مقاس تريده بدقة ميليمترية. ابدأ بتصميم طاولتك الآن.
          </p>
          <button 
            onClick={() => onNavigate('customizer')}
            className="px-10 py-5 bg-amber-500 text-stone-900 text-xl font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-2xl shadow-amber-500/20"
          >
            ابدأ التصميم الآن
          </button>
        </div>
      </section>
    </div>
  );
};