"use client";

import React, { useState } from "react";

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan aap form submission logic ya API call add kar sakte hain
    alert("Message sent successfully!");
  };

return (
  <section className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#12161f] text-white overflow-hidden">
    
    {/* Left Side: Form Area */}
    <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-20 z-10 overflow-hidden">
      
      {/* Background Large Watermark Text */}
      <span className="pointer-events-none absolute -top-8 left-4 lg:left-12 z-0 select-none text-7xl font-extrabold uppercase tracking-widest text-white/[0.03] sm:text-8xl md:-top-12 lg:text-[130px]">
        CONTACT
      </span>

      {/* Subtitle with horizontal line */}
      <div className="relative z-10 flex items-center space-x-3 mb-4">
        <span className="w-12 h-[2px] bg-white inline-block"></span>
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
          let's get started
        </span>
      </div>

      {/* Main Title */}
      <h2 className="relative z-10 text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
        Get a Free <br /> Consultation
      </h2>

      {/* Description */}
      <p className="relative z-10 text-gray-300 text-sm lg:text-base leading-relaxed mb-10 max-w-lg">
        We always try to implement our creative ideas at the highest level. Tell us about your project and we will make it work.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-8 max-w-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="relative">
          <textarea
            required
            rows={3}
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 pb-3 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-colors text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-white hover:text-emerald-400 transition-colors pt-2"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>

    {/* Right Side: Background Image Area */}
    <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        {/* Overlay to match theme shade */}
        <div className="absolute inset-0 bg-[#12161f]/30"></div>
      </div>
    </div>

  </section>
);
}