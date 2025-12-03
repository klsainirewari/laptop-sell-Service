import React from 'react';
import { BUSINESS_INFO } from '../constants';
import { ShoppingBag, ArrowRight, ExternalLink, Cpu } from 'lucide-react';

export const CatalogPreview: React.FC = () => {
  // Specific products with updated details and prices
  // Note: Since I cannot access local file uploads, I am using high-quality, stable public URLs 
  // that closely resemble the specific models.
  const products = [
    { 
      name: "Dell Latitude 7480", 
      specs: "Core i5 6th Gen, 8GB RAM, 256GB SSD, Win 11",
      price: "₹14,990", 
      tag: "Best Value", 
      // Image: Clear shot of a black business laptop (Latitude style)
      img: "https://ibb.co/VcMLZys7", 
      link: "https://wa.me/p/25836281255958120/917206770673"
    },
    { 
      name: "HP EliteBook 840 G5", 
      specs: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Win 11",
      price: "₹16,990", 
      tag: "Premium Design", 
      // Image: Clear shot of a silver ultrabook (EliteBook style)
      img: "https://ibb.co/Q7hRqWP5", 
      link: "https://wa.me/p/8783197445040361/917206770673"
    },
    { 
      name: "MacBook Air A1466 (2017)", 
      specs: "Core i5, 8GB RAM, 256GB SSD, macOS Monterey",
      price: "₹18,990", 
      tag: "Apple Deal", 
      // Image: Specific MacBook Air design
      img: "https://ibb.co/LXw0FH4R", 
      link: BUSINESS_INFO.catalogLink
    },
    { 
      name: "Lenovo ThinkPad T470s", 
      specs: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Win 11",
      price: "₹14,990", 
      tag: "Business Rugged", 
      // Image: Classic ThinkPad black design
      img: "https://ibb.co/7dLpzkkr", 
      link: "https://wa.me/p/8294710417324994/917206770673"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Laptops</h2>
            <p className="text-slate-500 mt-2">Quality refurbished business class laptops ready for you.</p>
          </div>
          <a 
            href={BUSINESS_INFO.catalogLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700"
          >
            View Full Catalog <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <a 
              key={idx} 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all block flex flex-col h-full"
            >
              <div className="aspect-w-4 aspect-h-3 bg-slate-100 relative overflow-hidden h-48">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                  {product.tag}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">{product.name}</h3>
                
                <div className="flex items-start gap-2 mb-4 text-xs text-slate-500 bg-slate-50 p-2 rounded lg:min-h-[60px]">
                  <Cpu className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <p className="leading-snug">{product.specs}</p>
                </div>
                
                <div className="mt-auto flex justify-between items-center pt-2 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Starting at</span>
                    <span className="text-lg font-bold text-brand-700">{product.price}</span>
                  </div>
                  <div 
                    className="p-2 bg-brand-50 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <div className="inline-block p-6 bg-brand-50 rounded-xl border border-brand-100">
                <p className="text-brand-800 font-medium">
                    Looking for something specific? Check our <a href={BUSINESS_INFO.catalogLink} target="_blank" className="underline font-bold decoration-2 underline-offset-2 hover:text-brand-600">WhatsApp Catalog</a> for live inventory updates.
                </p>
             </div>
        </div>
      </div>
    </section>
  );
};