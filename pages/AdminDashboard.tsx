
import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, Layers, Image as ImageIcon, 
  Settings, Users, Search, Plus, Edit, Trash2, Save, X, 
  CheckCircle, Upload, DollarSign, ArrowRight, Phone, MessageSquare,
  Calculator, Ruler, FileText, Shield, Sliders, ToggleLeft, Activity, LogOut, CheckSquare, ChefHat, Layout, Menu, Globe, Mail, Phone as PhoneIcon, MapPin, Percent, Rotate3D
} from 'lucide-react';
import { Product, MarbleType, Project, ConfiguratorSettings, AuditLogEntry, User, ConfigCategory, LogicRule, KitchenSample, DesignCategory, SiteSettings, SurfaceType, ExecutionDetail } from '../types';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  marbles: MarbleType[];
  setMarbles: React.Dispatch<React.SetStateAction<MarbleType[]>>;
  legs: any[]; // Using any for now to avoid import issues, but should be LegOption[]
  setLegs: React.Dispatch<React.SetStateAction<any[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  kitchenSamples: KitchenSample[];
  setKitchenSamples: React.Dispatch<React.SetStateAction<KitchenSample[]>>;
  surfaceTypes: SurfaceType[];
  setSurfaceTypes: React.Dispatch<React.SetStateAction<SurfaceType[]>>;
  executionDetails: ExecutionDetail[];
  setExecutionDetails: React.Dispatch<React.SetStateAction<ExecutionDetail[]>>;
  designCategories: DesignCategory[];
  setDesignCategories: React.Dispatch<React.SetStateAction<DesignCategory[]>>;
  orders: any[];
  updateOrderStatus: (id: string, status: string) => void;
  configurators: ConfiguratorSettings[];
  setConfigurators: React.Dispatch<React.SetStateAction<ConfiguratorSettings[]>>;
  auditLog: AuditLogEntry[];
  users: User[];
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products, setProducts, marbles, setMarbles, legs, setLegs, projects, setProjects, 
  kitchenSamples, setKitchenSamples, surfaceTypes, setSurfaceTypes, executionDetails, setExecutionDetails, designCategories, setDesignCategories,
  orders, updateOrderStatus,
  configurators, setConfigurators, auditLog, users, onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConfiguratorId, setSelectedConfiguratorId] = useState<ConfigCategory | null>(null);

  // -- Modal States --
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isMarbleModalOpen, setMarbleModalOpen] = useState(false);
  const [editingMarble, setEditingMarble] = useState<MarbleType | null>(null);

  const [isLegModalOpen, setLegModalOpen] = useState(false);
  const [editingLeg, setEditingLeg] = useState<any | null>(null);

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isKitchenSampleModalOpen, setKitchenSampleModalOpen] = useState(false);
  const [editingKitchenSample, setEditingKitchenSample] = useState<KitchenSample | null>(null);

  const [isDesignCategoryModalOpen, setDesignCategoryModalOpen] = useState(false);
  const [editingDesignCategory, setEditingDesignCategory] = useState<DesignCategory | null>(null);

  const [isSurfaceTypeModalOpen, setSurfaceTypeModalOpen] = useState(false);
  const [editingSurfaceType, setEditingSurfaceType] = useState<SurfaceType | null>(null);

  const [isExecutionDetailModalOpen, setExecutionDetailModalOpen] = useState(false);
  const [editingExecutionDetail, setEditingExecutionDetail] = useState<ExecutionDetail | null>(null);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'American Solids Service',
    contactEmail: 'info@assdco.com',
    contactPhone: '+962790303867',
    whatsappNumber: '+962790303867',
    address: 'عمان، الأردن',
    currency: 'JOD',
    taxRate: 0.16
  });

  // -- Helpers --
  const getAuditLogColor = (action: string) => {
    if (action.includes('DELETE')) return 'text-red-600 bg-red-50';
    if (action.includes('UPDATE')) return 'text-blue-600 bg-blue-50';
    if (action.includes('CREATE')) return 'text-green-600 bg-green-50';
    return 'text-stone-600 bg-stone-50';
  };

  // -- Handlers --
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ الإعدادات بنجاح (محاكاة)');
    // In a real app, this would save to backend
  };

  const handleSaveSurfaceType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSurfaceType) return;

    if (surfaceTypes.find(s => s.id === editingSurfaceType.id)) {
      setSurfaceTypes(prev => prev.map(s => s.id === editingSurfaceType.id ? editingSurfaceType : s));
    } else {
      setSurfaceTypes(prev => [...prev, { ...editingSurfaceType, id: `st-${Date.now()}` }]);
    }
    setSurfaceTypeModalOpen(false);
    setEditingSurfaceType(null);
  };

  const handleDeleteSurfaceType = (id: string) => {
    if (confirm('هل أنت متأكد من حذف نوع السطح هذا؟')) {
      setSurfaceTypes(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSaveExecutionDetail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExecutionDetail) return;

    if (executionDetails.find(d => d.id === editingExecutionDetail.id)) {
      setExecutionDetails(prev => prev.map(d => d.id === editingExecutionDetail.id ? editingExecutionDetail : d));
    } else {
      setExecutionDetails(prev => [...prev, { ...editingExecutionDetail, id: `ed-${Date.now()}` }]);
    }
    setExecutionDetailModalOpen(false);
    setEditingExecutionDetail(null);
  };

  const handleDeleteExecutionDetail = (id: string) => {
    if (confirm('هل أنت متأكد من حذف تفصيل التنفيذ هذا؟')) {
      setExecutionDetails(prev => prev.filter(d => d.id !== id));
    }
  };

  // ... (existing handlers)

  // -- Components --

  const SettingsManager = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-stone-900 mb-6">إعدادات الموقع العامة</h2>
      
      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Info */}
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm space-y-4">
           <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2 border-b pb-2 mb-4">
             <Globe size={20} className="text-amber-500" /> معلومات أساسية
           </h3>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">اسم الموقع</label>
             <input type="text" value={siteSettings.siteName} onChange={e => setSiteSettings({...siteSettings, siteName: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50" />
           </div>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">العملة الافتراضية</label>
             <select value={siteSettings.currency} onChange={e => setSiteSettings({...siteSettings, currency: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50">
               <option value="JOD">دينار أردني (JOD)</option>
               <option value="USD">دولار أمريكي (USD)</option>
               <option value="SAR">ريال سعودي (SAR)</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">نسبة الضريبة</label>
             <div className="relative">
               <input type="number" step="0.01" value={siteSettings.taxRate} onChange={e => setSiteSettings({...siteSettings, taxRate: Number(e.target.value)})} className="w-full p-3 border rounded-xl bg-stone-50 pl-10" />
               <Percent size={16} className="absolute left-3 top-4 text-stone-400" />
             </div>
           </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm space-y-4">
           <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2 border-b pb-2 mb-4">
             <PhoneIcon size={20} className="text-amber-500" /> معلومات التواصل
           </h3>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
             <div className="relative">
                <input type="email" value={siteSettings.contactEmail} onChange={e => setSiteSettings({...siteSettings, contactEmail: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50 pl-10" />
                <Mail size={16} className="absolute left-3 top-4 text-stone-400" />
             </div>
           </div>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">رقم الهاتف</label>
             <div className="relative">
                <input type="text" value={siteSettings.contactPhone} onChange={e => setSiteSettings({...siteSettings, contactPhone: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50 pl-10" />
                <PhoneIcon size={16} className="absolute left-3 top-4 text-stone-400" />
             </div>
           </div>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">رقم الواتساب</label>
             <div className="relative">
                <input type="text" value={siteSettings.whatsappNumber} onChange={e => setSiteSettings({...siteSettings, whatsappNumber: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50 pl-10" />
                <MessageSquare size={16} className="absolute left-3 top-4 text-stone-400" />
             </div>
           </div>
           <div>
             <label className="block text-sm font-bold text-stone-700 mb-1">العنوان</label>
             <div className="relative">
                <input type="text" value={siteSettings.address} onChange={e => setSiteSettings({...siteSettings, address: e.target.value})} className="w-full p-3 border rounded-xl bg-stone-50 pl-10" />
                <MapPin size={16} className="absolute left-3 top-4 text-stone-400" />
             </div>
           </div>
        </div>

        <div className="lg:col-span-2">
           <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg">
             حفظ كافة الإعدادات
           </button>
        </div>
      </form>
    </div>
  );

  // -- Components --

  const Overview = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl"><DollarSign size={24} /></div>
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">+12% <ArrowRight className="rotate-[-45deg]" size={12} /></span>
            </div>
            <h3 className="text-stone-500 text-sm font-bold mb-1">إجمالي المبيعات</h3>
            <p className="text-2xl font-bold text-stone-900">12,450 د.أ</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShoppingCart size={24} /></div>
                <span className="text-blue-600 text-xs font-bold flex items-center gap-1">+5 <ArrowRight className="rotate-[-45deg]" size={12} /></span>
            </div>
            <h3 className="text-stone-500 text-sm font-bold mb-1">الطلبات النشطة</h3>
            <p className="text-2xl font-bold text-stone-900">{orders.filter(o => o.status !== 'completed').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Sliders size={24} /></div>
            </div>
            <h3 className="text-stone-500 text-sm font-bold mb-1">الأنظمة النشطة</h3>
            <p className="text-2xl font-bold text-stone-900">{configurators.filter(c => c.isActive).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users size={24} /></div>
            </div>
            <h3 className="text-stone-500 text-sm font-bold mb-1">المستخدمين</h3>
            <p className="text-2xl font-bold text-stone-900">{users.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
        <h3 className="font-bold text-lg text-stone-900 mb-6">أحدث الطلبات</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-stone-400 font-normal border-b border-stone-100">
              <tr>
                <th className="pb-3 pr-4">الطلب</th>
                <th className="pb-3">العميل</th>
                <th className="pb-3">تفاصيل</th>
                <th className="pb-3">الحالة</th>
                <th className="pb-3">المجموع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50">
                  <td className="py-4 pr-4 font-mono text-stone-500">#{order.id.slice(-4)}</td>
                  <td className="py-4 font-bold">{order.customerName || 'زائر'}</td>
                  <td className="py-4 text-stone-600 truncate max-w-[200px]">
                    {order.items.map((i:any) => i.name).join(', ')}
                  </td>
                  <td className="py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status === 'new' ? 'جديد' : order.status === 'processing' ? 'قيد التنفيذ' : 'مكتمل'}
                      </span>
                  </td>
                  <td className="py-4 font-bold">{order.total} د.أ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (products.find(p => p.id === editingProduct.id)) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      setProducts(prev => [...prev, { ...editingProduct, id: `p-${Date.now()}` }]);
    }
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟ سيتم نقله للأرشيف (Soft Delete).')) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: false } : p));
    }
  };

  const handleSaveMarble = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarble) return;

    if (marbles.find(m => m.id === editingMarble.id)) {
      setMarbles(prev => prev.map(m => m.id === editingMarble.id ? editingMarble : m));
    } else {
      setMarbles(prev => [...prev, { ...editingMarble, id: `m-${Date.now()}` }]);
    }
    setMarbleModalOpen(false);
    setEditingMarble(null);
  };

  const handleDeleteMarble = (id: string) => {
    if (confirm('حذف هذا الرخام قد يؤثر على المنتجات. هل أنت متأكد؟')) {
      setMarbles(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (projects.find(p => p.id === editingProject.id)) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      setProjects(prev => [...prev, { ...editingProject, id: `proj-${Date.now()}` }]);
    }
    setProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveKitchenSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKitchenSample) return;

    if (kitchenSamples.find(k => k.id === editingKitchenSample.id)) {
      setKitchenSamples(prev => prev.map(k => k.id === editingKitchenSample.id ? editingKitchenSample : k));
    } else {
      setKitchenSamples(prev => [...prev, { ...editingKitchenSample, id: `ks-${Date.now()}` }]);
    }
    setKitchenSampleModalOpen(false);
    setEditingKitchenSample(null);
  };

  const handleDeleteKitchenSample = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه العينة؟')) {
      setKitchenSamples(prev => prev.filter(k => k.id !== id));
    }
  };

  const handleSaveDesignCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDesignCategory) return;

    if (designCategories.find(c => c.id === editingDesignCategory.id)) {
      setDesignCategories(prev => prev.map(c => c.id === editingDesignCategory.id ? editingDesignCategory : c));
    } else {
      setDesignCategories(prev => [...prev, { ...editingDesignCategory, id: `cat-${Date.now()}` }]);
    }
    setDesignCategoryModalOpen(false);
    setEditingDesignCategory(null);
  };

  const handleDeleteDesignCategory = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      setDesignCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleUpdateConfigurator = (updatedConfig: ConfiguratorSettings) => {
    setConfigurators(prev => prev.map(c => c.id === updatedConfig.id ? updatedConfig : c));
  };

  // -- Components --
  
  // Overview component removed from here as it is already defined above

  const ConfiguratorEditor = ({ configId }: { configId: ConfigCategory }) => {
    const originalConfig = configurators.find(c => c.id === configId);
    const [localConfig, setLocalConfig] = useState<ConfiguratorSettings | undefined>(originalConfig);
    const [editorTab, setEditorTab] = useState('dimensions'); // dimensions, pricing, rules, extras
    const [hasChanges, setHasChanges] = useState(false);

    React.useEffect(() => {
        setLocalConfig(originalConfig);
        setHasChanges(false);
    }, [originalConfig]);

    if (!localConfig) return <div>غير موجود</div>;

    const handleLocalUpdate = (updatedConfig: ConfiguratorSettings) => {
        setLocalConfig(updatedConfig);
        setHasChanges(true);
    };

    const saveChanges = () => {
        if (localConfig) {
            handleUpdateConfigurator(localConfig);
            setHasChanges(false);
            alert('تم حفظ التغييرات بنجاح');
        }
    };

    // Helper to update specific nested properties
    const updateDimension = (key: string, field: string, value: any) => {
        const newDims = { ...localConfig.dimensions, [key]: { ...(localConfig.dimensions as any)[key], [field]: value } };
        handleLocalUpdate({ ...localConfig, dimensions: newDims });
    };

    const addRule = () => {
        const newRule: LogicRule = {
            id: `rule-${Date.now()}`,
            conditionField: 'shape',
            operator: 'equals',
            value: '',
            action: 'hide_field',
            actionTarget: ''
        };
        handleLocalUpdate({ ...localConfig, rules: [...localConfig.rules, newRule] });
    };

    const removeRule = (ruleId: string) => {
        handleLocalUpdate({ ...localConfig, rules: localConfig.rules.filter(r => r.id !== ruleId) });
    };

    const updateRule = (ruleId: string, field: keyof LogicRule, value: any) => {
        const newRules = localConfig.rules.map(r => r.id === ruleId ? { ...r, [field]: value } : r);
        handleLocalUpdate({ ...localConfig, rules: newRules });
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm sticky top-0 z-20">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                <Sliders className="text-amber-500" />
                إعدادات: {localConfig.name}
              </h2>
              <p className="text-stone-500 text-sm">تحكم كامل في قواعد التسعير، الأبعاد، والمواد المتاحة.</p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                  <span className="text-amber-600 text-sm font-bold animate-pulse">يوجد تغييرات غير محفوظة</span>
              )}
              <button 
                onClick={saveChanges} 
                disabled={!hasChanges}
                className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${hasChanges ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
              >
                  <Save size={18} />
                  حفظ التغييرات
              </button>
              <button onClick={() => setSelectedConfiguratorId(null)} className="text-stone-500 hover:text-stone-900 font-bold px-4">إغلاق</button>
            </div>
        </div>

        {/* Editor Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-xl border border-stone-100 w-fit overflow-x-auto">
            {['dimensions', 'pricing', 'rules', 'extras', 'shapes', 'materials'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setEditorTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${editorTab === tab ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-100'}`}
                >
                    {tab === 'dimensions' ? 'الأبعاد' : 
                     tab === 'pricing' ? 'التسعير' : 
                     tab === 'rules' ? 'القواعد المنطقية' : 
                     tab === 'extras' ? 'الإضافات' :
                     tab === 'shapes' ? 'الأشكال' : 'المواد'}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dimensions Control */}
            {editorTab === 'dimensions' && (
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Ruler size={20} /> حدود الأبعاد</h3>
                    <div className="space-y-4">
                        {Object.entries(localConfig.dimensions).map(([key, dim]: [string, any]) => (
                        <div key={key} className={`p-4 rounded-xl border ${dim.isEnabled ? 'bg-stone-50 border-stone-200' : 'bg-stone-100 border-stone-100 opacity-60'}`}>
                            <div className="flex justify-between mb-3">
                                <span className="font-bold text-stone-700 flex items-center gap-2">
                                    {key === 'length' ? 'الطول' : key === 'width' ? 'العرض' : key === 'height' ? 'الارتفاع' : 'العمق'} 
                                    <span className="text-xs text-stone-400 font-normal">({key})</span>
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-stone-500">تفعيل</span>
                                    <input 
                                        type="checkbox" 
                                        checked={dim.isEnabled} 
                                        onChange={(e) => updateDimension(key, 'isEnabled', e.target.checked)}
                                        className="accent-amber-500 w-4 h-4" 
                                    />
                                </div>
                            </div>
                            {dim.isEnabled && (
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-xs text-stone-500 block mb-1">الحد الأدنى</label>
                                        <input type="number" value={dim.min} onChange={(e) => updateDimension(key, 'min', Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-500 block mb-1">الافتراضي</label>
                                        <input type="number" value={dim.default} onChange={(e) => updateDimension(key, 'default', Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-500 block mb-1">الحد الأقصى</label>
                                        <input type="number" value={dim.max} onChange={(e) => updateDimension(key, 'max', Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-500 block mb-1">الخطوة</label>
                                        <input type="number" value={dim.step} onChange={(e) => updateDimension(key, 'step', Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-none" />
                                    </div>
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Shapes Control */}
            {editorTab === 'shapes' && (
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Layout size={20} /> الأشكال المتاحة</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'rectangle', label: 'مستطيل' },
                            { id: 'circle', label: 'دائري' },
                            { id: 'square', label: 'مربع' },
                            { id: 'oval', label: 'بيضوي' },
                            { id: 'l-shape', label: 'حرف L' },
                            { id: 'u-shape', label: 'حرف U' },
                            { id: 'wall-mounted-straight', label: 'مستقيم جداري' },
                            { id: 'floating', label: 'عائم' },
                            { id: 'two-metal-legs', label: 'مع رجلين معدن' },
                            { id: 'side-waterfall', label: 'مع شلال جانبي' }
                        ].map(shape => (
                            <label key={shape.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${localConfig.allowedShapes.includes(shape.id) ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-100'}`}>
                                <input 
                                    type="checkbox" 
                                    checked={localConfig.allowedShapes.includes(shape.id)}
                                    onChange={(e) => {
                                        const newShapes = e.target.checked 
                                            ? [...localConfig.allowedShapes, shape.id]
                                            : localConfig.allowedShapes.filter(s => s !== shape.id);
                                        handleLocalUpdate({ ...localConfig, allowedShapes: newShapes });
                                    }}
                                    className="accent-amber-500 w-5 h-5"
                                />
                                <span className="font-bold text-stone-700">{shape.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Materials Control */}
            {editorTab === 'materials' && (
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Layers size={20} /> المواد المتاحة</h3>
                    
                    <div className="mb-6">
                        <h4 className="font-bold text-stone-600 mb-3 text-sm">عينات الكوريان (Kitchen Samples)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {kitchenSamples.map(sample => (
                                <label key={sample.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${localConfig.allowedMaterials?.includes(sample.id) ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-100'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={localConfig.allowedMaterials?.includes(sample.id) || false}
                                        onChange={(e) => {
                                            const current = localConfig.allowedMaterials || [];
                                            const newMaterials = e.target.checked 
                                                ? [...current, sample.id]
                                                : current.filter(id => id !== sample.id);
                                            handleLocalUpdate({ ...localConfig, allowedMaterials: newMaterials });
                                        }}
                                        className="accent-amber-500 w-4 h-4"
                                    />
                                    <div className="flex items-center gap-2">
                                        <img src={sample.image} alt={sample.name} className="w-8 h-8 rounded-full object-cover" />
                                        <span className="text-sm font-bold text-stone-700">{sample.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-stone-600 mb-3 text-sm">أنواع الرخام (Marbles)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {marbles.map(marble => (
                                <label key={marble.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${localConfig.allowedMaterials?.includes(marble.id) ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-100'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={localConfig.allowedMaterials?.includes(marble.id) || false}
                                        onChange={(e) => {
                                            const current = localConfig.allowedMaterials || [];
                                            const newMaterials = e.target.checked 
                                                ? [...current, marble.id]
                                                : current.filter(id => id !== marble.id);
                                            handleLocalUpdate({ ...localConfig, allowedMaterials: newMaterials });
                                        }}
                                        className="accent-amber-500 w-4 h-4"
                                    />
                                    <div className="flex items-center gap-2">
                                        <img src={marble.image} alt={marble.name} className="w-8 h-8 rounded-full object-cover" />
                                        <span className="text-sm font-bold text-stone-700">{marble.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Pricing Engine */}
            {editorTab === 'pricing' && (
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Calculator size={20} /> محرك التسعير</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-stone-700 mb-1">الرسوم الأساسية (Base Fee)</label>
                                <input type="number" value={localConfig.pricing.baseFee} 
                                    onChange={(e) => handleLocalUpdate({...localConfig, pricing: {...localConfig.pricing, baseFee: Number(e.target.value)}})}
                                    className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" 
                                />
                                <p className="text-xs text-stone-500 mt-1">سعر ثابت يُضاف لأي طلب (د.أ)</p>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-stone-700 mb-1">سعر الوحدة (Area Rate)</label>
                                <input type="number" value={localConfig.pricing.areaRate} 
                                    onChange={(e) => handleLocalUpdate({...localConfig, pricing: {...localConfig.pricing, areaRate: Number(e.target.value)}})}
                                    className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" 
                                />
                                <p className="text-xs text-stone-500 mt-1">المعامل الضربي للمساحة</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2">معادلة التسعير (Formula Builder)</label>
                            <div className="bg-stone-900 rounded-xl p-4 font-mono text-sm text-green-400 mb-2">
                                <input 
                                    type="text" 
                                    value={localConfig.pricing.formula}
                                    onChange={(e) => handleLocalUpdate({...localConfig, pricing: {...localConfig.pricing, formula: e.target.value}})}
                                    className="bg-transparent w-full outline-none"
                                />
                            </div>
                            <p className="text-xs text-stone-500">
                                المتغيرات المتاحة: <span className="bg-stone-100 px-1 rounded">BASE</span>, <span className="bg-stone-100 px-1 rounded">AREA</span>, <span className="bg-stone-100 px-1 rounded">LENGTH</span>, <span className="bg-stone-100 px-1 rounded">WIDTH</span>, <span className="bg-stone-100 px-1 rounded">MARBLE</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

             {/* Rules Builder */}
             {editorTab === 'rules' && (
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2"><ToggleLeft size={20} /> الشروط المنطقية</h3>
                        <button onClick={addRule} className="text-xs bg-stone-900 text-white px-3 py-2 rounded-lg hover:bg-stone-800 flex items-center gap-1">
                            <Plus size={14} /> إضافة شرط
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {localConfig.rules.length === 0 && <p className="text-stone-400 text-center py-4">لا توجد قواعد شرطية بعد.</p>}
                        {localConfig.rules.map((rule) => (
                            <div key={rule.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap md:flex-nowrap gap-3 items-center">
                                <span className="font-bold text-stone-500 text-sm">إذا كان</span>
                                <select 
                                    className="p-2 rounded-lg border text-sm"
                                    value={rule.conditionField}
                                    onChange={(e) => updateRule(rule.id, 'conditionField', e.target.value)}
                                >
                                    <option value="shape">الشكل</option>
                                    <option value="length">الطول</option>
                                    <option value="width">العرض</option>
                                </select>
                                <select 
                                    className="p-2 rounded-lg border text-sm"
                                    value={rule.operator}
                                    onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
                                >
                                    <option value="equals">يساوي</option>
                                    <option value="greater_than">أكبر من</option>
                                    <option value="less_than">أصغر من</option>
                                </select>
                                <input 
                                    type="text" 
                                    value={rule.value} 
                                    onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                                    className="p-2 rounded-lg border w-24 text-sm"
                                    placeholder="القيمة"
                                />
                                <span className="font-bold text-stone-500 text-sm">فإن</span>
                                <select 
                                    className="p-2 rounded-lg border text-sm"
                                    value={rule.action}
                                    onChange={(e) => updateRule(rule.id, 'action', e.target.value)}
                                >
                                    <option value="hide_field">إخفاء حقل</option>
                                    <option value="add_price">إضافة سعر</option>
                                    <option value="show_warning">إظهار تنبيه</option>
                                </select>
                                <input 
                                    type="text" 
                                    value={rule.actionTarget}
                                    onChange={(e) => updateRule(rule.id, 'actionTarget', e.target.value)}
                                    className="p-2 rounded-lg border flex-grow text-sm"
                                    placeholder="الهدف (مثلاً: width)"
                                />
                                <button onClick={() => removeRule(rule.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* Extras */}
             {editorTab === 'extras' && (
                 <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm animate-fade-in">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package size={20} /> الإضافات والخيارات</h3>
                    <div className="space-y-2">
                        {localConfig.extraOptions.map(opt => (
                        <div key={opt.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                            <div>
                                <span className="font-bold text-stone-800">{opt.name}</span>
                                <p className="text-xs text-stone-500">ID: {opt.id}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-amber-600">{opt.price} د.أ</span>
                                <button className="text-red-400 hover:text-red-600"><X size={16} /></button>
                            </div>
                        </div>
                        ))}
                        <button className="w-full text-center text-amber-600 text-sm font-bold mt-2 hover:bg-amber-50 py-3 rounded-xl border border-dashed border-amber-200 transition-colors">
                            + إضافة خيار جديد
                        </button>
                    </div>
                 </div>
             )}
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                <h3 className="font-bold text-stone-900 mb-4">حالة النظام</h3>
                <label className="flex items-center justify-between cursor-pointer p-3 bg-stone-50 rounded-xl border border-stone-200 mb-4">
                   <span className="font-medium text-stone-700">تفعيل هذا القسم</span>
                   <div className={`w-10 h-6 rounded-full p-1 transition-colors ${localConfig.isActive ? 'bg-green-500' : 'bg-stone-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${localConfig.isActive ? 'translate-x-0' : '-translate-x-4'}`} />
                   </div>
                   <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={localConfig.isActive}
                       onChange={(e) => handleLocalUpdate({...localConfig, isActive: e.target.checked})}
                   />
                </label>
                <div className="text-xs text-stone-400">
                    عند التعطيل، لن يظهر هذا القسم للعملاء في الموقع.
                </div>
             </div>
          </div>

        </div>
      </div>
    );
  };

  const handleSaveLeg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeg) return;

    if (legs.find(l => l.id === editingLeg.id)) {
      setLegs(prev => prev.map(l => l.id === editingLeg.id ? editingLeg : l));
    } else {
      setLegs(prev => [...prev, { ...editingLeg, id: `leg-${Date.now()}` }]);
    }
    setLegModalOpen(false);
    setEditingLeg(null);
  };

  const handleDeleteLeg = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الخيار؟')) {
      setLegs(prev => prev.filter(l => l.id !== id));
    }
  };

  const ThreeDTablesManager = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-stone-900">صفحة الطاولات ثلاثية الأبعاد (3D)</h2>
           <p className="text-stone-500 text-sm mt-1">تحكم كامل في خيارات الرخام والأرجل التي تظهر في صفحة "صمم طاولتك"</p>
        </div>
      </div>

      {/* Marbles Section */}
      <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                <Layers className="text-amber-500" /> 
                1. خيارات الرخام
            </h3>
            <button 
                onClick={() => {
                    setEditingMarble({
                        id: '',
                        name: '',
                        description: '',
                        priceMultiplier: 1.0,
                        origin: 'Hanex Solid Surfaces',
                        image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d',
                        isPremium: false,
                        availableFor: ['tables'],
                        isActive: true
                    });
                    setMarbleModalOpen(true);
                }}
                className="bg-stone-900 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-stone-800 flex items-center gap-2"
            >
                <Plus size={16} /> إضافة رخام
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marbles.filter(m => m.availableFor.includes('tables')).map(marble => (
                <div key={marble.id} className="flex gap-4 p-4 rounded-xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all">
                    <img src={marble.image} alt={marble.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                        <h4 className="font-bold text-stone-900 text-sm">{marble.name}</h4>
                        <p className="text-xs text-stone-500 mb-2 line-clamp-2">{marble.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs bg-stone-100 px-2 py-1 rounded font-mono">x{marble.priceMultiplier}</span>
                            <div className="flex gap-1">
                                <button onClick={() => { setEditingMarble(marble); setMarbleModalOpen(true); }} className="p-1.5 text-stone-500 hover:bg-stone-100 rounded"><Edit size={14} /></button>
                                <button onClick={() => handleDeleteMarble(marble.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Legs Section */}
      <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                <TableLegIcon /> 
                2. خيارات الأرجل
            </h3>
            <button 
                onClick={() => {
                    setEditingLeg({
                        id: '',
                        name: '',
                        material: 'metal',
                        price: 0,
                        image: 'https://images.unsplash.com/photo-1542840410-3092f48dfc11'
                    });
                    setLegModalOpen(true);
                }}
                className="bg-stone-900 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-stone-800 flex items-center gap-2"
            >
                <Plus size={16} /> إضافة أرجل
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {legs.map(leg => (
                <div key={leg.id} className="p-4 rounded-xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all text-center">
                    <img src={leg.image} alt={leg.name} className="w-full h-32 rounded-lg object-cover mb-3" />
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{leg.name}</h4>
                    <p className="text-amber-600 font-bold text-sm mb-3">+{leg.price} د.أ</p>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => { setEditingLeg(leg); setLegModalOpen(true); }} className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-bold">تعديل</button>
                        <button onClick={() => handleDeleteLeg(leg.id)} className="px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded"><Trash2 size={14} /></button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Helper Icon
  const TableLegIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
        <path d="M3 3h18v2H3z" />
        <path d="M4 5v16" />
        <path d="M20 5v16" />
        <path d="M12 5v8" />
    </svg>
  );

  const ConfiguratorCenter = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-stone-900 mb-6">مركز التكوين (Configurator Center)</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configurators.map(conf => (
             <div key={conf.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all cursor-default">
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-4 rounded-2xl ${conf.isActive ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-400'}`}>
                      <Sliders size={28} />
                   </div>
                   <span className={`text-xs font-bold px-3 py-1 rounded-full ${conf.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {conf.isActive ? 'نشط' : 'معطل'}
                   </span>
                </div>
                <h3 className="font-bold text-xl text-stone-900 mb-2">{conf.name}</h3>
                <p className="text-stone-500 text-sm mb-6 h-10 overflow-hidden">
                  {conf.id === 'tables' ? 'نظام الـ 3D الكامل لتخصيص الطاولات.' : conf.id === 'kitchen' ? 'حسابات المتر الطولي والقصات للمطابخ.' : 'إعدادات المغاسل والأحواض.'}
                </p>
                <button 
                  onClick={() => setSelectedConfiguratorId(conf.id)}
                  className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                >
                   <Settings size={18} />
                   إدارة الإعدادات
                </button>
             </div>
          ))}
       </div>
    </div>
  );

  const MaterialManager = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">مكتبة الرخام</h2>
        <button 
          onClick={() => {
            setEditingMarble({
              id: '',
              name: '',
              description: '',
              priceMultiplier: 1.0,
              origin: 'كوريا الجنوبية',
              image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d',
              isPremium: false,
              availableFor: ['tables', 'kitchen'],
              isActive: true
            });
            setMarbleModalOpen(true);
          }}
          className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
        >
          <Plus size={18} /> رخام جديد
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marbles.map(marble => (
          <div key={marble.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm group relative hover:shadow-md transition-shadow">
            {marble.isPremium && <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1"><Shield size={10} /> Premium</span>}
            <div className="relative h-48">
              <img src={marble.image} alt={marble.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-xs px-2 py-1 rounded-md font-mono">
                x{marble.priceMultiplier}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-stone-900">{marble.name}</h3>
              <p className="text-xs text-stone-500 mb-3">{marble.origin}</p>
              
              <div className="flex flex-wrap gap-1 mb-6">
                {marble.availableFor.map(cat => (
                  <span key={cat} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                 <button onClick={() => { setEditingMarble(marble); setMarbleModalOpen(true); }} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <Edit size={16} /> تعديل
                 </button>
                 <button onClick={() => handleDeleteMarble(marble.id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AuditLogViewer = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-stone-900 mb-6">سجل العمليات (Audit Log)</h2>
       <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
         <table className="w-full text-right text-sm">
           <thead className="bg-stone-50 text-stone-500">
             <tr>
               <th className="p-4">العملية</th>
               <th className="p-4">المستخدم</th>
               <th className="p-4">التفاصيل</th>
               <th className="p-4">التوقيت</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-stone-100">
             {auditLog.map(log => (
               <tr key={log.id} className="hover:bg-stone-50">
                 <td className="p-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold ${getAuditLogColor(log.action)}`}>
                     {log.action}
                   </span>
                 </td>
                 <td className="p-4 font-bold">{log.user}</td>
                 <td className="p-4 text-stone-600">{log.details}</td>
                 <td className="p-4 text-stone-400 font-mono text-xs" dir="ltr">{new Date(log.timestamp).toLocaleString('ar-JO')}</td>
               </tr>
             ))}
           </tbody>
         </table>
         {auditLog.length === 0 && <p className="text-center py-10 text-stone-400">لا توجد سجلات</p>}
       </div>
    </div>
  );

  const ProductManager = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">إدارة المنتجات</h2>
        <button 
          onClick={() => {
            setEditingProduct({
              id: '',
              name: '',
              price: 0,
              category: 'طاولات قهوة',
              image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc',
              description: '',
              discountPercentage: 0,
              sizes: []
            });
            setProductModalOpen(true);
          }}
          className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
        >
          <Plus size={18} /> منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-stone-50 text-stone-500 font-medium text-sm">
            <tr>
              <th className="p-4">المنتج</th>
              <th className="p-4">القسم</th>
              <th className="p-4">السعر</th>
              <th className="p-4">التحكم</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.filter(p => p.isActive !== false).map(product => (
              <tr key={product.id} className="hover:bg-stone-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  <span className="font-bold">{product.name}</span>
                </td>
                <td className="p-4 text-stone-500">{product.category}</td>
                <td className="p-4 font-bold">{product.price} د.أ</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => { setEditingProduct(product); setProductModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OrdersManager = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-stone-900 mb-6">إدارة الطلبات</h2>
      <div className="space-y-4">
        {orders.map(order => (
           <div key={order.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="font-bold text-lg text-stone-900">الطلب #{order.id.slice(-4)}</h3>
                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'new' ? 'جديد' : order.status === 'processing' ? 'قيد التنفيذ' : 'مكتمل'}
                   </span>
                </div>
                <p className="text-sm text-stone-500 mb-1">العميل: <span className="text-stone-800 font-bold">{order.customerName || 'زائر'}</span></p>
                <div className="text-sm text-stone-600">
                  {order.items.map((i:any, idx:number) => (
                    <span key={idx} className="block">• {i.name} ({i.quantity}) - <span className="text-xs text-stone-400">{i.details}</span></span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 min-w-[200px]">
                 <span className="text-2xl font-bold text-amber-600">{order.total} د.أ</span>
                 <div className="flex gap-2">
                    {order.status !== 'completed' && (
                      <button onClick={() => updateOrderStatus(order.id, 'completed')} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100">
                         إكمال
                      </button>
                    )}
                    {order.status === 'new' && (
                       <button onClick={() => updateOrderStatus(order.id, 'processing')} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100">
                         بدء التنفيذ
                      </button>
                    )}
                     <a href={`https://wa.me/962790303867?text=مرحبا، بخصوص طلبك رقم ${order.id}`} target="_blank" className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-sm font-bold hover:bg-stone-200 flex items-center gap-1">
                        <MessageSquare size={14} /> واتساب
                     </a>
                 </div>
              </div>
           </div>
        ))}
        {orders.length === 0 && <div className="text-center py-10 text-stone-400">لا توجد طلبات لعرضها</div>}
      </div>
    </div>
  );

  const ProjectsManager = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">معرض الأعمال</h2>
        <button 
          onClick={() => {
            setEditingProject({
              id: '',
              title: '',
              category: 'kitchen',
              image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f'
            });
            setProjectModalOpen(true);
          }}
          className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
        >
          <Plus size={18} /> مشروع جديد
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {projects.map(proj => (
           <div key={proj.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={proj.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center gap-2">
                 <h3 className="text-white font-bold mb-2">{proj.title}</h3>
                 <div className="flex gap-2">
                    <button onClick={() => { setEditingProject(proj); setProjectModalOpen(true); }} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm font-bold">تعديل</button>
                    <button onClick={() => handleDeleteProject(proj.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm font-bold">حذف</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  // Helper Component for Suspense Image
  const SuspenseImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 bg-stone-100 animate-pulse flex items-center justify-center text-stone-300">
            <ImageIcon size={24} />
          </div>
        )}
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1596483758376-749479b6d80d'; // Fallback
            setLoaded(true);
          }}
        />
      </div>
    );
  };

  const KitchenSettingsManager = () => (
    <div className="space-y-12 animate-fade-in">
       
       {/* Kitchen Samples Section */}
       <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-stone-900">عينات الكوريان (Kitchen Samples)</h2>
            <button 
            onClick={() => {
                setEditingKitchenSample({
                id: '',
                name: '',
                image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d'
                });
                setKitchenSampleModalOpen(true);
            }}
            className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
            >
            <Plus size={18} /> عينة جديدة
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kitchenSamples.map(sample => (
            <div key={sample.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm group relative hover:shadow-md transition-shadow">
                <div className="relative h-48">
                <SuspenseImage src={sample.image} alt={sample.name} className="w-full h-full" />
                </div>
                <div className="p-5">
                <h3 className="font-bold text-lg text-stone-900 mb-2">{sample.name}</h3>
                {sample.color && (
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full border border-stone-200" style={{ backgroundColor: sample.color }}></div>
                        <span className="text-xs text-stone-500 font-mono">{sample.color}</span>
                    </div>
                )}
                <div className="flex gap-2">
                    <button onClick={() => { setEditingKitchenSample(sample); setKitchenSampleModalOpen(true); }} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                        <Edit size={16} /> تعديل
                    </button>
                    <button onClick={() => handleDeleteKitchenSample(sample.id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"><Trash2 size={16}/></button>
                </div>
                </div>
            </div>
            ))}
        </div>
       </div>

       {/* Surface Types Section */}
       <div className="space-y-6 border-t border-stone-200 pt-8">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-stone-900">أنواع الأسطح (Surface Types)</h2>
            <button 
            onClick={() => {
                setEditingSurfaceType({
                id: '',
                name: '',
                priceMultiplier: 1.0,
                description: ''
                });
                setSurfaceTypeModalOpen(true);
            }}
            className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
            >
            <Plus size={18} /> نوع جديد
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {surfaceTypes.map(st => (
            <div key={st.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-stone-900">{st.name}</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-lg">x{st.priceMultiplier}</span>
                </div>
                <p className="text-stone-500 text-sm mb-6">{st.description || 'لا يوجد وصف'}</p>
                <div className="flex gap-2">
                    <button onClick={() => { setEditingSurfaceType(st); setSurfaceTypeModalOpen(true); }} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                        <Edit size={16} /> تعديل
                    </button>
                    <button onClick={() => handleDeleteSurfaceType(st.id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"><Trash2 size={16}/></button>
                </div>
            </div>
            ))}
        </div>
       </div>

       {/* Execution Details Section */}
       <div className="space-y-6 border-t border-stone-200 pt-8">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-stone-900">تفاصيل التنفيذ (Execution Details)</h2>
            <button 
            onClick={() => {
                setEditingExecutionDetail({
                id: '',
                title: '',
                price: 0
                });
                setExecutionDetailModalOpen(true);
            }}
            className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
            >
            <Plus size={18} /> تفصيل جديد
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionDetails.map(ed => (
            <div key={ed.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-stone-900 mb-2">{ed.title}</h3>
                    <p className="text-stone-500 text-sm mb-4">{ed.price ? `+${ed.price} د.أ` : 'مجاني'}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                    <button onClick={() => { setEditingExecutionDetail(ed); setExecutionDetailModalOpen(true); }} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                        <Edit size={16} /> تعديل
                    </button>
                    <button onClick={() => handleDeleteExecutionDetail(ed.id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"><Trash2 size={16}/></button>
                </div>
            </div>
            ))}
        </div>
       </div>
    </div>
  );

  const DesignCategoriesManager = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">إدارة أقسام التصميم (Design Hub)</h2>
        <button 
          onClick={() => {
            setEditingDesignCategory({
              id: '',
              title: '',
              description: '',
              icon: 'Layout'
            });
            setDesignCategoryModalOpen(true);
          }}
          className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-amber-500 transition-colors"
        >
          <Plus size={18} /> قسم جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designCategories.map(cat => (
          <div key={cat.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-stone-100 rounded-xl text-stone-600">
                  {/* Simple icon placeholder or dynamic icon if possible */}
                  <Layout size={24} />
               </div>
               <div className="flex gap-2">
                  <button onClick={() => { setEditingDesignCategory(cat); setDesignCategoryModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                  <button onClick={() => handleDeleteDesignCategory(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
               </div>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">{cat.title}</h3>
            <p className="text-sm text-stone-500 mb-4 h-10 overflow-hidden">{cat.description}</p>
            <div className="text-xs text-stone-400 font-mono bg-stone-50 p-2 rounded">ID: {cat.id}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // -- Sidebar & Layout --

  if (selectedConfiguratorId) {
    return (
      <div className="min-h-screen bg-stone-100 font-sans p-8" dir="rtl">
         <ConfiguratorEditor configId={selectedConfiguratorId} />
      </div>
    );
  }

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
        activeTab === id 
          ? 'bg-amber-500 text-stone-900 font-bold shadow-lg shadow-amber-500/20' 
          : 'text-stone-400 hover:bg-stone-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const SidebarContent = () => (
    <>
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">لوحة التحكم</h1>
          <p className="text-xs text-stone-500">{siteSettings.siteName}</p>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-stone-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-grow px-4 overflow-y-auto no-scrollbar pb-20">
        <SidebarItem id="overview" label="الرئيسية" icon={LayoutDashboard} />
        <SidebarItem id="orders" label="إدارة الطلبات" icon={ShoppingCart} />
        <SidebarItem id="products" label="المنتجات الجاهزة" icon={Package} />
        <div className="my-2 border-t border-stone-800"></div>
        <SidebarItem id="configurators" label="مركز التكوين" icon={Sliders} />
        <SidebarItem id="3d-tables" label="صفحة الطاولات 3D" icon={Rotate3D} />
        <SidebarItem id="kitchen-settings" label="إعدادات المطبخ" icon={ChefHat} />
        <SidebarItem id="design-categories" label="أقسام التصميم" icon={Layout} />
        <SidebarItem id="materials" label="مكتبة الرخام" icon={Layers} />
        <div className="my-2 border-t border-stone-800"></div>
        <SidebarItem id="projects" label="معرض الأعمال" icon={ImageIcon} />
        <SidebarItem id="users" label="المستخدمين" icon={Users} />
        <SidebarItem id="audit" label="سجل النشاط" icon={Activity} />
        <SidebarItem id="settings" label="الإعدادات" icon={Settings} />
      </nav>

      <div className="p-4 border-t border-stone-800 absolute bottom-0 w-full bg-stone-900">
          <button onClick={onNavigateHome} className="w-full flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
            <LogOut size={18} />
            العودة للموقع
          </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-stone-100 flex font-sans" dir="rtl">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex-shrink-0 hidden md:flex flex-col h-screen fixed right-0 top-0 z-10 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-stone-900 text-stone-300 flex flex-col h-full shadow-2xl animate-fade-in-right">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 md:mr-64 min-h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 bg-white rounded-xl border border-stone-200 text-stone-700">
               <Menu size={24} />
             </button>
             <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
               {activeTab === 'overview' ? 'لوحة التحكم' : 
                activeTab === 'products' ? 'إدارة المنتجات' :
                activeTab === 'marbles' ? 'مكتبة الرخام' :
                activeTab === 'projects' ? 'المشاريع' :
                activeTab === 'kitchen-settings' ? 'إعدادات المطبخ' :
                activeTab === 'design-categories' ? 'أقسام التصميم' :
                activeTab === 'configurator' ? 'مركز التكوين' : 
                activeTab === 'settings' ? 'الإعدادات العامة' : 'سجل العمليات'}
             </h1>
           </div>
           
           <div className="flex gap-4">
             <button className="bg-white p-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 relative">
               <MessageSquare size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
           </div>
        </header>

        {activeTab === 'overview' && <Overview />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'configurators' && <ConfiguratorCenter />}
        {activeTab === '3d-tables' && <ThreeDTablesManager />}
        {activeTab === 'kitchen-settings' && <KitchenSettingsManager />}
        {activeTab === 'design-categories' && <DesignCategoriesManager />}
        {activeTab === 'materials' && <MaterialManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'audit' && <AuditLogViewer />}
        {activeTab === 'settings' && <SettingsManager />}
        
        {activeTab === 'users' && (
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 animate-fade-in">
             <h2 className="text-xl font-bold mb-6 text-stone-900">المستخدمين والصلاحيات</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map(u => (
                  <div key={u.id} className="flex justify-between items-center p-4 bg-white border border-stone-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center font-bold text-stone-600">
                            {u.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-stone-900">{u.name}</p>
                            <p className="text-xs text-stone-500">{u.email}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-600'}`}>{u.role}</span>
                  </div>
                ))}
             </div>
           </div>
        )}

        {/* Leg Modal */}
        {isLegModalOpen && editingLeg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingLeg.id ? 'تعديل خيار الأرجل' : 'خيار أرجل جديد'}
                </h3>
                <button onClick={() => setLegModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveLeg} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">الاسم</label>
                  <input 
                    required
                    value={editingLeg.name}
                    onChange={e => setEditingLeg({...editingLeg, name: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">السعر الإضافي (د.أ)</label>
                  <input 
                    type="number"
                    required
                    value={editingLeg.price}
                    onChange={e => setEditingLeg({...editingLeg, price: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">رابط الصورة</label>
                  <input 
                    required
                    value={editingLeg.image}
                    onChange={e => setEditingLeg({...editingLeg, image: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">المادة</label>
                  <select 
                    value={editingLeg.material}
                    onChange={e => setEditingLeg({...editingLeg, material: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                      <option value="wood">خشب</option>
                      <option value="metal">معدن</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setLegModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Kitchen Sample Modal */}
        {isKitchenSampleModalOpen && editingKitchenSample && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingKitchenSample.id ? 'تعديل عينة' : 'عينة جديدة'}
                </h3>
                <button onClick={() => setKitchenSampleModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveKitchenSample} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">الاسم</label>
                  <input 
                    required
                    value={editingKitchenSample.name}
                    onChange={e => setEditingKitchenSample({...editingKitchenSample, name: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">رابط الصورة</label>
                  <input 
                    required
                    value={editingKitchenSample.image}
                    onChange={e => setEditingKitchenSample({...editingKitchenSample, image: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">اللون (Hex)</label>
                  <div className="flex gap-2">
                    <input 
                        type="color"
                        value={editingKitchenSample.color || '#ffffff'}
                        onChange={e => setEditingKitchenSample({...editingKitchenSample, color: e.target.value})}
                        className="w-12 h-10 p-1 border rounded-lg cursor-pointer"
                    />
                    <input 
                        type="text"
                        value={editingKitchenSample.color || ''}
                        onChange={e => setEditingKitchenSample({...editingKitchenSample, color: e.target.value})}
                        placeholder="#FFFFFF"
                        className="flex-1 p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setKitchenSampleModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Design Category Modal */}
        {isDesignCategoryModalOpen && editingDesignCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingDesignCategory.id ? 'تعديل قسم' : 'قسم جديد'}
                </h3>
                <button onClick={() => setDesignCategoryModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveDesignCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">العنوان</label>
                  <input 
                    required
                    value={editingDesignCategory.title}
                    onChange={e => setEditingDesignCategory({...editingDesignCategory, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">الوصف</label>
                  <textarea 
                    required
                    value={editingDesignCategory.description}
                    onChange={e => setEditingDesignCategory({...editingDesignCategory, description: e.target.value})}
                    className="w-full p-2 border rounded-lg h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">الأيقونة</label>
                  <select 
                    value={editingDesignCategory.icon}
                    onChange={e => setEditingDesignCategory({...editingDesignCategory, icon: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                      <option value="Layout">Layout</option>
                      <option value="ChefHat">ChefHat (Kitchen)</option>
                      <option value="Droplets">Droplets (Washbasin)</option>
                      <option value="Armchair">Armchair (Console)</option>
                      <option value="Coffee">Coffee (Table)</option>
                      <option value="Utensils">Utensils (Dining)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="categoryActive"
                        checked={editingDesignCategory.isActive !== false}
                        onChange={e => setEditingDesignCategory({...editingDesignCategory, isActive: e.target.checked})}
                        className="w-4 h-4 accent-stone-900"
                    />
                    <label htmlFor="categoryActive" className="text-sm font-bold cursor-pointer">قسم نشط (يظهر في الموقع)</label>
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setDesignCategoryModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingProduct.id ? 'تعديل منتج' : 'منتج جديد'}
                </h3>
                <button onClick={() => setProductModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">اسم المنتج</label>
                  <input 
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">السعر (د.أ)</label>
                        <input 
                            type="number"
                            required
                            value={editingProduct.price}
                            onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">الخصم (%)</label>
                        <input 
                            type="number"
                            value={editingProduct.discountPercentage || 0}
                            onChange={e => setEditingProduct({...editingProduct, discountPercentage: Number(e.target.value)})}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">القسم</label>
                  <select 
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                      <option value="طاولات قهوة">طاولات قهوة</option>
                      <option value="طاولات جانبية">طاولات جانبية</option>
                      <option value="كونسول">كونسول</option>
                      <option value="مغاسل">مغاسل</option>
                      <option value="اكسسوارات">اكسسوارات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">رابط الصورة</label>
                  <input 
                    required
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">الوصف</label>
                  <textarea 
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full p-2 border rounded-lg h-24"
                  />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">المقاسات المتاحة (مفصولة بفاصلة)</label>
                    <input 
                        type="text"
                        placeholder="مثال: 120x60, 140x70"
                        value={editingProduct.sizes?.join(', ') || ''}
                        onChange={e => setEditingProduct({...editingProduct, sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="productActive"
                        checked={editingProduct.isActive !== false}
                        onChange={e => setEditingProduct({...editingProduct, isActive: e.target.checked})}
                        className="w-4 h-4 accent-stone-900"
                    />
                    <label htmlFor="productActive" className="text-sm font-bold cursor-pointer">منتج نشط (يظهر في الموقع)</label>
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setProductModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {isProjectModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingProject.id ? 'تعديل مشروع' : 'مشروع جديد'}
                </h3>
                <button onClick={() => setProjectModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">عنوان المشروع</label>
                  <input 
                    required
                    value={editingProject.title}
                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">القسم</label>
                  <select 
                    value={editingProject.category}
                    onChange={e => setEditingProject({...editingProject, category: e.target.value as any})}
                    className="w-full p-2 border rounded-lg"
                  >
                      <option value="kitchen">مطبخ</option>
                      <option value="washbasin">مغسلة</option>
                      <option value="counter">كاونتر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">رابط الصورة</label>
                  <input 
                    required
                    value={editingProject.image}
                    onChange={e => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setProjectModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Surface Type Modal */}
        {isSurfaceTypeModalOpen && editingSurfaceType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingSurfaceType.id ? 'تعديل نوع السطح' : 'نوع سطح جديد'}
                </h3>
                <button onClick={() => setSurfaceTypeModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveSurfaceType} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">الاسم</label>
                  <input 
                    required
                    value={editingSurfaceType.name}
                    onChange={e => setEditingSurfaceType({...editingSurfaceType, name: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">معامل السعر (Multiplier)</label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    value={editingSurfaceType.priceMultiplier}
                    onChange={e => setEditingSurfaceType({...editingSurfaceType, priceMultiplier: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">الوصف</label>
                  <textarea 
                    value={editingSurfaceType.description || ''}
                    onChange={e => setEditingSurfaceType({...editingSurfaceType, description: e.target.value})}
                    className="w-full p-2 border rounded-lg h-24"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setSurfaceTypeModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Execution Detail Modal */}
        {isExecutionDetailModalOpen && editingExecutionDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingExecutionDetail.id ? 'تعديل تفصيل التنفيذ' : 'تفصيل تنفيذ جديد'}
                </h3>
                <button onClick={() => setExecutionDetailModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSaveExecutionDetail} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">العنوان</label>
                  <input 
                    required
                    value={editingExecutionDetail.title}
                    onChange={e => setEditingExecutionDetail({...editingExecutionDetail, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">السعر الإضافي (د.أ)</label>
                  <input 
                    type="number"
                    value={editingExecutionDetail.price || 0}
                    onChange={e => setEditingExecutionDetail({...editingExecutionDetail, price: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                    <button type="button" onClick={() => setExecutionDetailModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                    <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Marble Modal */}
        {isMarbleModalOpen && editingMarble && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white p-8 rounded-2xl w-full max-w-lg animate-fade-in max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">
                        {editingMarble.id ? 'تعديل الرخام' : 'رخام جديد'}
                        </h3>
                        <button onClick={() => setMarbleModalOpen(false)}><X /></button>
                    </div>
                    <form onSubmit={handleSaveMarble} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">الاسم</label>
                            <input type="text" required className="w-full p-2 border rounded-lg" value={editingMarble.name} onChange={e => setEditingMarble({...editingMarble, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">المنشأ</label>
                            <input type="text" required className="w-full p-2 border rounded-lg" value={editingMarble.origin} onChange={e => setEditingMarble({...editingMarble, origin: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">معامل السعر (Multiplier)</label>
                                <input type="number" step="0.1" required className="w-full p-2 border rounded-lg" value={editingMarble.priceMultiplier} onChange={e => setEditingMarble({...editingMarble, priceMultiplier: Number(e.target.value)})} />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-amber-500" checked={editingMarble.isPremium} onChange={e => setEditingMarble({...editingMarble, isPremium: e.target.checked})} />
                                    <span className="font-bold text-sm">Premium</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">رابط الصورة</label>
                            <input type="text" required className="w-full p-2 border rounded-lg" value={editingMarble.image} onChange={e => setEditingMarble({...editingMarble, image: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">متاح للأقسام التالية:</label>
                            <div className="flex flex-wrap gap-3">
                                {['tables', 'kitchen', 'washbasin', 'console'].map(cat => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer bg-stone-50 px-3 py-2 rounded-lg border border-stone-200">
                                        <input 
                                            type="checkbox" 
                                            checked={editingMarble.availableFor.includes(cat)}
                                            onChange={e => {
                                                const newCats = e.target.checked 
                                                    ? [...editingMarble.availableFor, cat]
                                                    : editingMarble.availableFor.filter(c => c !== cat);
                                                setEditingMarble({...editingMarble, availableFor: newCats});
                                            }}
                                            className="accent-stone-900"
                                        />
                                        <span className="text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button type="button" onClick={() => setMarbleModalOpen(false)} className="flex-1 p-3 border rounded-xl font-bold hover:bg-stone-50">إلغاء</button>
                            <button type="submit" className="flex-1 p-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800">حفظ</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};
