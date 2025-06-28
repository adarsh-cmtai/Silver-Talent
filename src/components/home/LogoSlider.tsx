import { useRef, useEffect } from "react";
import { Briefcase, ShieldCheck } from "lucide-react";

const logos = [
    { id: 1, name: "Cushman & Wakefield", url: "https://logo.clearbit.com/cushwake.com" },
    { id: 2, name: "CB Richard Ellis", url: "https://logo.clearbit.com/cbre.com" },
    { id: 3, name: "Zepto", url: "https://logo.clearbit.com/zeptonow.com" },
    { id: 4, name: "Bigbasket", url: "https://logo.clearbit.com/bigbasket.com" },
    { id: 5, name: "Ola Cabs", url: "https://logo.clearbit.com/olacabs.com" },
    { id: 6, name: "Nobroker", url: "https://logo.clearbit.com/nobroker.in" },
    { id: 7, name: "Springwel", url: "https://logo.clearbit.com/springwel.com" },
    { id: 8, name: "Reliance Retail", url: "https://logo.clearbit.com/relianceretail.com" },
    { id: 9, name: "Blue Tokai", url: "https://logo.clearbit.com/bluetokaicoffee.com" },
    { id: 10, name: "Dish TV", url: "https://logo.clearbit.com/dishtv.in" },
    { id: 11, name: "Goibibo", url: "https://logo.clearbit.com/goibibo.com" },
    { id: 12, name: "Classplus", url: "https://logo.clearbit.com/classplusapp.com" },
    { id: 13, name: "Concentrix", url: "https://logo.clearbit.com/concentrix.com" },
    { id: 14, name: "Fever104 FM", url: "https://logo.clearbit.com/fever.fm" },
];

const LogoSlider = () => {
    const sliderContainerRef = useRef(null);

    const half = Math.ceil(logos.length / 2);
    const row1Logos = logos.slice(0, half);
    const row2Logos = logos.slice(half);

    const duplicatedRow1 = [...row1Logos, ...row1Logos];
    const duplicatedRow2 = [...row2Logos, ...row2Logos];

    useEffect(() => {
        const container = sliderContainerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    container.querySelector("#slider-row-1")?.classList.add("animate-scroll");
                    container.querySelector("#slider-row-2")?.classList.add("animate-scroll-reverse");
                }
            }, { threshold: 0.1 }
        );

        if (container) {
            observer.observe(container);
        }

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    }, []);

    const handleImageError = (e, logo) => {
        const target = e.target;
        target.style.display = 'none';
        const parentDiv = target.parentNode;
        if (parentDiv) {
            const fallbackText = document.createElement('div');
            fallbackText.className = "w-full h-20 flex items-center justify-center text-xs text-slate-500 bg-slate-100 rounded-lg";
            fallbackText.textContent = logo.name.substring(0, 15);
            parentDiv.insertBefore(fallbackText, target);
        }
    };

    const renderLogoCard = (logo, index) => (
        <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 w-36 sm:w-40 bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
        >
            <img
                src={logo.url}
                alt={`${logo.name} logo`}
                className="h-28 w-full object-contain rounded-xl"
                onError={(e) => handleImageError(e, logo)}
            />
        </div>
    );

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3 sm:gap-4">
                        <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
                        Trusted by <span className="text-sky-600">150+ Employers</span>
                        <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
                    </h2>
                    <p className="mt-4 text-md text-slate-600 max-w-2xl mx-auto">
                        We are proud to partner with industry leaders to build talented and high-performing teams.
                    </p>
                </div>
                <div
                    ref={sliderContainerRef}
                    className="relative w-full group mask-gradient"
                >
                    <div className="flex flex-col justify-center gap-y-8 md:gap-y-10 py-8 group-hover:[&_div]:[animation-play-state:paused]">
                        <div id="slider-row-1" className="flex w-max space-x-8 md:space-x-12 lg:space-x-16 will-change-transform">
                            {duplicatedRow1.map(renderLogoCard)}
                        </div>
                        <div id="slider-row-2" className="flex w-max space-x-8 md:space-x-12 lg:space-x-16 will-change-transform">
                            {duplicatedRow2.map(renderLogoCard)}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .mask-gradient {
                        -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                        mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    }
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes scroll-reverse {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scroll-reverse 20s linear infinite;
                    }
                `}
            </style>
        </section>
    );
};

export default LogoSlider;