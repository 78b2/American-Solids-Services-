import { MarbleType, LegOption, Product, Project } from './types';

export const MARBLE_TYPES: MarbleType[] = [
  {
    id: 'hanex-cc-005',
    name: 'Hanex Cascade White (CC-005)',
    description: 'سطح أبيض نقي مع عروق ناعمة تشبه تدفق المياه. مثالي للمطابخ والحمامات العصرية.',
    priceMultiplier: 1.2,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d?auto=format&fit=crop&q=80&w=500',
    isPremium: true,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  },
  {
    id: 'hanex-cc-006',
    name: 'Hanex Cascade Black (CC-006)',
    description: 'أسود فخم مع تموجات رمادية وبيضاء دقيقة. يعطي عمقاً وفخامة للمكان.',
    priceMultiplier: 1.25,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=500',
    isPremium: true,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  },
  {
    id: 'hanex-cc-003',
    name: 'Hanex Cascade Grey (CC-003)',
    description: 'رمادي متوازن مع عروق طبيعية. خيار عملي وأنيق يخفي الآثار ويتحمل الاستخدام.',
    priceMultiplier: 1.15,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1618524458563-71f654060805?auto=format&fit=crop&q=80&w=500',
    isPremium: false,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  },
  {
    id: 'hanex-b-012',
    name: 'Hanex Oslo White (B-012)',
    description: 'أبيض ثلجي ناصع بدون عروق. قمة النظافة والبساطة (Minimalist).',
    priceMultiplier: 1.0,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d?auto=format&fit=crop&q=80&w=500', // Reusing white for pure white
    isPremium: false,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  },
  {
    id: 'hanex-bl-201',
    name: 'Hanex Kashmere (BL-201)',
    description: 'لون كريمي دافئ مع تفاصيل دقيقة تشبه الحجر الطبيعي. يضفي دفئاً على المساحات.',
    priceMultiplier: 1.1,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=500',
    isPremium: false,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  },
  {
    id: 'hanex-cs-402',
    name: 'Hanex Sand Concrete (CS-402)',
    description: 'مظهر الخرسانة الصناعية بلون رملي. مثالي للتصاميم الصناعية (Industrial) والعصرية.',
    priceMultiplier: 1.1,
    origin: 'Hanex Solid Surfaces',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?auto=format&fit=crop&q=80&w=500',
    isPremium: false,
    availableFor: ['tables', 'kitchen', 'washbasin', 'console', 'coffee-corner'],
    isActive: true
  }
];

export const LEG_OPTIONS: LegOption[] = [
  {
    id: 'wood-oak',
    name: 'خشب سنديان طبيعي',
    material: 'wood',
    price: 50,
    image: 'https://images.unsplash.com/photo-1542840410-3092f48dfc11?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'wood-walnut',
    name: 'خشب جوز غامق',
    material: 'wood',
    price: 80,
    image: 'https://images.unsplash.com/photo-1601051515286-63e8e458e38c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'metal-black',
    name: 'حديد أسود مطفي',
    material: 'metal',
    price: 100,
    image: 'https://images.unsplash.com/photo-1532323544230-7191fd510c59?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'metal-gold',
    name: 'ستانلس ستيل ذهبي',
    material: 'metal',
    price: 250,
    image: 'https://images.unsplash.com/photo-1629814421160-c116c21e6c38?auto=format&fit=crop&q=80&w=200'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'طاولة قهوة سوليد',
    price: 380,
    category: 'طاولات قهوة',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600',
    description: 'طاولة قهوة دائرية من الرخام الكوري (الأسطح الصلبة). تتميز بملمس حريري ومقاومة تامة للبقع والسوائل، مع تصميم انسيابي بدون أي فواصل ظاهرة.',
    discountPercentage: 10,
    sizes: ['80x80 سم', '100x100 سم', '120x120 سم'],
    reviews: [
      { id: 'r1', user: 'أميرة محمد', rating: 5, comment: 'عملية جداً وسهلة التنظيف، القهوة ما تبقع فيها أبداً.', date: '2024-02-15' },
      { id: 'r2', user: 'سارة علي', rating: 4, comment: 'ناعمة جداً وآمنة للأطفال بسبب الحواف الدائرية.', date: '2024-02-10' }
    ]
  },
  {
    id: 'p2',
    name: 'كونسول استقبال مودرن',
    price: 650,
    category: 'مداخل',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600',
    description: 'كونسول بتصميم مينيماليست من الرخام الكوري الأبيض النقي. يضفي اتساعاً ونظافة بصرية للمدخل، ومقاوم للخدش.',
    discountPercentage: 0,
    sizes: ['120x40 سم', '140x45 سم'],
    reviews: [
      { id: 'r3', user: 'خالد العمري', rating: 5, comment: 'خامة ممتازة وشكل عصري جداً.', date: '2024-01-20' }
    ]
  },
  {
    id: 'p3',
    name: 'طاولة طعام بيور',
    price: 1100,
    category: 'طاولات طعام',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600',
    description: 'طاولة طعام عائلية من الأكريليك الصلب (الرخام الكوري). سطح غير مسامي يمنع تراكم البكتيريا والفطريات، مثالي للاستخدام اليومي الكثيف.',
    discountPercentage: 15,
    sizes: ['180x90 سم', '200x100 سم', '240x110 سم'],
    reviews: []
  },
  {
    id: 'p4',
    name: 'مغسلة حوض متصل',
    price: 1400,
    category: 'مغاسل',
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    description: 'مغسلة مدمجة مع السطح بتقنية الصب المتصل (Seamless)، لا توجد زوايا لتجمع الأوساخ. قمة النظافة والجمال العصري.',
    discountPercentage: 5,
    sizes: ['80 سم', '100 سم', '120 سم'],
    reviews: [
      { id: 'r4', user: 'سلطان فهد', rating: 5, comment: 'فكرة الحوض المتصل مع السطح عبقرية للتنظيف.', date: '2024-02-01' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-k1',
    title: 'مطبخ مودرن أبيض',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-k2',
    title: 'كاونتر مطبخ مع جزيرة',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d4390c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-w1',
    title: 'مغسلة حمام فندقية',
    category: 'washbasin',
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-w2',
    title: 'مغسلة حوضين متصلة',
    category: 'washbasin',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-t1',
    title: 'طاولة طعام رخام صناعي',
    category: 'tables',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-c1',
    title: 'كونسول مدخل',
    category: 'console',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-t2',
    title: 'طاولة قهوة دائرية',
    category: 'tables',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'proj-k3',
    title: 'سطح عمل رمادي',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&q=80&w=600'
  }
];