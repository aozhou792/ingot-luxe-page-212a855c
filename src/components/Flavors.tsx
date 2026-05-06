import coolMint from "@/assets/flavor-cool-mint.png";
import blackberry from "@/assets/flavor-blackberry.png";
import california from "@/assets/flavor-california.png";
import strawberry from "@/assets/flavor-strawberry.png";
import grape from "@/assets/flavor-grape.png";
import mango from "@/assets/flavor-mango.png";

const flavors = [
  { name: "Cool Mint", price: "19.99", img: coolMint, tag: "Iced" },
  { name: "Blackberry Ice", price: "19.99", img: blackberry, tag: "Iced" },
  { name: "Mango Magic", price: "19.99", img: mango, tag: "Tropical" },
  { name: "California Sunset", price: "19.99", img: california, tag: "Citrus" },
  { name: "Chupa Strawberry", price: "19.99", img: strawberry, tag: "Sweet" },
  { name: "Grape Ice", price: "19.99", img: grape, tag: "Iced" },
];

export const Flavors = () => {
  return (
    <section id="flavors" className="py-28 relative">
      <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-radial)" }} />
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Collection</p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Explore Our <span className="text-gold">Signature Flavors</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Six masterful blends. One unforgettable experience.
          </p>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flavors.map((f, i) => (
            <article
              key={f.name}
              className="reveal luxe-card rounded-2xl overflow-hidden group flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-secondary to-background overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-gold-soft)" }} />
                <img
                  src={f.img}
                  alt={`${f.name} Alibarbar Ingot 9000 puffs flavor`}
                  loading="lazy"
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-gold bg-background/60 backdrop-blur text-primary">
                  {f.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold">{f.name}</h3>
                  <span className="text-lg font-bold text-gold whitespace-nowrap">${f.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">9000 puffs · Smart display · Mesh coil</p>

                <button className="mt-auto w-full py-3 rounded-full border border-gold text-primary font-semibold uppercase tracking-widest text-xs hover:bg-gold hover:text-primary-foreground transition-all">
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
