import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

export const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('general');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData: FAQSection[] = [
    {
      title: 'أسئلة عامة عن الكوريان / American Solids Service',
      items: [
        {
          question: 'ما هو رخام الكوريان (American Solids Service)؟',
          answer: 'هو سطح صناعي صلب (Solid Surface) مصنوع من مزيج الأكريليك والمعادن الطبيعية، يتميز بالمتانة، الشكل العصري، وإمكانية التشكيل بدون فواصل ظاهرة.'
        },
        {
          question: 'ما الفرق بين الكوريان والرخام الطبيعي؟',
          answer: 'الكوريان غير مسامي، مقاوم للبقع والبكتيريا، ويمكن إصلاحه بسهولة، بينما الرخام الطبيعي مسامي وقد يتأثر بالأحماض والبقع.'
        },
        {
          question: 'هل American نفس الكوريان؟',
          answer: 'الكوريان اسم تجاري لشركة DuPont، بينما American Solids Service علامة تجارية كورية عالية الجودة من نفس فئة الأسطح الصلبة (Solid Surface).'
        }
      ]
    },
    {
      title: 'الاستخدامات',
      items: [
        {
          question: 'أين يمكن استخدام الكوريان؟',
          answer: 'يمكن استخدامه في المطابخ، الحمامات، المغاسل، كاونترات الاستقبال، العيادات والمستشفيات، المحلات التجارية والمطاعم.'
        },
        {
          question: 'هل الكوريان مناسب للمطابخ؟',
          answer: 'نعم، لأنه مقاوم للرطوبة والبقع وسهل التنظيف، كما يمكن دمج الحوض معه بدون فواصل.'
        },
        {
          question: 'هل يتحمل الحرارة؟',
          answer: 'يتحمل الحرارة المعتدلة، لكن يُنصح باستخدام قواعد للأواني الساخنة لتجنب أي أثر.'
        }
      ]
    },
    {
      title: 'المميزات',
      items: [
        {
          question: 'هل يظهر فيه فواصل؟',
          answer: 'لا، يتم تركيبه بطريقة لحام خاصة تجعل الفواصل غير مرئية تقريباً.'
        },
        {
          question: 'هل يمكن إصلاح الخدوش؟',
          answer: 'نعم، يمكن صنفرته وإعادة تلميعه بسهولة ليعود كالجديد.'
        },
        {
          question: 'هل يتغير لونه مع الوقت؟',
          answer: 'لا يتغير لونه بسهولة، خصوصاً مع العناية الجيدة.'
        },
        {
          question: 'هل هو صحي وآمن؟',
          answer: 'نعم، لأنه غير مسامي ولا يسمح بتجمع البكتيريا، لذلك يُستخدم في المستشفيات والمختبرات.'
        }
      ]
    },
    {
      title: 'الأسعار والتركيب',
      items: [
        {
          question: 'كيف يتم حساب السعر؟',
          answer: 'يتم حسابه بالمتر الطولي أو المتر المربع حسب نوع المشروع والسماكة والتصميم.'
        },
        {
          question: 'كم يستغرق التركيب؟',
          answer: 'عادة من اسبوع إلى ١٠ أيام حسب حجم المشروع.'
        },
        {
          question: 'هل تقدمون ضمان؟',
          answer: 'نعم، نقدم ضماناً يمتد لـ 10 سنوات ضد عيوب التصنيع.'
        }
      ]
    },
    {
      title: 'العناية والصيانة',
      items: [
        {
          question: 'كيف يتم تنظيف الكوريان؟',
          answer: 'بماء وصابون عادي أو منظف خفيف، بدون مواد كيميائية قوية.'
        },
        {
          question: 'هل يتأثر بالمواد الكيميائية؟',
          answer: 'يتحمل الاستخدام المنزلي العادي، لكن يُنصح بتجنب المواد شديدة القوة لفترات طويلة.'
        },
        {
          question: 'هل يمكن تغيير اللون أو التعديل لاحقاً؟',
          answer: 'يمكن إعادة صقله أو تعديله في بعض الحالات.'
        }
      ]
    },
    {
      title: 'لماذا تختارنا؟',
      items: [
        {
          question: 'هل يمكن تنفيذ تصاميم مخصصة؟',
          answer: 'نعم، يمكن تشكيله حرارياً لعمل تصاميم منحنية وأشكال فريدة.'
        },
        {
          question: 'هل لديكم نماذج ألوان متعددة؟',
          answer: 'نعم، يتوفر بعدة ألوان ونقوش تناسب جميع الأذواق.'
        },
        {
          question: 'لماذا أختار American من شركتكم؟',
          answer: 'لأننا نضمن لك: خبرة طويلة، فريق تركيب محترف، دقة بالمواعيد، أسعار منافسة، وخدمة ما بعد البيع متميزة.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">الأسئلة الشائعة</h1>
          <p className="text-stone-500">كل ما تريد معرفته عن منتجات American Solids Service</p>
        </div>

        <div className="space-y-8">
          {faqData.map((section, sectionIdx) => (
            <div key={sectionIdx} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-100">
                <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                  <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                  {section.title}
                </h2>
              </div>
              
              <div className="divide-y divide-stone-100">
                {section.items.map((item, itemIdx) => {
                  const uniqueId = sectionIdx * 100 + itemIdx;
                  const isOpen = openQuestion === uniqueId;

                  return (
                    <div key={itemIdx} className="bg-white">
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : uniqueId)}
                        className="w-full px-6 py-5 flex justify-between items-center text-right hover:bg-stone-50 transition-colors"
                      >
                        <span className={`font-bold ${isOpen ? 'text-amber-600' : 'text-stone-700'}`}>
                          {item.question}
                        </span>
                        {isOpen ? <ChevronUp className="text-amber-500" /> : <ChevronDown className="text-stone-400" />}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6 text-stone-600 leading-relaxed animate-fade-in">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Banner */}
        <div className="mt-16 bg-stone-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-stone-400 mb-8">فريقنا جاهز للإجابة على جميع استفساراتك وتقديم الاستشارة المجانية.</p>
          <button className="bg-amber-500 text-stone-900 px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors">
            تواصل معنا الآن
          </button>
        </div>
      </div>
    </div>
  );
};