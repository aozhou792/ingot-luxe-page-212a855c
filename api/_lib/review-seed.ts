type SeedReview = {
  productSlug: string;
  userId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
};

const SEED_USER = "seed";

function five(productSlug: string, entries: [string, string, string][]): SeedReview[] {
  return entries.map(([author, title, body]) => ({
    productSlug,
    userId: SEED_USER,
    author,
    rating: 5,
    title,
    body,
  }));
}

export const seedReviewData: SeedReview[] = [
  ...five("quadruple-berry", [
    ["Jade M.", "Best berry mix", "So smooth and the berry blend is spot on. Ordered again straight away."],
    ["Liam T.", "Great flavour", "Tastes exactly like real berries, not artificial at all. Fast delivery to Melbourne."],
    ["Chloe R.", "Love it", "Lasts ages and the display is handy. Will keep buying."],
  ]),
  ...five("fanta", [
    ["Noah P.", "Fizzy and fun", "Genuinely tastes like orange soda. Really refreshing."],
    ["Ava S.", "My favourite", "Sweet citrus without being sickly. Arrived quick and sealed."],
    ["Ethan W.", "Top notch", "Great value for a 9000 puff device. Very happy."],
  ]),
  ...five("lychee", [
    ["Mia L.", "So fragrant", "Light and floral, really authentic lychee taste. Lovely."],
    ["Oliver K.", "Smooth draw", "Nice and clean flavour, no burnt taste at all. Recommend."],
    ["Isla H.", "Repeat buyer", "Third one now. Consistent quality every time."],
  ]),
  ...five("peach-ice", [
    ["Zoe B.", "Perfectly cool", "Juicy peach with a crisp icy finish. Exactly what I wanted."],
    ["Jack D.", "Great in summer", "Really refreshing, ice hits nicely. Quick postage."],
    ["Grace N.", "Delicious", "Sweet but balanced. Genuine product, sealed packaging."],
  ]),
  ...five("blackberry-ice", [
    ["Harper C.", "Rich and cool", "Ripe blackberry with a menthol edge. Really smooth."],
    ["Lucas F.", "Excellent", "Flavour lasts the whole device. No complaints at all."],
    ["Ella J.", "Would buy again", "Arrived in a couple of days, product is authentic."],
  ]),
  ...five("mango-magic", [
    ["Ruby A.", "Tropical goodness", "Ripe juicy mango, super smooth. My go-to now."],
    ["Mason V.", "Great taste", "Not too sweet, really natural mango flavour. Fast shipping."],
    ["Sophie E.", "Love this one", "Best mango disposable I've tried in Australia."],
  ]),
  ...five("strawberry-coconut-watermelon", [
    ["Leo G.", "Amazing blend", "Strawberry, coconut and watermelon work so well together."],
    ["Amelia Q.", "So tropical", "Creamy and fruity at once. Really impressed."],
    ["Henry U.", "Top flavour", "Smooth all the way through. Quick delivery, sealed."],
  ]),
  ...five("grape-ice", [
    ["Layla O.", "Bold grape", "Juicy grape with a cool finish. Really moreish."],
    ["Max I.", "Great chill", "Perfect ice level, strong grape taste. Very happy."],
    ["Freya Z.", "Excellent", "Authentic and long lasting. Will reorder."],
  ]),
  ...five("strawberry-watermelon", [
    ["Archie Y.", "Splashy and sweet", "Strawberry and watermelon combo is so refreshing."],
    ["Willow X.", "Lovely", "Smooth, sweet and juicy. Arrived fast to Sydney."],
    ["Charlie W.", "Great value", "Genuine device, works perfectly. Recommend."],
  ]),
  ...five("strawberry-ice", [
    ["Poppy V.", "Crisp and sweet", "Ripe strawberry with an icy exhale. Really nice."],
    ["George T.", "My favourite", "Clean flavour, smooth draw. Buying more."],
    ["Matilda S.", "Perfect", "Authentic product and quick shipping. Five stars."],
  ]),
  ...five("custom-5-pack", [
    ["Daniel R.", "Great deal", "Loved being able to pick my own five flavours. Great value pack."],
    ["Emily P.", "Perfect mix", "Got all my favourites in one order. Fast delivery, all sealed."],
    ["Thomas M.", "Highly recommend", "Best way to try a few flavours at once. Very happy with it."],
  ]),
];
