'use client';
import { useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CivilEngineering() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    let ctx = null;
    const init = async () => {
      try {
        const gsap = (await import('gsap')).default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Hero timeline
          const h1 = heroRef.current?.querySelector('h1');
          const p = heroRef.current?.querySelector('p');
          const btn = heroRef.current?.querySelector('button');
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          if (h1) tl.from(h1, { y: 50, opacity: 0, duration: 0.9, clearProps: 'transform,opacity' });
          if (p) tl.from(p, { y: 30, opacity: 0, duration: 0.7, clearProps: 'transform,opacity' }, '-=0.5');
          if (btn) tl.from(btn, { y: 20, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.4');

          // Services cards
          gsap.from('.service-card', {
            scrollTrigger: { trigger: servicesRef.current, start: 'top 85%', once: true },
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // Gallery items
          gsap.from('.gallery-item', {
            scrollTrigger: { trigger: galleryRef.current, start: 'top 90%', once: true },
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            clearProps: 'transform,opacity'
          });

          // CTA reveal
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
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80" alt="Civil Engineering" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Civil Engineering Excellence</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Building the infrastructure of tomorrow with precision, expertise, and innovation</p>
          <Button size="lg" className="group">
            Get Quote Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Services Detail */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Infrastructure Design",
                description: "Comprehensive design solutions for roads, bridges, and public infrastructure using latest technology and standards.",
                features: ["CAD Design", "3D Modeling", "Structural Analysis", "Environmental Impact Assessment"]
              },
              {
                title: "Building Construction",
                description: "Commercial and residential construction with quality assurance, safety compliance, and timely delivery.",
                features: ["Project Planning", "Quality Control", "Safety Management", "Regular Inspections"]
              },
              {
                title: "Project Management",
                description: "End-to-end project management ensuring cost efficiency, timeline adherence, and stakeholder satisfaction.",
                features: ["Scheduling", "Budget Management", "Risk Assessment", "Progress Tracking"]
              },
              {
                title: "Structural Analysis",
                description: "Advanced structural analysis and design for optimal safety and performance of buildings and infrastructure.",
                features: ["Load Testing", "Durability Analysis", "Material Selection", "Code Compliance"]
              }
            ].map((service, index) => (
              <div key={index} className="service-card p-8 rounded-xl border border-border/50 bg-secondary/20 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Project Portfolio</h2>
          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="gallery-item group relative overflow-hidden rounded-xl h-64 cursor-pointer">
                <img src={`https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80&t=${item}`} alt={`Project ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">Project {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Project Today</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Let our expert engineers transform your vision into reality</p>
        <Button size="lg">Contact Our Team</Button>
      </section>
    </main>
  );
}
