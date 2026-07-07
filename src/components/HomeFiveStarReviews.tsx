import { StarRating } from "@/components/reviews/StarRating";

const featuredReviews = [
  {
    title: "Smooth flavour and easy checkout",
    body: "The flavour stayed consistent and the LED display made it easy to see when the device was getting low. Checkout was simple and the bank transfer instructions were clear.",
    author: "Verified customer",
    product: "Peach Ice",
  },
  {
    title: "Custom pack is the best way to try flavours",
    body: "Being able to choose different flavours in one pack is really useful. I picked berry, mango and ice flavours and all the selections were saved correctly on the order.",
    author: "Verified customer",
    product: "Custom Pack",
  },
  {
    title: "Good value for a longer-lasting device",
    body: "The Ingot 9000 lasts much longer than smaller disposables I have used before. The gold design feels premium and the draw is smooth from the first puff.",
    author: "Verified customer",
    product: "Quadruple Berry",
  },
];

export const HomeFiveStarReviews = () => (
  <section className="py-16 sm:py-20 md:py-28 relative">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal px-1">
        <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
          5-Star Feedback
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Customers Love <span className="text-gold">Alibarbar</span>
        </h2>
        <div className="mt-4 flex items-center justify-center">
          <StarRating value={5} size="lg" />
        </div>
        <div className="gold-divider mt-6 sm:mt-8 max-w-xs mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {featuredReviews.map((review, index) => (
          <article
            key={review.title}
            className="reveal rounded-2xl border border-gold/20 bg-card/60 p-5 flex flex-col gap-3"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <StarRating value={5} size="sm" />
            <h3 className="text-base font-bold leading-snug">{review.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{review.body}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-gold/15 pt-3">
              <span className="font-semibold text-foreground">{review.author}</span>
              <span>{review.product}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
