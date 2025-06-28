import { useRef, useEffect, useState } from "react";
import {
  Trophy,
  Building,
  FileText,
  Map,
  Users,
} from "lucide-react";
import React from "react";

const statsData = [
  { id: 1, value: 11, label: "Years of Experience", suffix: "+", icon: Trophy },
  { id: 2, value: 250, label: "Corporates Served", suffix: "+", icon: Building },
  { id: 3, value: 100000, label: "Resumes Scanned", suffix: "+", icon: FileText },
  { id: 4, value: 200, label: "Unique Roles Mapped", suffix: "+", icon: Map },
  { id: 5, value: 8500, label: "Candidates Placed", suffix: "+", icon: Users },
];

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(statsData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const animationTimersRef = useRef<NodeJS.Timeout[]>([]);

  const animateValues = () => {
    animationTimersRef.current.forEach(clearInterval);
    animationTimersRef.current = [];

    statsData.forEach((stat, index) => {
      const duration = 2000;
      const steps = 100;
      const stepValue = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const nextVal = Math.round(stepValue * currentStep);

        setAnimatedStats(prev => {
          const newValues = [...prev];
          newValues[index] = nextVal >= stat.value ? stat.value : nextVal;
          return newValues;
        });

        if (nextVal >= stat.value) clearInterval(timer);
      }, duration / steps);

      animationTimersRef.current.push(timer);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

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
    <section className="bg-blue-100 py-20 md:py-16">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            The Facts and Figures Behind Our Success
          </h2>
        </div>

        <div
          ref={statsRef}
          className="bg-white rounded-2xl shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="p-8 text-center flex flex-col items-center"
                >
                  <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-2xl mb-5">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    <span>{formatValue(animatedStats[index])}</span>
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="text-base text-slate-600 mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;