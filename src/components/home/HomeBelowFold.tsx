import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CustomerReviews } from "@/components/CustomerReviews";
import { HomeGuides } from "@/components/HomeGuides";
import { Faq } from "@/components/Faq";
import {
  HomeCompareHub,
  HomeIngotExplained,
  HomeIntroduction,
  HomeLatestBlog,
  HomeLatestReviews,
  HomeProductSpecs,
  HomeShippingTrust,
  HomeWhyChoose,
} from "@/components/home/HomeBrandSections";

/** Mobile-only flex order below the product grid; md:order-none keeps desktop DOM order. */
const mobileSection = {
  howItWorks: "order-1 md:order-none",
  features: "order-2 md:order-none",
  faq: "order-4 md:order-none",
  whyChoose: "order-5 md:order-none",
  compare: "order-6 md:order-none",
  guides: "order-7 md:order-none",
  shipping: "order-8 md:order-none",
  introduction: "order-9 md:order-none",
  ingot: "order-10 md:order-none",
  specs: "order-11 md:order-none",
  customerReviews: "order-12 md:order-none",
  latestReviews: "order-13 md:order-none",
  latestBlog: "order-14 md:order-none",
} as const;

/** Lazy-loaded homepage sections below the product grid. */
export default function HomeBelowFold() {
  return (
    <div className="flex flex-col">
      <div className={mobileSection.howItWorks}>
        <HowItWorks />
      </div>
      <div className={mobileSection.features}>
        <Features />
      </div>
      <div className={mobileSection.whyChoose}>
        <HomeWhyChoose />
      </div>
      <div className={mobileSection.introduction}>
        <HomeIntroduction />
      </div>
      <div className={mobileSection.ingot}>
        <HomeIngotExplained />
      </div>
      <div className={mobileSection.specs}>
        <HomeProductSpecs />
      </div>
      <div className={mobileSection.compare}>
        <HomeCompareHub />
      </div>
      <div className={mobileSection.guides}>
        <HomeGuides />
      </div>
      <div className={mobileSection.customerReviews}>
        <CustomerReviews />
      </div>
      <div className={mobileSection.latestReviews}>
        <HomeLatestReviews />
      </div>
      <div className={mobileSection.latestBlog}>
        <HomeLatestBlog />
      </div>
      <div className={mobileSection.faq}>
        <Faq />
      </div>
      <div className={mobileSection.shipping}>
        <HomeShippingTrust />
      </div>
    </div>
  );
}
