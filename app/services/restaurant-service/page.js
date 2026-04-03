'use client';
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function RestaurantService() {
  return (
    <main className="w-full pt-20">
      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1504674900968-f0bbb2fa5311?w=1200&q=80" alt="Restaurant Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Premium Dining & Catering</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Experience exquisite cuisine and impeccable service for every occasion</p>
          <Button size="lg" className="group">
            Book Your Table
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Fine Dining",
                description: "Sophisticated dining experience with premium cuisines prepared by award-winning chefs.",
                features: ["A La Carte Menu", "Wine Pairing", "Private Rooms", "Ambiance Perfection"]
              },
              {
                title: "Corporate Catering",
                description: "Professional catering for conferences, meetings, and corporate events with custom menus.",
                features: ["Event Planning", "Menu Customization", "On-Site Service", "Dietary Options"]
              },
              {
                title: "Wedding Services",
                description: "Complete wedding catering with specialized menus and professional service team.",
                features: ["Customized Menus", "Elegant Presentation", "Full Staffing", "Theme Design"]
              },
              {
                title: "Party & Events",
                description: "Make your celebrations memorable with our catering and event management services.",
                features: ["Menu Options", "Decoration", "Sound & Lights", "Photography"]
              }
            ].map((service, index) => (
              <div key={index} className="p-8 rounded-xl border border-border/50 bg-secondary/20 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Cuisines</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Indian", desc: "Traditional & Modern Indian Cuisine" },
              { name: "Continental", desc: "European & Global Flavors" },
              { name: "Asian Fusion", desc: "Creative Asian Fusion Dishes" },
              { name: "Vegetarian", desc: "Gourmet Vegetarian Options" }
            ].map((cuisine, index) => (
              <div key={index} className="p-6 rounded-xl border border-border/50 bg-background hover:shadow-lg transition-all text-center">
                <h3 className="text-xl font-bold mb-2">{cuisine.name}</h3>
                <p className="text-sm text-muted-foreground">{cuisine.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl h-64 cursor-pointer">
                <img src={`https://images.unsplash.com/photo-1504674900968-f0bbb2fa5311?w=400&q=80&t=${item}`} alt={`Dish ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Reserve Your Experience Today</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Indulge in culinary excellence with our premium dining and catering services</p>
        <Button size="lg">Contact Us For Reservation</Button>
      </section>
    </main>
  );
}
