import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to a backend
    setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">تواصل معنا</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتكم ومساعدتكم في اختيار الأفضل لمشاريعكم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Phone */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">اتصل بنا</h3>
                <p className="text-stone-500 text-sm mb-2">متاحين من 9 صباحاً - 6 مساءً</p>
                <a href="tel:+962790303867" className="text-lg font-bold text-stone-800 hover:text-amber-600 transition-colors" dir="ltr">
                  +962 7 9030 3867
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">البريد الإلكتروني</h3>
                <p className="text-stone-500 text-sm mb-2">للاستفسارات التجارية والمشاريع</p>
                <a href="mailto:info@assdco.com" className="text-lg font-bold text-stone-800 hover:text-amber-600 transition-colors">
                  info@assdco.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">موقعنا</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-1">
                  Amman, Abu Alandah<br/>
                  Aldhemeiah St.
                </p>
                <p className="text-stone-500 text-xs">
                  P.O. Box 494 Amman 11623
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-sm border border-stone-800 flex items-start gap-4">
              <div className="p-3 bg-white/10 text-amber-500 rounded-xl">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">ساعات العمل</h3>
                <div className="text-sm text-stone-300 space-y-1">
                  <p className="flex justify-between w-40"><span>السبت - الخميس:</span> <span>09:00 - 18:00</span></p>
                  <p className="flex justify-between w-40"><span>الجمعة:</span> <span>مغلق</span></p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">أرسل لنا رسالة</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check size={24} className="text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p>شكراً لتواصلك معنا، سيقوم فريقنا بالرد عليك في أقرب وقت.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">الاسم الكامل</label>
                        <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                        placeholder="الاسم الكريم"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">رقم الهاتف</label>
                        <input 
                        type="tel" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                        placeholder="079..."
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">البريد الإلكتروني</label>
                    <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">الرسالة</label>
                    <textarea 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50 h-32 resize-none"
                        placeholder="كيف يمكننا مساعدتك؟"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    </div>

                    <button 
                    type="submit"
                    className="w-full bg-amber-500 text-stone-900 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                    إرسال الرسالة
                    <Send size={20} />
                    </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-12 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-stone-200 h-80 bg-stone-200 relative group">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Map Location" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                 <a 
                   href="https://maps.google.com/?q=Amman+Abu+Alandah" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-white text-stone-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-amber-500 hover:text-white transition-colors flex items-center gap-2"
                 >
                    <MapPin size={20} />
                    عرض الموقع على الخريطة
                 </a>
            </div>
        </div>

      </div>
    </div>
  );
};

// Importing Check icon for success state
import { Check } from 'lucide-react';