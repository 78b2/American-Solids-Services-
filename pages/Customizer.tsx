import React, { useState, useMemo, Suspense, useRef, useLayoutEffect } from 'react';
import { CartItem, MarbleType, LegOption } from '../types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Check, Info, ArrowLeft, ArrowRight, ShoppingCart, Rotate3D, Loader2, Maximize, Ruler } from 'lucide-react';

interface CustomizerProps {
  onAddToCart: (item: CartItem) => void;
  marbles: MarbleType[];
  legs: LegOption[];
}

type Shape = 'rectangle' | 'circle' | 'square' | 'oval';

// --- 3D Components ---

interface MarbleMaterialProps {
  url: string;
  len: number;
  wid: number;
}

const MarbleMaterial: React.FC<MarbleMaterialProps> = ({ url, len, wid }) => {
  // useTexture will suspend if not loaded
  const texture = useTexture(url);
  
  const clonedTexture = useMemo(() => {
    const t = texture.clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(len / 8, wid / 8); 
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [texture, len, wid]);

  return (
    <meshStandardMaterial 
      map={clonedTexture} 
      roughness={0.1} 
      metalness={0.1} 
      envMapIntensity={1}
    />
  );
};

// Error Boundary for Texture Loading
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class TextureErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Texture loading failed inside boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (this as any).props.fallback;
    }
    return (this as any).props.children;
  }
}

const TextureFallbackMaterial = () => (
  <meshStandardMaterial color="#e5e5e5" roughness={0.8} />
);

interface Table3DProps {
  shape: Shape;
  dimensions: { length: number; width: number; height: number };
  marbleImage: string;
  legId: string;
}

const Table3D: React.FC<Table3DProps> = ({ shape, dimensions, marbleImage, legId }) => {
  // Convert dimensions cm -> 3D units (scale 1:10 approximately)
  const scale = 0.1;
  const len = dimensions.length * scale;
  // For circle/square, width follows length
  const wid = (shape === 'square' || shape === 'circle') ? len : dimensions.width * scale;
  const hgt = dimensions.height * scale;
  const thickness = 0.4; // 4cm top thickness
  
  const legHeight = hgt - thickness;
  const legRadius = 0.15;

  // Leg Material Logic
  const legMaterial = useMemo(() => {
    if (legId.includes('gold')) {
      return new THREE.MeshStandardMaterial({ color: "#FFD700", metalness: 1, roughness: 0.15 });
    } else if (legId.includes('black')) {
      return new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0.5, roughness: 0.2 });
    } else if (legId.includes('oak')) {
      return new THREE.MeshStandardMaterial({ color: "#d4b996", roughness: 0.8 });
    } else {
      return new THREE.MeshStandardMaterial({ color: "#5d4037", roughness: 0.8 }); // Walnut
    }
  }, [legId]);

  // Calculate Leg Positions
  const legPositions = useMemo(() => {
    const inset = 0.8; // Distance from edge
    const y = -thickness / 2 - legHeight / 2;
    
    if (shape === 'circle' || shape === 'oval') {
      const rX = len / 2 - 1.5;
      const rZ = wid / 2 - 1.5;
      return [
        [rX * Math.cos(Math.PI/4), y, rZ * Math.sin(Math.PI/4)],
        [rX * Math.cos(3*Math.PI/4), y, rZ * Math.sin(3*Math.PI/4)],
        [rX * Math.cos(5*Math.PI/4), y, rZ * Math.sin(5*Math.PI/4)],
        [rX * Math.cos(7*Math.PI/4), y, rZ * Math.sin(7*Math.PI/4)],
      ];
    }
    
    const x = len / 2 - inset;
    const z = wid / 2 - inset;
    return [
      [x, y, z],
      [-x, y, z],
      [x, y, -z],
      [-x, y, -z]
    ];
  }, [shape, len, wid, legHeight]);

  // Instanced Mesh Ref for optimized rendering of legs
  const legsRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Update instances when positions change
  useLayoutEffect(() => {
    if (!legsRef.current) return;
    
    legPositions.forEach((pos, i) => {
      tempObject.position.set(pos[0], pos[1], pos[2]);
      tempObject.updateMatrix();
      legsRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    legsRef.current.instanceMatrix.needsUpdate = true;
  }, [legPositions, tempObject]);

  return (
    <group>
      {/* Table Top */}
      <mesh 
        castShadow 
        receiveShadow 
        position={[0, 0, 0]}
        scale={(shape === 'circle' || shape === 'oval') ? [len/2, 1, wid/2] : [1, 1, 1]}
      >
        {shape === 'rectangle' || shape === 'square' ? (
          <boxGeometry args={[len, thickness, wid]} />
        ) : (
          <cylinderGeometry args={[1, 1, thickness, 64]} />
        )}
        
        {/* Lazy Loaded Material */}
        <TextureErrorBoundary fallback={<TextureFallbackMaterial />}>
          <Suspense fallback={<TextureFallbackMaterial />}>
             <MarbleMaterial url={marbleImage} len={len} wid={wid} />
          </Suspense>
        </TextureErrorBoundary>
      </mesh>
      
      {/* Legs - Optimized with InstancedMesh */}
      <instancedMesh 
        ref={legsRef} 
        args={[undefined, undefined, legPositions.length]} 
        material={legMaterial} 
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[legRadius, legRadius * 0.7, legHeight, 32]} />
      </instancedMesh>
    </group>
  );
};

