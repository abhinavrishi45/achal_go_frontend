'use client';
import { useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CargoService() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const fleetRef = useRef(null);
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
          // Hero reveal
          const h1 = heroRef.current?.querySelector('h1');
          const p = heroRef.current?.querySelector('p');
          const btn = heroRef.current?.querySelector('button');
          const tl = gsap.timeline();
          if (h1) tl.from(h1, { y: 40, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' });
          if (p) tl.from(p, { y: 20, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.4');
          if (btn) tl.from(btn, { y: 20, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.3');

          // Services cards
          gsap.from('.service-card', {
            scrollTrigger: { trigger: servicesRef.current, start: 'top 85%', once: true },
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // Fleet cards
          gsap.from('.fleet-card', {
            scrollTrigger: { trigger: fleetRef.current, start: 'top 85%', once: true },
            scale: 0.92,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // Pricing
          gsap.from('.pricing-card', {
            scrollTrigger: { trigger: pricingRef.current, start: 'top 90%', once: true },
            y: 30,
            opacity: 0,
            stagger: 0.12,
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
      import('gsap').then((m) => {
        import('gsap/ScrollTrigger').then((sm) => {
          sm.ScrollTrigger.getAll().forEach(t => t.kill());
        }).catch(() => { });
      }).catch(() => { });
    };
  }, []);

  return (
    <main className="max-w-7xl mx-auto ">
      {/* Hero */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1578575437980-63300dd63e0f?w=1200&q=80" alt="Cargo Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Reliable Cargo Solutions</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Fast, secure, and transparent logistics across the country</p>
          <Button size="lg" className="group">
            Ship Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Express Delivery",
                description: "Fast and reliable express delivery service with guaranteed timely delivery.",
                features: ["Next Day Delivery", "Real-Time Tracking", "Insurance Included", "Door-to-Door Service"]
              },
              {
                title: "Full Truck Load",
                description: "Cost-effective transportation for large shipments with dedicated vehicles.",
                features: ["Large Capacity", "Direct Route", "Competitive Pricing", "Safe Handling"]
              },
              {
                title: "Specialized Cargo",
                description: "Expert handling of fragile, hazardous, and special cargo with care.",
                features: ["Climate Control", "Secure Packaging", "Expert Handling", "Custom Solutions"]
              },
              {
                title: "International Shipping",
                description: "Global reach with customs clearance and door-to-door international delivery.",
                features: ["Customs Support", "Door-to-Door", "Multiple Carriers", "Competitive Rates"]
              }
            ].map((service, index) => (
              <div key={index} className="service-card p-8 rounded-xl border border-border/50 bg-secondary/20 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Fleet */}
      <section ref={fleetRef} className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Fleet & Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fleet-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-muted-foreground">Active Vehicles</p>
            </div>
            <div className="fleet-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
              <p className="text-muted-foreground">Countries Covered</p>
            </div>
            <div className="fleet-card p-8 rounded-xl border border-border/50 bg-background text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { weight: "Up to 5 kg", price: "₹99", time: "2-3 Days" },
              { weight: "5-20 kg", price: "₹199", time: "1-2 Days" },
              { weight: "20+ kg", price: "Custom Quote", time: "Express Available" }
            ].map((plan, index) => (
              <div key={index} className="pricing-card p-6 rounded-xl border border-border/50 bg-background hover:shadow-lg transition-all text-center">
                <h3 className="text-xl font-bold mb-2">{plan.weight}</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">{plan.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{plan.time}</p>
                <Button variant="outline" className="w-full">Send Now</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Ship with Confidence</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Trust us with your valuable cargo and experience hassle-free delivery</p>
        <Button size="lg">Get Your Quote Today</Button>
      </section>
    </main>
  );
}
