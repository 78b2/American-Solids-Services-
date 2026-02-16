import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Image, Filter } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'kitchen', label: 'مطابخ' },
    { id: 'washbasin', label: 'مغاسل' },
    { id: 'tables', label: 'طاولات' },
    { id: 'console', label: 'كونسول ومداخل' },
  ];

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter || (filter === 'tables' && (p.category === 'coffee-table' || p.category === 'dining-table' || p.category === 'tables')));

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <Image size={32} />
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">معرض أعمالنا</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            مجموعة مختارة من المشاريع التي قمنا بتنفيذها بدقة وعناية. نفخر بتقديم حلول الأسطح الصلبة للمنازل والشركات.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-100 inline-flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === cat.id
                    ? 'bg-stone-900 text-white shadow-lg'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.title}
                </h3>
                <span className="text-amber-400 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  American Solids Service
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <p>لا توجد مشاريع في هذا التصنيف حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};