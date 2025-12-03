import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="relative z-10 max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-semibold text-sm mb-6 border border-brand-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            {BUSINESS_INFO.experience} of Trust & Excellence
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Laptop Sell & <br/>
            <span className="text-brand-600">Service</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Khusboo Electric is your one-stop solution for high-quality refurbished laptops
            and professional chip-level repairing. Owned by K.L. Saini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 md:text-lg transition-colors shadow-lg shadow-green-600/20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
            
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call {BUSINESS_INFO.phone}
            </a>
            
            <a 
              href="#tech-support"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-brand-700 bg-brand-50 hover:bg-brand-100 md:text-lg transition-colors"
            >
              Ask AI Tech <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Image/Pattern area */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 h-64 lg:h-full">
         <img
            className="h-full w-full object-cover object-center opacity-90"
            src="https://picsum.photos/800/800?grayscale&blur=1"
            alt="Laptop repair workshop"
          />
         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:via-white/20"></div>
      </div>
    </div>
  );
};