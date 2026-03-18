export type CtaLink = {
  _key?: string;
  label: string;
  href: string;
};

export type NavItem = CtaLink & {
  description?: string;
};

export type SocialLink = {
  _key?: string;
  platform: string;
  href: string;
};

export type CMSImage =
  | {
      _type?: "image";
      asset?: {
        _ref?: string;
        _type?: "reference";
      };
      crop?: unknown;
      hotspot?: unknown;
    }
  | {
      url: string;
    };

export type ImageWithAlt = {
  _key?: string;
  image?: CMSImage;
  alt: string;
  caption?: string;
};

export type SectionBase = {
  _key?: string;
  _type: string;
  anchorId?: string;
  sectionLabel?: string;
  title: string;
  description?: string;
};

export type HeroSection = SectionBase & {
  _type: "heroSection";
  eyebrow?: string;
  image?: ImageWithAlt;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  bookingCardTitle?: string;
  bookingCardText?: string;
  bookingActions?: CtaLink[];
};

export type StorySection = SectionBase & {
  _type: "storySection";
  image?: ImageWithAlt;
  highlights?: string[];
};

export type RoomCard = {
  _key?: string;
  title: string;
  summary?: string;
  image?: ImageWithAlt;
  details?: string[];
  cta?: CtaLink;
};

export type RoomHighlightsSection = SectionBase & {
  _type: "roomHighlightsSection";
  rooms?: RoomCard[];
};

export type AmenityItem = {
  _key?: string;
  title: string;
  description?: string;
};

export type AmenitiesSection = SectionBase & {
  _type: "amenitiesSection";
  amenities?: AmenityItem[];
};

export type OfferCard = {
  _key?: string;
  kicker?: string;
  title: string;
  summary?: string;
  cta?: CtaLink;
};

export type OffersSection = SectionBase & {
  _type: "offersSection";
  offers?: OfferCard[];
};

export type TestimonialItem = {
  _key?: string;
  name: string;
  origin?: string;
  quote: string;
  rating?: number;
};

export type TestimonialsSection = SectionBase & {
  _type: "testimonialsSection";
  testimonials?: TestimonialItem[];
};

export type GallerySection = SectionBase & {
  _type: "gallerySection";
  images?: ImageWithAlt[];
};

export type NewsletterSection = SectionBase & {
  _type: "newsletterSection";
  helperText?: string;
  action?: CtaLink;
};

export type ContactSection = SectionBase & {
  _type: "contactSection";
  addressLines?: string[];
  phone?: string;
  email?: string;
  hours?: string;
  mapLabel?: string;
  mapHref?: string;
  primaryCta?: CtaLink;
};

export type HomepageSection =
  | HeroSection
  | StorySection
  | RoomHighlightsSection
  | AmenitiesSection
  | OffersSection
  | TestimonialsSection
  | GallerySection
  | NewsletterSection
  | ContactSection;

export type HomepageDocument = {
  _id?: string;
  _type?: "homepage";
  seoTitle?: string;
  seoDescription?: string;
  sections: HomepageSection[];
};

export type SiteSettings = {
  _id?: string;
  _type?: "siteSettings";
  hotelName: string;
  tagline?: string;
  navItems: NavItem[];
  footerBlurb?: string;
  footerNote?: string;
  contactPhone?: string;
  contactEmail?: string;
  socialLinks: SocialLink[];
};

export type HomepagePayload = {
  homepage: HomepageDocument;
  siteSettings: SiteSettings;
  source: "sanity" | "config-missing" | "content-missing" | "query-error";
  notice?: string;
};
