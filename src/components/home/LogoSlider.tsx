import { useState, useEffect } from "react";
import { Briefcase, ShieldCheck } from "lucide-react";

const logos = [
    { id: 1, name: "Cushman & Wakefield", url: "https://logo.clearbit.com/cushwake.com" },
    { id: 2, name: "CB Richard Ellis", url: "https://logo.clearbit.com/cbre.com" },
    { id: 3, name: "Zepto", url: "https://thehardcopy.co/wp-content/uploads/Zepto-Featured-Image-Option-2-768x515.png" },
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
    { id: 15, name: "Milkbasket", url: "https://logo.clearbit.com/milkbasket.com" },
    { id: 16, name: "Skill Lync", url: "https://logo.clearbit.com/skill-lync.com" },
    { id: 17, name: "Newton School", url: "https://logo.clearbit.com/newtonschool.co" },
    { id: 18, name: "Leadec India", url: "https://logo.clearbit.com/leadec-services.com" },
    { id: 19, name: "Horizon Industrial", url: "https://pbs.twimg.com/profile_images/1787812395273932800/lrifZzHC_400x400.jpg" },
    { id: 20, name: "Fleetx", url: "https://logo.clearbit.com/fleetx.io" },
    { id: 21, name: "Porter", url: "https://logo.clearbit.com/porter.in" },
    { id: 22, name: "The Sleep Company", url: "https://logo.clearbit.com/thesleepcompany.in" },
    { id: 23, name: "Wakefit", url: "https://logo.clearbit.com/wakefit.co" },
    { id: 24, name: "Uniglobe", url: "https://logo.clearbit.com/uniglobe.com" },
    { id: 25, name: "NetCarrots", url: "https://logo.clearbit.com/netcarrots.com" },
    { id: 26, name: "First Source", url: "https://logo.clearbit.com/firstsource.com" },
    { id: 27, name: "Suprdaily", url: "https://images.yourstory.com/cs/images/companies/zf2XjCqd400x400-1599202188400.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff" },
    { id: 28, name: "Domino's", url: "https://logo.clearbit.com/dominos.co.in" },
    { id: 29, name: "Urbanic", url: "https://logo.clearbit.com/urbanic.com" },
    { id: 30, name: "91Springboard", url: "https://logo.clearbit.com/91springboard.com" },
    { id: 31, name: "Bauer Kompressoren", url: "https://logo.clearbit.com/bauer-kompressoren.de" },
    { id: 32, name: "FuelBuddy", url: "https://logo.clearbit.com/fuelbuddy.in" },
    { id: 33, name: "Karvy", url: "https://logo.clearbit.com/karvy.com" },
    { id: 34, name: "Chokola", url: "https://logo.clearbit.com/chokola.in" },
    { id: 35, name: "Green Erect", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_u3nVdcOKnuKph1Ay2fSOdrTl2TIbrk_atg&s" },
    { id: 36, name: "Minacs", url: "https://logo.clearbit.com/concentrix.com" },
    { id: 37, name: "Taiyo Nippon", url: "https://logo.clearbit.com/tn-sanso.co.jp" },
    { id: 38, name: "Nimbus", url: "https://logo.clearbit.com/nimbuspost.com" },
    { id: 39, name: "Entra Solution", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8co_O5u2HGWvNMyVGwMwGaKvkMl3VCwBsg&s" },
    { id: 40, name: "Anish India Exports", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5LNb5agNFxVJLIoZdArW_6o2B56v86PlYw&s" },
    { id: 41, name: "Upscal", url: "https://logo.clearbit.com/upscal.io" },
];

const AnimatedLogoCard = ({ logosToShow }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!logosToShow || logosToShow.length <= 1) return;
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % logosToShow.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [logosToShow]);

    const handleImageError = (e, logo) => {
        const target = e.target;
        const wrapper = target.parentElement;
        if (wrapper && !wrapper.querySelector('.fallback-text')) {
            target.style.display = 'none';
            const fallbackText = document.createElement('div');
            fallbackText.className = "fallback-text w-full h-full flex items-center justify-center text-sm font-medium text-center text-slate-500 bg-slate-100 rounded-lg p-2";
            fallbackText.textContent = logo.name.substring(0, 20);
            wrapper.appendChild(fallbackText);
        }
    };

    if (!logosToShow || logosToShow.length === 0) {
        return null;
    }

    return (
        <div className="flex-shrink-0 w-full bg-white p-3 rounded-2xl shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-24 w-full">
                {logosToShow.map((logo, index) => (
                    <div
                        key={logo.id}
                        className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ease-in-out rounded-lg overflow-hidden ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={logo.url}
                            alt={`${logo.name} logo`}
                            className="h-full w-full object-contain"
                            onError={(e) => handleImageError(e, logo)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const LogoSlider = () => {
    const [logoGroups, setLogoGroups] = useState([]);
    const totalCards = 18;

    useEffect(() => {
        const shuffledLogos = [...logos].sort(() => 0.5 - Math.random());
        const groups = [];
        let logoIndex = 0;
        for (let i = 0; i < totalCards; i++) {
            const groupSize = Math.floor(Math.random() * 2) + 2; 
            const group = [];
            for (let j = 0; j < groupSize; j++) {
                group.push(shuffledLogos[logoIndex % shuffledLogos.length]);
                logoIndex++;
            }
            groups.push(group);
        }
        setLogoGroups(groups);
    }, []);

    if (logoGroups.length === 0) {
        return null;
    }

    return (
        <section className="py-10 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center justify-center gap-4">
                        <Briefcase className="w-9 h-9 text-sky-500" />
                        Trusted by <span className="text-sky-500">250+</span> Employers
                        <ShieldCheck className="w-9 h-9 text-sky-500" />
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        We partner with industry leaders and emerging startups to provide world-class opportunities.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    {logoGroups.map((group, i) => (
                        <AnimatedLogoCard key={i} logosToShow={group} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoSlider;