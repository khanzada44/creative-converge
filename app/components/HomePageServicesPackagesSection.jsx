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
            <div className="bg-black text-white rounded-2xl p-6 sm:p-10 lg:p-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto w-full">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="group flex flex-col h-full bg-white hover:bg-[#1a1c27] transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-2xl hover:shadow-emerald-900/30 cursor-pointer"
                        >
                            {/* Header: hover par green */}
                            <div className="px-5 pt-[50px] pb-8 text-center transition-colors duration-300 group-hover:bg-[#00D100]">
                                <h3 className="font-bold text-base sm:text-lg mb-6 tracking-wide text-black">
                                    {pkg.title}
                                </h3>

                                <div className="flex items-start ju stify-center text-black">
                                    <span className="text-xl font-bold mt-2">$</span>
                                    <span className="text-5xl font-light tracking-tight">
                                        {pkg.price}
                                    </span>
                                    <span className="text-xl font-bold mt-2">{pkg.cents}</span>
                                </div>
                                <p className="text-xs text-black mt-2">{pkg.addOn}</p>
                            </div>

                            {/* Features: lamba area + scrollbar */}
                            <div className="px-5 my-10 flex-1">
                                <ul className="features-scroll h-64 overflow-y-scroll space-y-5 pr-3">
                                    {pkg.features.map((feature, fIndex) => (
                                        <li
                                            key={fIndex}
                                            className="text-xs text-black text-center"
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Buy Now */}
                            <div className="text-center pb-[50px] mt-auto">
                                <button className="text-base font-medium text-black hover:text-emerald-400 transition-colors duration-200">
                                    Buy now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <a
                        href="#view-more"
                        className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-emerald-400 hover:underline"
                    >
                        VIEW MORE
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomePageServicesPackagesSection;