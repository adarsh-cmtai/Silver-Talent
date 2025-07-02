import { useRef, useEffect, useState } from "react";
import { Trophy, Building, FileText, MapPin, Users, TrendingUp } from "lucide-react";
import React from "react";

const initialStats = [
  { id: 1, value: 11, label: "Years of Experience", suffix: "+", icon: Trophy, iconBg: "bg-sky-100", iconColor: "text-sky-600" },
  { id: 2, value: 250, label: "Corporates Served", suffix: "+", icon: Building, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: 3, value: 100000, label: "Resumes Scanned", suffix: "+", icon: FileText, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
  { id: 4, value: 8500, label: "Candidates Placed", suffix: "+", icon: Users, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { id: 5, value: 98, label: "Client Satisfaction", suffix: "%", icon: TrendingUp, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
];

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(initialStats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const animationTimersRef = useRef<NodeJS.Timeout[]>([]);

  const animateValues = () => {
    animationTimersRef.current.forEach(clearInterval);
    animationTimersRef.current = [];

    initialStats.forEach((stat, index) => {
      const duration = 2000;
      const stepTime = Math.max(10, duration / stat.value);
      const increment = Math.max(1, Math.ceil(stat.value / (duration / stepTime)));
      let currentVal = 0;

      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= stat.value) {
          currentVal = stat.value;
          clearInterval(timer);
        }
        setAnimatedStats(prev => {
          const newValues = [...prev];
          newValues[index] = currentVal;
          return newValues;
        });
      }, stepTime);
      animationTimersRef.current.push(timer);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    const el = statsRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      animationTimersRef.current.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateValues();
    }
  }, [isVisible]);

  const formatValue = (value: number) => {
    return value.toLocaleString('en-US');
  };

  return (
    <section ref={statsRef} className="bg-blue-50 py-10 md:py-10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Facts and Figures Behind Our Success
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Driving growth and building successful teams with proven expertise and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {initialStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:bg-white"
              >
                <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${stat.iconBg} mb-6`}>
                  <Icon className={`h-9 w-9 ${stat.iconColor}`} />
                </div>
                
                <p className="text-3xl md:text-3xl font-bold text-slate-800 tracking-tighter">
                  <span>{formatValue(animatedStats[index])}</span>
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-base text-slate-600 mt-2 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;