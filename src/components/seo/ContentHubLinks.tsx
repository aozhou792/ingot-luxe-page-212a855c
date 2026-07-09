import { Link } from "react-router-dom";

const HUB_LINKS = [
  { label: "Topics", to: "/topics", description: "Entity hubs for brand & comparison searches" },
  { label: "Guides", to: "/guides", description: "How-to and product guides" },
  { label: "Flavours", to: "/flavours", description: "One page per flavour" },
  { label: "Compare", to: "/compare", description: "Alibarbar vs competitors" },
  { label: "Reviews", to: "/reviews", description: "Editorial flavour reviews" },
  { label: "FAQ", to: "/faq", description: "40+ answered questions" },
  { label: "Blog", to: "/blog", description: "Buying tips and news" },
  { label: "Shipping", to: "/shipping", description: "Delivery policy" },
] as const;

/** Internal linking hub surfaced at the end of knowledge articles. */
export function ContentHubLinks() {
  return (
    <nav aria-label="Explore more" className="mt-14 rounded-2xl border border-gold/20 bg-card/40 p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Explore Alibarbar Australia</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {HUB_LINKS.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="group block rounded-xl border border-gold/15 bg-background/50 p-3 hover:border-gold/40 transition-colors">
              <span className="text-sm font-semibold text-primary group-hover:text-gold">{link.label}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
