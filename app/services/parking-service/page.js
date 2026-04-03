'use client';
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ParkingService() {
  return (
    <main className="w-full pt-20">
      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80" alt="Parking Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Smart Parking Solutions</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Find, reserve, and secure your parking space with cutting-edge technology</p>
          <Button size="lg" className="group">
            Book Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Smart Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Real-Time Availability",
                description: "Check parking availability in real-time and reserve your spot instantly through our mobile app.",
                features: ["Live Updates", "GPS Navigation", "Spot Reservation", "Easy Cancellation"]
              },
              {
                title: "Secure Facilities",
                description: "24/7 surveillance and security personnel ensuring maximum safety for your vehicle.",
                features: ["CCTV Monitoring", "Security Guards", "Automated Gates", "Emergency Support"]
              },
              {
                title: "Flexible Plans",
                description: "Choose from hourly, daily, monthly, and annual plans tailored to your parking needs.",
                features: ["Hourly Rates", "Daily Passes", "Monthly Subscriptions", "Special Rates"]
              },
              {
                title: "Digital Payments",
                description: "Fast and secure payment options with multiple payment methods and instant receipts.",
                features: ["Credit/Debit Card", "Digital Wallets", "Auto Billing", "Invoicing System"]
              }
            ].map((service, index) => (
              <div key={index} className="p-8 rounded-xl border border-border/50 bg-secondary/20 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Hourly", price: "₹50", features: ["1 Hour Parking", "Easy Entry/Exit", "Digital Receipt"] },
              { name: "Daily", price: "₹300", features: ["24 Hour Parking", "Same Location", "Free Cancellation"] },
              { name: "Monthly", price: "₹5,999", features: ["Unlimited Parking", "Reserved Spot", "24/7 Support"] },
              { name: "Annual", price: "₹59,999", features: ["Full Year Access", "Priority Spot", "Free Upgrades"] }
            ].map((plan, index) => (
              <div key={index} className="p-6 rounded-xl border border-border/50 bg-background hover:shadow-lg transition-all text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-purple-600 mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">{feature}</li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">Select Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Never Worry About Parking Again</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers using our smart parking service</p>
        <Button size="lg">Download Our App</Button>
      </section> */}
    </main>
  );
}
