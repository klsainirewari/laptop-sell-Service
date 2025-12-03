import React from 'react';

export const SocialFeed: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Updates</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Check out our latest posts, offers, and laptop repair tips directly from our Facebook page.
          </p>
        </div>

        {/* Elfsight Widget Container */}
        <div className="min-h-[200px] flex justify-center">
             <div className="elfsight-app-71968dcf-78fa-4531-91f9-7db87318b4fe" data-elfsight-app-lazy></div>
        </div>

      </div>
    </section>
  );
};