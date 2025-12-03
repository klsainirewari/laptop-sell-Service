import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Student",
      content: "I bought a refurbished Dell Latitude from Khusboo Electric. It looks brand new and works perfectly for my coding classes. Saved a lot of money!",
      rating: 5
    },
    {
      name: "Amit Yadav",
      role: "Business Owner",
      content: "My HP laptop screen was broken. K.L. Saini ji fixed it in 2 hours at a very reasonable price. Genuine parts used. Highly recommended in Rewari.",
      rating: 5
    },
    {
      name: "Priya Singh",
      role: "Teacher",
      content: "Best place for laptop repair. They explained the issue clearly and didn't overcharge. Also bought a laptop stand from their accessories collection.",
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">What Our Customers Say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-100" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>

              <p className="text-slate-600 mb-6 italic leading-relaxed">"{review.content}"</p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};