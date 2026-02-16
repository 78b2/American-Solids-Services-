import React, { useState } from 'react';
import { ShieldCheck, Wrench, CheckCircle, XCircle, FileText, Send, Phone, Camera, PenTool, RefreshCw, Ruler, Hammer, Droplets } from 'lucide-react';

export const Warranty: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        setFormData({ name: '', phone: '', problem: '' });
        setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">ضمان وجودة تدوم لسنوات</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            نحن نلتزم بتقديم منتجات American عالية الجودة مع ضمان رسمي وخدمة صيانة احترافية لضمان استمرار جمال ومتانة السطح لسنوات طويلة.
          </p>
        </div>

        {/* Warranty Duration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-stone-900 text-white p-8 rounded-2xl flex items-center gap-6 shadow-xl">
                <div className="text-5xl font-bold text-amber-500">10</div>
                <div>
                    <h3 className="text-xl font-bold mb-1">سنوات ضمان</h3>
                    <p className="text-stone-400">ضمان شامل ضد عيوب التصنيع في خامة الرخام.</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-200 flex items-center gap-6 shadow-sm">
                <div className="text-5xl font-bold text-stone-900">1</div>
                <div>
                    <h3 className="text-xl font-bold mb-1">سنة ضمان تركيب</h3>
                    <p className="text-stone-500">ضمان على جودة التثبيت واللحامات.</p>
                </div>
            </div>
        </div>

        {/* Warranty Details (Inclusions/Exclusions) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
            {/* Included */}
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                    <CheckCircle className="text-green-600" />
                    ماذا يشمل الضمان؟
                </h3>
                <ul className="space-y-4">
                    {[
                        'عيوب التصنيع في الخامة',
                        'تغير اللون غير الطبيعي (اصفرار شديد)',
                        'مشاكل اللحام والفواصل (انفكاك اللحام)',
                        'تقشر طبقة السطح',
                        'مشاكل ناتجة عن سوء التركيب (خلال السنة الأولى)'
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-green-900 font-medium">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Excluded */}
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
                <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
                    <XCircle className="text-red-600" />
                    ماذا لا يشمل الضمان؟
                </h3>
                <ul className="space-y-4">
                    {[
                        'الكسر الناتج عن ضرب مباشر أو سقوط أجسام ثقيلة',
                        'الحروق الناتجة عن وضع أواني ساخنة جداً مباشرة على السطح',
                        'سوء الاستخدام أو استخدام المنظفات الكيميائية القوية (مثل الفلاش)',
                        'الخدوش الناتجة عن التقطيع بالسكين مباشرة',
                        'أي تعديل أو صيانة تمت من قبل طرف آخر غير معتمد'
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-red-900 font-medium">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Maintenance Services */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 md:p-12 mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900 mb-4 flex items-center justify-center gap-2">
                    <Wrench className="text-amber-500" />
                    خدمات الصيانة وإعادة التلميع
                </h2>
                <p className="text-stone-500">حتى لو انتهت فترة الضمان، نحن هنا لخدمتك وإعادة سطحك كالجديد.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'إزالة الخدوش', icon: <FileText size={24} />, desc: 'صنفرة السطح لإزالة خدوش الاستخدام اليومي.' },
                    { title: 'إعادة تلميع السطح', icon: <RefreshCw size={24} />, desc: 'استعادة لمعان ونعومة السطح الأصلي.' },
                    { title: 'تعديل القياسات', icon: <Ruler size={24} />, desc: 'قص أو تعديل حجم السطح ليناسب أجهزة جديدة.' },
                    { title: 'تغيير الحوض', icon: <Droplets size={24} />, desc: 'استبدال الحوض القديم بحوض جديد ودمجه.' },
                    { title: 'إصلاح الكسور', icon: <Hammer size={24} />, desc: 'معالجة الكسور والشروخ بمواد خاصة.' },
                    { title: 'تحديث التصميم', icon: <PenTool size={24} />, desc: 'عمل فتحات جديدة أو إضافات للسطح.' },
                ].map((srv, idx) => (
                    <div key={idx} className="bg-stone-50 p-6 rounded-2xl hover:bg-amber-50 transition-colors border border-stone-100 group">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-stone-700 mb-4 shadow-sm group-hover:text-amber-600">
                            {srv.icon}
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 mb-2">{srv.title}</h4>
                        <p className="text-stone-500 text-sm">{srv.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Request Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
             <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-8 border border-stone-100">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">طلب خدمة صيانة</h3>
                
                {isSubmitted ? (
                    <div className="bg-green-50 p-6 rounded-xl text-center border border-green-200">
                        <CheckCircle className="mx-auto text-green-600 mb-3" size={32} />
                        <h4 className="font-bold text-green-800 text-lg">تم إرسال الطلب بنجاح</h4>
                        <p className="text-green-700">سيتواصل معك فريق الصيانة خلال 24 ساعة.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2">الاسم</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2">رقم الهاتف</label>
                            <input 
                                type="tel" 
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2">وصف المشكلة</label>
                            <textarea 
                                required
                                value={formData.problem}
                                onChange={(e) => setFormData({...formData, problem: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 h-24 resize-none"
                            />
                        </div>
                        
                        <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center cursor-pointer hover:bg-stone-50 hover:border-amber-400 transition-colors">
                            <Camera className="mx-auto text-stone-400 mb-2" />
                            <span className="text-sm text-stone-500 font-bold">إرفاق صور للمشكلة (اختياري)</span>
                        </div>

                        <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                            إرسال الطلب
                            <Send size={18} />
                        </button>
                    </form>
                )}
             </div>

             <div className="lg:col-span-2 bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                   {/* WhatsApp SVG Icon */}
                   <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                   </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">تفضل واتساب؟</h3>
                <p className="mb-8 opacity-90">يمكنك إرسال صور المشكلة والتفاصيل مباشرة عبر واتساب لخدمة أسرع.</p>
                <a 
                    href="https://wa.me/962790303867" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-green-700 w-full py-4 rounded-xl font-bold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                    تواصل معنا الآن
                    <Phone size={20} />
                </a>
             </div>
        </div>

      </div>
    </div>
  );
};