'use client';

import React from 'react';

const BrandLogo = () => {
    // Yahan aap apne sabhi brand logos ke image URLs aur names daal sakte hain
    const brands = [
        { id: 1, name: "Harrison Design Studio", image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/car1.png" },
        { id: 2, name: "Handcrafted Studio", image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/car1.png" },
        { id: 3, name: "Brand Name", image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/car1.png" },
        { id: 4, name: "Interior Academia Design", image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/car1.png" },
        { id: 5, name: "Ben Design Studio", image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/car1.png" },
    ];

    return (
        <section className="relative w-full bg-[#0a0a0a] text-white py-16 px-4 overflow-hidden border-b-2 border-emerald-600">

            {/* Left Decorative Wavy / Organic Line (Static & Elegant) */}

            <div className="absolute left-0 bottom-0 pointer-events-none opacity-40 hidden md:block z-20">
                <img
                    src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/ban.png"
                    alt=""
                    className="w-52 h-auto object-contain animate-spin-slow"
                />
            </div>


            {/* Infinite Scrolling Container */}
            <div className="w-full overflow-hidden relative flex">
                {/* Gradient Shadows on left/right for smooth fading effect */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Track */}
                <div className="flex animate-marquee space-x-12 items-center whitespace-nowrap min-w-full">
                    {/* First set of brands */}
                    {brands.map((brand) => (
                        <div
                            key={`brand-1-${brand.id}`}
                            className="inline-flex items-center justify-center p-4 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer shrink-0"
                        >
                            <div className="text-center  p-4 w-40 h-24 flex items-center justify-center bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Duplicate set to make the infinite loop seamless */}
                    {brands.map((brand) => (
                        <div
                            key={`brand-2-${brand.id}`}
                            className="inline-flex items-center justify-center p-4 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer shrink-0"
                        >
                            <div className="text-center  p-4 w-40 h-24 flex items-center justify-center bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind Custom Marquee Animation Support */}
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                    
.animate-spin-slow {
  animation: spin360 2s linear infinite;
}

@keyframes spin360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

            `}</style>
        </section>
    );
};

export default BrandLogo;