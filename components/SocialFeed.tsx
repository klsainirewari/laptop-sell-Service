import React from 'react';
import { Facebook, Instagram, Star, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export const SocialFeed: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Connect With Us</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Join our community for daily updates, live repair videos, and exclusive laptop deals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facebook Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 h-[500px] overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
                <Facebook className="w-5 h-5" /> Facebook Feed
              </div>
              <div className="elfsight-app-71968dcf-78fa-4531-91f9-7db87318b4fe" data-elfsight-app-lazy></div>
            </div>
            <a 
              href="https://www.facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Facebook className="w-5 h-5" /> Follow Page
            </a>
          </div>

          {/* Instagram Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 h-[500px] overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-pink-600 font-bold">
                <Instagram className="w-5 h-5" /> Instagram Reels
              </div>
              <div className="elfsight-app-e12cf205-4b63-4295-a484-99ebb64327c3" data-elfsight-app-lazy></div>
            </div>
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Instagram className="w-5 h-5" /> Follow on Insta
            </a>
          </div>

          {/* Google Review & Map Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-brand-600 p-8 rounded-2xl text-white shadow-xl flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Love our Service?</h3>
              <p className="text-brand-100 mb-6">Rate us on Google Maps and help others find the best laptop shop in Rewari.</p>
              <a 
                href={BUSINESS_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-700 px-8 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors w-full"
              >
                Write a Review
              </a>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-grow flex flex-col justify-center items-center text-center">
               <MapPin className="w-10 h-10 text-slate-400 mb-4" />
               <h4 className="text-lg font-bold text-slate-900 mb-2">Visit Store</h4>
               <p className="text-slate-500 text-sm mb-4">{BUSINESS_INFO.address}</p>
               <a 
                  href={BUSINESS_INFO.mapLink}
                  target="_blank"
                  className="text-brand-600 font-semibold hover:underline"
               >
                 Get Directions &rarr;
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
