'use client';
import { useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function EVCharging() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const networkRef = useRef(null);
  const pricingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    let ctx = null;
    const init = async () => {
      try {
        const gsap = (await import('gsap')).default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Hero
          const h1 = heroRef.current?.querySelector('h1');
          const p = heroRef.current?.querySelector('p');
          const btn = heroRef.current?.querySelector('button');
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          if (h1) tl.from(h1, { y: 50, opacity: 0, duration: 0.9, clearProps: 'transform,opacity' });
          if (p) tl.from(p, { y: 30, opacity: 0, duration: 0.7, clearProps: 'transform,opacity' }, '-=0.6');
          if (btn) tl.from(btn, { y: 20, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.5');

          // Feature cards
          gsap.from('.feature-card', {
            scrollTrigger: { trigger: featuresRef.current, start: 'top 85%', once: true },
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // Network cards
          gsap.from('.network-card', {
            scrollTrigger: { trigger: networkRef.current, start: 'top 85%', once: true },
            scale: 0.94,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // Pricing cards
          gsap.from('.plan-card', {
            scrollTrigger: { trigger: pricingRef.current, start: 'top 90%', once: true },
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // CTA
          gsap.from(ctaRef.current, {
            scrollTrigger: { trigger: ctaRef.current, start: 'top 95%', once: true },
            scale: 0.96,
            opacity: 0,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });
        }, heroRef);

        ScrollTrigger.refresh();
      } catch (err) {
        console.error('GSAP load error', err);
      }
    };

    const id = setTimeout(init, 80);
    return () => {
      clearTimeout(id);
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
      import('gsap').then(() => {
        import('gsap/ScrollTrigger').then((sm) => {
          sm.ScrollTrigger.getAll().forEach(t => t.kill());
        }).catch(() => { });
      }).catch(() => { });
    };
  }, []);
  return (

    <main className="w-full pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=1200&q=80" alt="EV Charging" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Future of Mobility</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Advanced EV charging infrastructure for sustainable transportation</p>
          <Button size="lg" className="group">
            Find Charging Station
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Fast Charging",
                description: "High-powered DC fast charging stations for rapid battery recharge.",
                features: ["50-350 kW Power", "15-30 Min Charge", "Compatible Models", "Safety Features"]
              },
              {
                title: "Eco-Friendly",
                description: "100% renewable energy sourced from solar and wind power systems.",
                features: ["Solar Powered", "Wind Energy", "Zero Emissions", "Sustainable"]
              },
              {
                title: "App Controlled",
                description: "Smart mobile app to locate, reserve, and pay for charging seamlessly.",
                features: ["Real-Time Availability", "Remote Unlocking", "Payment Options", "Notifications"]
              },
              {
                title: "24/7 Available",
                description: "Round-the-clock charging access with support and maintenance.",
                features: ["Always Open", "24/7 Support", "Regular Maintenance", "Emergency Help"]
              }
            ].map((service, index) => (
              <div key={index} className="feature-card p-8 rounded-xl border border-border/50 bg-secondary/20 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charging Network */}
      <section ref={networkRef} className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Charging Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="network-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-yellow-600 mb-2">100+</div>
              <p className="text-muted-foreground">Charging Stations</p>
            </div>
            <div className="network-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-yellow-600 mb-2">500+</div>
              <p className="text-muted-foreground">Charging Points</p>
            </div>
            <div className="network-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-yellow-600 mb-2">50K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Pay-Per-Use", price: "₹10/kWh", features: ["Flexible Charging", "No Commitment", "All Stations"] },
              { name: "Monthly", price: "₹999", features: ["Unlimited Charging", "Priority Access", "20% Discount"] },
              { name: "Quarterly", price: "₹2,499", features: ["Unlimited Charging", "VIP Support", "30% Discount"] },
              { name: "Annual", price: "₹9,999", features: ["Premium Charging", "VIP Support", "40% Discount"] }
            ].map((plan, index) => (
              <div key={index} className="plan-card p-6 rounded-xl border border-border/50 bg-background hover:shadow-lg transition-all text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">{feature}</li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">Choose Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Go Green Today</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Join the electric revolution and charge your vehicle with clean, renewable energy</p>
        <Button size="lg">Download Charging App</Button>
      </section>
    </main>
  );
}
