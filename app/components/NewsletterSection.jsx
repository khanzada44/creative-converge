// components/NewsletterSection.tsx
import React from 'react';

export default function NewsletterSection() {
  return (
    <section 
      className="w-full min-h-[300px] bg-[#12141d] bg-no-repeat bg-contain bg-center flex items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: `url('https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/Newsletter.png')`,
      }}
    >
      <div className="w-full max-w-3xl relative z-10">
        <form className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full border-b border-white/30 pb-3">
          <input 
            type="email" 
            placeholder="Enter Your Email Address" 
            required
            className="w-full bg-transparent border-b sm:border-b-0 border-white/30 sm:border-none outline-none text-white text-base placeholder-[#8c8f9a] py-2 sm:py-0"
          />
          <button 
            type="submit" 
            className="bg-transparent border-none text-white text-base font-medium cursor-pointer flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap hover:opacity-80 transition-opacity py-2 sm:py-0"
          >
            Subscribe <span>✉</span>
          </button>
        </form>
      </div>
    </section>
  );
}