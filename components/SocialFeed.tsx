import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

export const SocialFeed: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Social Media Updates</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Follow us for the latest laptop stock arrivals, offers, and repair reels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Facebook Feed */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-6 text-blue-600">
              <Facebook className="w-6 h-6" />
              <h3 className="text-xl font-bold">Facebook Posts</h3>
            </div>
            <div className="min-h-[400px]">
               <div className="elfsight-app-71968dcf-78fa-4531-91f9-7db87318b4fe" data-elfsight-app-lazy></div>
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
             <div className="flex items-center justify-center gap-2 mb-6 text-pink-600">
              <Instagram className="w-6 h-6" />
              <h3 className="text-xl font-bold">Instagram Reels</h3>
            </div>
            <div className="min-h-[400px]">
               <div className="elfsight-app-e12cf205-4b63-4295-a484-99ebb64327c3" data-elfsight-app-lazy></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
