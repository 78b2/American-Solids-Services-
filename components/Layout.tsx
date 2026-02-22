import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, User, Home, Hammer, Grid, HelpCircle, Image, Mail, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, cart, setIsCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', icon: <Home size={18} /> },
    { id: 'portfolio', label: 'أعمالنا', icon: <Image size={18} /> },
    { id: 'design-hub', label: 'طلب تصميم', icon: <Hammer size={18} /> },
    { id: 'store', label: 'المتجر', icon: <Grid size={18} /> },
    { id: 'contact', label: 'تواصل معنا', icon: <Phone size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-900 shadow-xl py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white">
              <span className="font-bold text-lg">AS</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-lg md:text-xl font-bold tracking-tighter ${isScrolled ? 'text-white' : 'text-stone-900'} transition-colors uppercase leading-none`}>
                American <span className="text-amber-500">Solids</span>
              </h1>
              <span className={`text-[10px] font-bold ${isScrolled ? 'text-stone-400' : 'text-stone-600'} tracking-wide`}>
                Service
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  activePage === link.id 
                    ? 'text-amber-500' 
                    : isScrolled ? 'text-stone-300 hover:text-white' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className={`hidden sm:block p-2 rounded-full transition-colors ${isScrolled ? 'text-white hover:bg-stone-800' : 'text-stone-900 hover:bg-stone-200'}`}>
              <User size={24} />
            </button>
            <button 
              className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'text-white hover:bg-stone-800' : 'text-stone-900 hover:bg-stone-200'}`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-amber-500 text-stone-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-amber-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-900/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden">
           {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-2xl text-white font-bold hover:text-amber-500 transition-colors flex items-center gap-3"
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            <button onClick={() => { onNavigate('faq'); setIsMobileMenuOpen(false); }} className="text-xl text-stone-400 mt-4 flex items-center gap-2">
               <HelpCircle size={20} /> الأسئلة الشائعة
            </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/962790303867"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-transform hover:scale-110 flex items-center justify-center"
        title="تواصل عبر واتساب"
      >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
      </a>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase">American <span className="text-amber-500">Solids</span></h3>
              <p className="text-xs text-stone-500 mb-4 font-bold">الشركة الأمريكية للرخام الصناعي</p>
              <p className="text-sm leading-relaxed text-stone-400">
                رواد صناعة الأسطح الصلبة (Solid Surface) في المنطقة. نقدم حلولاً عصرية متكاملة للمنازل والمشاريع التجارية بأعلى معايير الجودة العالمية.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-amber-500">الرئيسية</button></li>
                <li><button onClick={() => onNavigate('portfolio')} className="hover:text-amber-500">معرض الأعمال</button></li>
                <li><button onClick={() => onNavigate('design-hub')} className="hover:text-amber-500">طلب تصميم خاص</button></li>
                <li><button onClick={() => onNavigate('store')} className="hover:text-amber-500">المتجر</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">خدمة العملاء</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-500">تواصل معنا</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:text-amber-500">الأسئلة الشائعة</button></li>
                <li><a href="#" className="hover:text-amber-500">سياسة الشحن</a></li>
                <li><button onClick={() => onNavigate('warranty')} className="hover:text-amber-500">الضمان والصيانة</button></li>
                {/* Staff Dashboard Link */}
                <li className="pt-2 mt-2 border-t border-stone-800">
                   <button onClick={() => onNavigate('admin')} className="flex items-center gap-2 text-stone-600 hover:text-white transition-colors text-xs">
                      <Lock size={12} />
                      لوحة تحكم الموظفين
                   </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">بيانات التواصل</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-amber-500 flex-shrink-0" />
                  <span dir="ltr" className="hover:text-white transition-colors cursor-pointer">+962 7 9030 3867</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-amber-500 flex-shrink-0" />
                  <span className="hover:text-white transition-colors cursor-pointer">info@assdco.com</span>
                </div>
                <div className="text-xs text-stone-500 leading-relaxed mt-2 pt-2 border-t border-stone-800">
                  <p>Amman, Abu Alandah, Aldhemeiah St.</p>
                  <p>P.O. Box 494 Amman 11623</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 mt-6">
                جميع الحقوق محفوظة © 2024 American Solids Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};