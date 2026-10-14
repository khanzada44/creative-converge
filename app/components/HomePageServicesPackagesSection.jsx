"use client";

const commonFeatures = [
    "– Value Added Services",
    "Complete Source Files",
    "Dedicated Project Manager",
    "100% Satisfaction Guarantee",
    "100% Money Back Guarantee",
    "*NO MONTHLY OR ANY HIDDEN FEE*",
];

const packages = [
    {
        title: "BASIC Website Package",
        price: "499",
        cents: ".00",
        addOn: "Add on: $50 for expedited services",
        features: [
            "1 Page Website Design",
            "WordPress Based",
            "1 Banner Design",
            "Contact/Query Form",
            "3 Revisions",
            "Complete Deployment",
            ...commonFeatures,
        ],
    },
    {
        title: "STARTUP Website Package",
        price: "799",
        cents: ".00",
        addOn: "Add on: $50 for expedited services",
        features: [
            "Sliding Banner",
            "2 Stock Photos (You can provide us more)",
            "Contact/Query Form",
            "3 Professional Email ID's",
            "6 Revisions",
            "Complete Deployment",
            ...commonFeatures,
        ],
    },
    {
        title: "PROFESSIONAL Website Package",
        price: "1199",
        cents: ".00",
        addOn: "Add on: $50 for expedited services",
        features: [
            "Up to 5 Pages Website Design",
            "3 Banner Designs",
            "Sliding Banner",
            "Hover Effects",
            "Content Management System (WordPress)",
            ...commonFeatures,
        ],
    },
];

const HomePageServicesPackagesSection = () => {
    return (
        <section className="relative w-full bg-black text-white py-8 px-4 sm:px-12 lg:px-8 overflow-hidden">
            <style>{`
                /* Chrome / Edge / Safari: arrows (up/down buttons) hata diye */
                .features-scroll::-webkit-scrollbar {
                    width: 12px;
                }
                .features-scroll::-webkit-scrollbar-button {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .features-scroll::-webkit-scrollbar-track {
                    background: #232522;
                    border-radius: 9999px;
                }
                .features-scroll::-webkit-scrollbar-thumb {
                    background: #00A8A8;
                    border-radius: 9999px;
                }
                .features-scroll::-webkit-scrollbar-thumb:hover {
                    background: #2d8650;
                }
                /* Sirf Firefox ke liye (Chrome mein ye arrows wapas la deta hai) */
                @supports not selector(::-webkit-scrollbar) {
                    .features-scroll {
                        scrollbar-width: auto;
                        scrollbar-color: #00A8A8 #232522;
                    }
                }
            `}</style>

            <div className="bg-black text-white rounded-2xl p-6 sm:p-10 lg:p-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto w-full">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="group flex flex-col h-full bg-white hover:bg-neutral-50 transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-900/40 cursor-pointer"
                        >
                            {/* Header: hover par green + white text */}
                            <div className="px-6 pt-[50px] pb-9 text-center text-neutral-900 transition-colors duration-300 group-hover:bg-[#00A8A8] group-hover:text-white">
                                <h3 className="  text-xl sm:text-[22px] mb-6 tracking-wide">
                                    {pkg.title}
                                </h3>

                                <div className="flex items-start justify-center">
                                    <span className="text-3xl   mt-3">$</span>
                                    <span className="text-7xl font-light tracking-tight leading-none">
                                        {pkg.price}
                                    </span>
                                    <span className="text-3xl   mt-3">{pkg.cents}</span>
                                </div>
                                <p className="text-sm sm:text-base font-medium mt-4 text-neutral-600 transition-colors duration-300 group-hover:text-white/90">
                                    {pkg.addOn}
                                </p>
                            </div>

                            {/* Features: fixed height + scrollbar */}
                            <div className="px-6 my-10 flex-1">
                                <ul className="features-scroll h-72 overflow-y-scroll space-y-6 pr-4">
                                    {pkg.features.map((feature, fIndex) => (
                                        <li
                                            key={fIndex}
                                            className="text-base font-medium text-neutral-800 text-center leading-snug"
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Buy Now */}
                            <div className="text-center pb-[50px] mt-auto">
                                <button className="rounded-full border-2 border-neutral-900 px-10 py-3 text-lg   tracking-wide text-neutral-900 transition-all duration-300 group-hover:border-[#00A8A8] group-hover:bg-[#00A8A8] group-hover:text-white">
                                    Buy now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href="#view-more"
                        className="text-sm sm:text-base text-[#fff] hover:underline"
                    >
                        VIEW MORE
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomePageServicesPackagesSection;