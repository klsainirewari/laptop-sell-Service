
import React, { useState } from 'react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Expert Craftsmanship</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">See the Difference</p>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Drag the slider to see how we transform broken devices into like-new condition.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-4 border-slate-900 select-none">
          {/* After Image (Fixed) - Base Layer */}
          <img 
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop" 
            alt="Fixed Laptop" 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">After</div>

          {/* Before Image (Broken) - Overlay Layer */}
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden border-r-4 border-white"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop" 
              alt="Broken Laptop" 
              className="absolute top-0 left-0 h-full max-w-none object-cover"
              style={{ width: '100%' }} // Adjust based on container width if needed, but relative usually works
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Before</div>
          </div>

          {/* Slider Control */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPosition} 
            onChange={handleDrag}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Compare before and after images"
          />

          {/* Slider Handle Visual */}
          <div 
            className="absolute top-0 bottom-0 w-10 bg-transparent flex items-center justify-center pointer-events-none z-20"
            style={{ left: `calc(${sliderPosition}% - 20px)` }}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
