
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Customizer } from './pages/Customizer';
import { Store } from './pages/Store';
import { ProductDetails } from './pages/ProductDetails';
import { FAQ } from './pages/FAQ';
import { DesignHub } from './pages/DesignHub';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Warranty } from './pages/Warranty';
import { AdminDashboard } from './pages/AdminDashboard';
import { CartSidebar } from './components/CartSidebar';
import { CartItem, ConfiguratorSettings, AuditLogEntry, User, KitchenSample, SurfaceType, ExecutionDetail } from './types';
import { PRODUCTS, MARBLE_TYPES, PROJECTS, LEG_OPTIONS } from './constants';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // -- Global State Lifted Up --
  const [products, setProducts] = useState(PRODUCTS);
  // Use MARBLE_TYPES directly as it now contains all necessary fields
  const [marbles, setMarbles] = useState(MARBLE_TYPES);
  const [legs, setLegs] = useState(LEG_OPTIONS);
  const [projects, setProjects] = useState(PROJECTS);

  // -- NEW: Kitchen Samples State --
  const [kitchenSamples, setKitchenSamples] = useState<KitchenSample[]>([
    { id: 'ks-1', name: 'أبيض نقي', image: 'https://images.unsplash.com/photo-1596483758376-749479b6d80d', color: '#FFFFFF' },
    { id: 'ks-2', name: 'رخامي بعروق', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6', color: '#F5F5F5' },
    { id: 'ks-3', name: 'رمادي', image: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908', color: '#808080' },
    { id: 'ks-4', name: 'أسود', image: 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6', color: '#000000' },
  ]);

  const [surfaceTypes, setSurfaceTypes] = useState<SurfaceType[]>([
    { id: 'st-1', name: 'مطفي (Matte)', priceMultiplier: 1.0, description: 'سطح غير لامع، عملي ومقاوم للخدوش' },
    { id: 'st-2', name: 'لامع (Glossy)', priceMultiplier: 1.2, description: 'سطح لامع يعكس الضوء، يعطي فخامة للمكان' },
    { id: 'st-3', name: 'نصف لامع (Semi-Gloss)', priceMultiplier: 1.1, description: 'توازن بين العملي والجمالي' },
  ]);

  const [executionDetails, setExecutionDetails] = useState<ExecutionDetail[]>([
    { id: 'ed-1', title: 'حافة دائرية', price: 15 },
    { id: 'ed-2', title: 'حافة مشطوفة (45 درجة)', price: 20 },
    { id: 'ed-3', title: 'وزرة خلفية (Backsplash)', price: 30 },
    { id: 'ed-4', title: 'فتحة مجلى تحت السطح', price: 40 },
  ]);

  // -- NEW: Design Categories State (Dynamic) --
  const [designCategories, setDesignCategories] = useState<any[]>([
    { id: 'kitchen', title: 'تصميم أسطح مطبخ عالي جودة', icon: 'ChefHat', description: 'أسطح مطابخ مودرن، مقاومة للبكتيريا والحرارة' },
    { id: 'washbasin', title: 'تصميم مغاسل عالي جودة', icon: 'Droplets', description: 'مغاسل أحواض متصلة أو منفصلة بتصاميم فندقية' },
    { id: 'console', title: 'تصميم كونسول مدخل', icon: 'Armchair', description: 'كونسول استقبال فخم لمداخل المنازل والشركات' },
    { id: 'coffee-table', title: 'تصميم طاولات قهوة', icon: 'Coffee', description: 'طاولات وسط وخدمة بأشكال هندسية مميزة' },
    { id: 'coffee-corner', title: 'تصميم كوفي كورنر', icon: 'Layout', description: 'ركن قهوة متكامل بتصميم سطح عملي وأنيق' },
    { id: 'dining-table', title: 'تصميم طاولات طعام', icon: 'Utensils', description: 'طاولات طعام عائلية فاخرة بأي مقاس' },
  ]);
  
  // -- NEW: Advanced Configurator State --
  const [configurators, setConfigurators] = useState<ConfiguratorSettings[]>([
    {
      id: 'tables',
      name: 'طاولات (3D)',
      isActive: true,
      dimensions: {
        length: { min: 60, max: 300, default: 120, step: 10, unit: 'cm', label: 'الطول', isEnabled: true },
        width: { min: 40, max: 150, default: 60, step: 5, unit: 'cm', label: 'العرض', isEnabled: true },
        height: { min: 30, max: 110, default: 45, step: 5, unit: 'cm', label: 'الارتفاع', isEnabled: true },
      },
      pricing: { baseFee: 150, areaRate: 0.8, formula: 'BASE + (AREA * MARBLE * RATE) + LEGS' },
      rules: [
        { id: 'r1', conditionField: 'shape', operator: 'equals', value: 'circle', action: 'hide_field', actionTarget: 'width' }
      ],
      allowedShapes: ['rectangle', 'circle', 'square', 'oval'],
      allowedLegs: LEG_OPTIONS.map(l => l.id),
      extraOptions: [{ id: 'wireless_charger', name: 'شاحن لاسلكي مخفي', price: 45, isActive: true }]
    },
    {
      id: 'kitchen',
      name: 'مطابخ',
      isActive: true,
      dimensions: {
        length: { min: 100, max: 1000, default: 300, step: 10, unit: 'cm', label: 'الطول الإجمالي', isEnabled: true },
        width: { min: 60, max: 90, default: 60, step: 1, unit: 'cm', label: 'العمق', isEnabled: true },
        height: { min: 0, max: 0, default: 0, step: 0, unit: 'cm', label: 'غير مستخدم', isEnabled: false },
      },
      pricing: { baseFee: 0, areaRate: 1.2, formula: 'AREA * MARBLE * RATE + CUTOUTS' },
      rules: [],
      allowedShapes: ['rectangle', 'l-shape'],
      allowedLegs: [],
      extraOptions: [{ id: 'sink_cutout', name: 'فتحة مجلى', price: 25, isActive: true }]
    },
    {
        id: 'washbasin',
        name: 'مغاسل',
        isActive: true,
        dimensions: {
          length: { min: 60, max: 300, default: 100, step: 5, unit: 'cm', label: 'العرض', isEnabled: true },
          width: { min: 40, max: 60, default: 50, step: 1, unit: 'cm', label: 'العمق', isEnabled: true },
          height: { min: 10, max: 90, default: 15, step: 1, unit: 'cm', label: 'الارتفاع/السماكة', isEnabled: true },
        },
        pricing: { baseFee: 100, areaRate: 1.0, formula: 'BASE + LENGTH * RATE' },
        rules: [],
        allowedShapes: ['integrated', 'custom'],
        allowedLegs: [],
        extraOptions: []
    },
    {
      id: 'console',
      name: 'كونسول',
      isActive: true,
      dimensions: {
        length: { min: 80, max: 200, default: 120, step: 10, unit: 'cm', label: 'الطول', isEnabled: true },
        width: { min: 30, max: 50, default: 40, step: 5, unit: 'cm', label: 'العمق', isEnabled: true },
        height: { min: 70, max: 100, default: 90, step: 5, unit: 'cm', label: 'الارتفاع', isEnabled: true },
      },
      pricing: { baseFee: 200, areaRate: 0.9, formula: 'BASE + (L*W*RATE)' },
      rules: [],
      allowedShapes: ['wall-mounted-straight', 'floating', 'two-metal-legs', 'side-waterfall'],
      allowedLegs: LEG_OPTIONS.map(l => l.id),
      allowedMaterials: ['ks-1', 'ks-2', 'ks-3', 'ks-4'], // Default to kitchen samples
      extraOptions: []
    },
    {
      id: 'coffee-corner',
      name: 'كوفي كورنر',
      isActive: false, // Default disabled to show feature flag
      dimensions: {
        length: { min: 60, max: 150, default: 90, step: 10, unit: 'cm', label: 'الطول', isEnabled: true },
        width: { min: 40, max: 60, default: 50, step: 5, unit: 'cm', label: 'العمق', isEnabled: true },
        height: { min: 0, max: 0, default: 0, step: 0, unit: 'cm', label: 'غير مستخدم', isEnabled: false },
      },
      pricing: { baseFee: 150, areaRate: 1.0, formula: 'BASE + AREA * RATE' },
      rules: [],
      allowedShapes: ['rectangle'],
      allowedLegs: [],
      extraOptions: []
    }
  ]);

  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([
    { id: 'log-1', action: 'LOGIN', user: 'Admin', timestamp: new Date().toISOString(), details: 'تم تسجيل الدخول للنظام' },
    { id: 'log-2', action: 'UPDATE_PRICE', user: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString(), details: 'تحديث سعر الرخام الكوري' }
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'المدير العام', email: 'admin@assdco.com', role: 'admin' },
    { id: 'u2', name: 'موظف مبيعات', email: 'sales@assdco.com', role: 'sales' },
    { id: 'u3', name: 'محرر محتوى', email: 'editor@assdco.com', role: 'editor' },
  ]);
  
  // Mock Orders State
  const [orders, setOrders] = useState<any[]>([
    { id: 'ORD-7829', customerName: 'أحمد العلي', status: 'new', total: 450, items: [{ name: 'طاولة قهوة سوليد', quantity: 1, details: '80x80 سم' }] },
    { id: 'ORD-9921', customerName: 'شركة البناء الحديث', status: 'processing', total: 1200, items: [{ name: 'مغسلة حوضين', quantity: 1, details: 'تفصيل خاص' }] },
  ]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleViewProduct = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product-details');
    window.scrollTo(0, 0);
  };

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    // Log action
    setAuditLog(prev => [{
      id: `log-${Date.now()}`,
      action: 'UPDATE_ORDER',
      user: 'Admin', // In real app, current user
      timestamp: new Date().toISOString(),
      details: `تغيير حالة الطلب ${id} إلى ${status}`
    }, ...prev]);
  };

  // If Admin Dashboard is active, render it without standard layout
  if (activePage === 'admin') {
    return (
      <AdminDashboard 
        products={products}
        setProducts={setProducts}
        marbles={marbles}
        setMarbles={setMarbles}
        legs={legs}
        setLegs={setLegs}
        projects={projects}
        setProjects={setProjects}
        kitchenSamples={kitchenSamples}
        setKitchenSamples={setKitchenSamples}
        surfaceTypes={surfaceTypes}
        setSurfaceTypes={setSurfaceTypes}
        executionDetails={executionDetails}
        setExecutionDetails={setExecutionDetails}
        designCategories={designCategories}
        setDesignCategories={setDesignCategories}
        orders={orders}
        updateOrderStatus={updateOrderStatus}
        configurators={configurators}
        setConfigurators={setConfigurators}
        auditLog={auditLog}
        users={users}
        onNavigateHome={() => setActivePage('home')}
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} onViewProduct={handleViewProduct} products={products} projects={projects} />;
      case 'customizer':
        return <Customizer onAddToCart={addToCart} marbles={marbles.filter(m => m.availableFor.includes('tables'))} legs={legs} />;
      case 'design-hub':
        return <DesignHub 
          onAddToCart={addToCart} 
          marbles={marbles} 
          kitchenSamples={kitchenSamples} 
          surfaceTypes={surfaceTypes}
          executionDetails={executionDetails}
          designCategories={designCategories} 
        />;
      case 'store':
        return <Store onAddToCart={addToCart} onViewProduct={handleViewProduct} products={products} />;
      case 'faq':
        return <FAQ />;
      case 'portfolio':
        return <Portfolio projects={projects} />;
      case 'contact':
        return <Contact />;
      case 'warranty':
        return <Warranty />;
      case 'product-details':
        return (
          <ProductDetails 
            productId={selectedProductId || ''} 
            onAddToCart={addToCart} 
            onBack={() => setActivePage('store')}
            products={products}
          />
        );
      default:
        return <Home onNavigate={setActivePage} onViewProduct={handleViewProduct} products={products} projects={projects} />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      onNavigate={(page) => {
        setActivePage(page);
        window.scrollTo(0, 0);
      }} 
      cart={cart} 
      setIsCartOpen={setIsCartOpen}
    >
      {renderPage()}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
    </Layout>
  );
}

export default App;