// Fallback component when texture fails
const Table3DFallback: React.FC = () => {
  return (
     <group>
       <mesh position={[0, 0, 0]}>
         <boxGeometry args={[12, 0.4, 6]} />
         <meshStandardMaterial color="#e5e5e5" roughness={0.5} />
       </mesh>
     </group>
  )
}

// --- Main Customizer Component ---

export const Customizer: React.FC<CustomizerProps> = ({ onAddToCart, marbles, legs }) => {
  // Preload textures on mount
  React.useEffect(() => {
    marbles.forEach(m => useTexture.preload(m.image));
  }, [marbles]);

  const [step, setStep] = useState(1);
  const [selectedMarble, setSelectedMarble] = useState(marbles[0]?.id || 'hanex-cc-005');
  const [shape, setShape] = useState<Shape>('rectangle');
  const [dimensions, setDimensions] = useState({ length: 120, width: 60, height: 45 });
  const [selectedLegs, setSelectedLegs] = useState(legs[0]?.id || 'wood-oak');

  // Price Calculation Logic
  const totalPrice = useMemo(() => {
    const marble = marbles.find(m => m.id === selectedMarble);
    const leg = legs.find(l => l.id === selectedLegs);
    
    if (!marble || !leg) return 0;

    const baseFee = 300;
    // Calculate effective area based on shape
    let area = 0;
    if (shape === 'rectangle' || shape === 'square') {
      area = (dimensions.length * (shape === 'square' ? dimensions.length : dimensions.width)) / 10000; // m2
    } else {
      // Ellipse/Circle area: PI * a * b
      const a = dimensions.length / 2;
      const b = (shape === 'circle' ? dimensions.length : dimensions.width) / 2;
      area = (Math.PI * a * b) / 10000;
    }

    const marbleCost = area * 100 * marble.priceMultiplier * 5; // Simplified pricing formula

    return Math.round(baseFee + marbleCost + leg.price);
  }, [selectedMarble, dimensions, selectedLegs, shape, marbles, legs]);

  const handleAddToCart = () => {
    const marble = marbles.find(m => m.id === selectedMarble);
    const leg = legs.find(l => l.id === selectedLegs);
    
    if (!marble) return;

    onAddToCart({
      id: `custom-${Date.now()}`,
      name: `طاولة ${marble.name} مخصصة`,
      details: `${shape === 'circle' ? 'دائرية' : shape === 'square' ? 'مربعة' : shape === 'oval' ? 'بيضوي' : 'مستطيلة'} - ${dimensions.length}x${shape === 'circle' || shape === 'square' ? dimensions.length : dimensions.width}سم`,
      price: totalPrice,
      image: marble.image,
      quantity: 1
    });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const currentMarble = marbles.find(m => m.id === selectedMarble);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header/Progress */}
      <div className="bg-white border-b sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-stone-900">صمم طاولتك</h1>
            <div className="text-2xl font-bold text-amber-600">{totalPrice} د.أ</div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-2 rounded-full flex-grow transition-all duration-500 ${s <= step ? 'bg-amber-500' : 'bg-stone-200'}`} />
                <span className={`text-xs font-bold ${s <= step ? 'text-stone-900' : 'text-stone-400'}`}>
                  {s === 1 ? 'الرخام' : s === 2 ? 'المقاس والشكل' : 'الأرجل'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visualization Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3D Canvas Preview */}
            <div className="bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden shadow-inner border border-stone-300 relative h-[400px] md:h-[500px]">
                <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-600 flex items-center gap-2">
                  <Rotate3D size={14} />
                  يمكنك تحريك النموذج
                </div>

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <div className="bg-white/80 backdrop-blur p-2 rounded-lg text-xs font-bold text-stone-600">
                    الطول: {dimensions.length} سم
                  </div>
                  {shape !== 'circle' && shape !== 'square' && (
                    <div className="bg-white/80 backdrop-blur p-2 rounded-lg text-xs font-bold text-stone-600">
                      العرض: {dimensions.width} سم
                    </div>
                  )}
                   <div className="bg-white/80 backdrop-blur p-2 rounded-lg text-xs font-bold text-stone-600">
                      الارتفاع: {dimensions.height} سم
                  </div>
                </div>
                
                <Canvas shadows camera={{ position: [4, 4, 6], fov: 45 }}>
                  <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5} adjustCamera={false}>
                      {currentMarble && (
                        <Table3D 
                          shape={shape} 
                          dimensions={dimensions} 
                          marbleImage={currentMarble.image}
                          legId={selectedLegs}
                        />
                      )}
                    </Stage>
                    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                    <Environment preset="city" />
                  </Suspense>
                </Canvas>

                {/* Loading State Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <Suspense fallback={<div className="bg-white/90 p-4 rounded-xl shadow-lg flex items-center gap-2"><Loader2 className="animate-spin text-amber-500" /> <span className="font-bold text-stone-800">جاري تحميل الرخام...</span></div>}>
                     {/* Empty container that suspends until loaded */}
                  </Suspense>
                </div>
            </div>

            {/* Controls Section */}
            <div>
               {/* Step 1: Marble Selection */}
              {step === 1 && (
                <div className="animate-fade-in bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    اختر نوع الرخام
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {marbles.map((marble) => (
                      <div 
                        key={marble.id}
                        onClick={() => setSelectedMarble(marble.id)}
                        className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${selectedMarble === marble.id ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-transparent hover:border-stone-300'}`}
                      >
                        <div className="aspect-video relative">
                          <img src={marble.image} alt={marble.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 p-4 w-full">
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 block">{marble.origin}</span>
                                <h3 className="text-white font-bold text-lg">{marble.name}</h3>
                              </div>
                              {selectedMarble === marble.id && <div className="bg-amber-500 p-1 rounded-full text-white"><Check size={16} /></div>}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-stone-500 text-sm leading-relaxed">{marble.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shape & Size */}
              {step === 2 && (
                <div className="animate-fade-in bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    الأبعاد والشكل
                  </h2>
                  
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Maximize className="text-stone-400" size={20} />
                        <label className="text-sm font-bold text-stone-700">شكل الطاولة</label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(['rectangle', 'circle', 'square', 'oval'] as Shape[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setShape(s)}
                          className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 font-bold transition-all ${
                            shape === s 
                              ? 'bg-stone-900 text-white border-stone-900' 
                              : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                          }`}
                        >
                            <div className={`w-8 h-8 border-2 ${shape === s ? 'border-white' : 'border-stone-400'} ${
                                s === 'circle' ? 'rounded-full' : s === 'oval' ? 'rounded-[100%] w-10 h-6 my-1' : s === 'square' ? 'rounded-md' : 'rounded-md w-10 h-6 my-1'
                            }`} />
                          {s === 'rectangle' ? 'مستطيل' : s === 'circle' ? 'دائري' : s === 'square' ? 'مربع' : 'بيضوي'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Ruler className="text-stone-400" size={20} />
                        <h3 className="font-bold text-stone-800">المقاسات</h3>
                    </div>

                    <div className="bg-stone-50 p-6 rounded-xl space-y-6">
                        <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-stone-600">الطول / القطر</label>
                            <span className="text-stone-900 font-bold">{dimensions.length} سم</span>
                        </div>
                        <input 
                            type="range" 
                            min="60" 
                            max="300" 
                            step="10"
                            value={dimensions.length}
                            onChange={(e) => setDimensions({...dimensions, length: parseInt(e.target.value)})}
                            className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-stone-400 mt-1">
                            <span>60 سم</span>
                            <span>300 سم</span>
                        </div>
                        </div>

                        {shape !== 'circle' && shape !== 'square' && (
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-stone-600">العرض</label>
                                <span className="text-stone-900 font-bold">{dimensions.width} سم</span>
                            </div>
                            <input 
                            type="range" 
                            min="40" 
                            max="150" 
                            step="5"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({...dimensions, width: parseInt(e.target.value)})}
                            className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-stone-400 mt-1">
                                <span>40 سم</span>
                                <span>150 سم</span>
                            </div>
                        </div>
                        )}

                        <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-stone-600">الارتفاع</label>
                            <span className="text-stone-900 font-bold">{dimensions.height} سم</span>
                        </div>
                        <input 
                            type="range" 
                            min="30" 
                            max="90" 
                            step="5"
                            value={dimensions.height}
                            onChange={(e) => setDimensions({...dimensions, height: parseInt(e.target.value)})}
                            className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                        />
                         <div className="flex justify-between text-xs text-stone-400 mt-1">
                            <span>30 سم</span>
                            <span>90 سم</span>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Legs */}
              {step === 3 && (
                <div className="animate-fade-in bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    اختر الأرجل
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {legs.map((leg) => (
                      <div 
                        key={leg.id}
                        onClick={() => setSelectedLegs(leg.id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all ${selectedLegs === leg.id ? 'border-amber-500 bg-amber-50' : 'border-stone-200 hover:border-stone-300 bg-white'}`}
                      >
                        <img src={leg.image} alt={leg.name} className="w-16 h-16 object-cover rounded-lg mb-3 shadow-md" />
                        <h3 className="font-bold text-stone-900 text-sm">{leg.name}</h3>
                        <p className="text-xs text-stone-500 mt-1">+{leg.price} د.أ</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-44 border border-stone-100">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">ملخص التصميم</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">نوع الرخام</span>
                  <span className="font-medium">{marbles.find(m => m.id === selectedMarble)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">الشكل</span>
                  <span className="font-medium">{shape === 'rectangle' ? 'مستطيل' : shape === 'circle' ? 'دائري' : shape === 'square' ? 'مربع' : 'بيضوي'}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-stone-500">الأبعاد</span>
                  <span className="font-medium" dir="ltr">
                    {dimensions.length} x {shape === 'circle' || shape === 'square' ? dimensions.length : dimensions.width} x {dimensions.height} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">الأرجل</span>
                  <span className="font-medium">{legs.find(l => l.id === selectedLegs)?.name}</span>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-stone-600 font-medium">السعر التقديري</span>
                  <Info size={16} className="text-stone-400" />
                </div>
                <div className="text-3xl font-bold text-stone-900">{totalPrice} د.أ</div>
                <p className="text-xs text-stone-400 mt-2">السعر يشمل الضريبة والتصنيع</p>
              </div>

              <div className="space-y-3">
                {step < 3 ? (
                  <button 
                    onClick={nextStep}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                  >
                    الخطوة التالية
                    <ArrowLeft size={20} />
                  </button>
                ) : (
                   <button 
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    إضافة للسلة
                    <ShoppingCart size={20} />
                  </button>
                )}
                
                {step > 1 && (
                  <button 
                    onClick={prevStep}
                    className="w-full bg-white border border-stone-200 text-stone-600 py-3 rounded-xl font-bold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                  >
                     <ArrowRight size={20} />
                    رجوع
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};