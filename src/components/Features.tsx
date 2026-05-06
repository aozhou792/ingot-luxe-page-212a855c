import { Battery, Gauge, Gem } from "lucide-react";

const features = [
  {
    icon: Battery,
    title: "9000 Puffs",
    desc: "Long-lasting capacity engineered for days of uninterrupted indulgence.",
  },
  {
    icon: Gauge,
    title: "Smart Display",
    desc: "Real-time e-liquid and battery tracking with a precision digital readout.",
  },
  {
    icon: Gem,
    title: "Premium Ingot Design",
    desc: "Solid gold-bar silhouette crafted for an ergonomic, luxurious grip.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-28 relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Engineered for excellence</p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Crafted to be <span className="text-gold">extraordinary</span>
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal luxe-card rounded-2xl p-8 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-gold bg-primary/5 group-hover:bg-gold transition-colors">
                <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gold">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
