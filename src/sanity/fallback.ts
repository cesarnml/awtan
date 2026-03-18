import type { HomepageDocument, HomepagePayload, SiteSettings } from "./types";

const fallbackSiteSettings: SiteSettings = {
  hotelName: "Awtan Sukhumvit Hotel",
  tagline: "Bangkok calm with a city pulse",
  navItems: [
    { label: "Story", href: "#story" },
    { label: "Rooms", href: "#rooms" },
    { label: "Facilities", href: "#facilities" },
    { label: "Offers", href: "#offers" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
    { label: "Future Rooms Page", href: "/rooms" },
  ],
  footerBlurb:
    "A warm, design-led city stay built for long weekends, quick business trips, and repeat guests who care about neighborhood energy as much as the room.",
  footerNote:
    "Homepage currently falls back to local sample content until Sanity is connected.",
  contactPhone: "+66 2 555 0199",
  contactEmail: "stay@awtanhotel.com",
  socialLinks: [
    { platform: "Instagram", href: "https://www.instagram.com/" },
    { platform: "Facebook", href: "https://www.facebook.com/" },
  ],
};

const fallbackHomepage: HomepageDocument = {
  seoTitle: "Awtan Sukhumvit Hotel | Boutique Bangkok Stay",
  seoDescription:
    "A Koon-inspired boutique hotel homepage with story-driven sections, offers, room teasers, facilities, reviews, and neighborhood contact details.",
  sections: [
    {
      _type: "heroSection",
      anchorId: "top",
      sectionLabel: "Stay in Sukhumvit",
      eyebrow: "Bangkok boutique hotel",
      title:
        "A warm city base shaped for short stays, long lunches, and easy nights out.",
      description:
        "Awtan blends calm guestrooms, soft service, and a walkable Sukhumvit address into a homepage structure ready for Sanity-managed content.",
      image: {
        alt: "Sunlit boutique hotel suite with warm wood tones and city views",
        image: {
          url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        },
      },
      primaryCta: { label: "Book your stay", href: "#contact" },
      secondaryCta: { label: "Explore rooms", href: "#rooms" },
      bookingCardTitle: "Plan the next arrival",
      bookingCardText:
        "Use this panel for booking engine links, best-rate messaging, rewards, or campaign CTAs.",
      bookingActions: [
        { label: "Best available rate", href: "/book" },
        { label: "Member offers", href: "#offers" },
      ],
    },
    {
      _type: "storySection",
      anchorId: "story",
      sectionLabel: "The hotel",
      title:
        "A neighborhood-first stay with the pace of Sukhumvit just outside the lobby.",
      description:
        "This section carries the hotel story, positioning, and a few proof points. It mirrors the editorial density of the Koon homepage without hard-coding the copy.",
      image: {
        alt: "Lounge corner with textured walls, modern seating, and warm ambient lighting",
        image: {
          url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",
        },
      },
      highlights: [
        "Walkable to BTS and neighborhood dining",
        "Quiet, layered interiors instead of generic business-hotel finishes",
        "Flexible for both short business trips and weekend city breaks",
      ],
    },
    {
      _type: "roomHighlightsSection",
      anchorId: "rooms",
      sectionLabel: "Rooms",
      title: "Room types that sell the stay before the full rooms page exists.",
      description:
        "Homepage room teasers should stand on their own now and still point naturally to a future `/rooms` route later.",
      rooms: [
        {
          title: "Deluxe King",
          summary:
            "A calm base with a lounge chair, city-facing windows, and enough space to settle in.",
          details: ["32 sqm", "King bed", "Work nook", "Rain shower"],
          image: {
            alt: "Deluxe king hotel room with large bed and natural daylight",
            image: {
              url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
            },
          },
          cta: { label: "View room", href: "/rooms" },
        },
        {
          title: "Corner Twin",
          summary:
            "Built for friends and flexible travel with extra daylight and a relaxed living feel.",
          details: ["34 sqm", "Twin beds", "Corner aspect", "Smart TV"],
          image: {
            alt: "Twin hotel room with warm wood furniture and large windows",
            image: {
              url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            },
          },
          cta: { label: "See details", href: "/rooms" },
        },
      ],
    },
    {
      _type: "amenitiesSection",
      anchorId: "facilities",
      sectionLabel: "Facilities",
      title: "Small but considered facilities that matter to real guests.",
      description:
        "Use this module to highlight the features that make the property feel complete without turning the page into a generic checklist.",
      amenities: [
        {
          title: "Rooftop dip pool",
          description:
            "A compact top-floor pool for late afternoon resets and skyline views.",
        },
        {
          title: "All-day cafe",
          description:
            "Coffee, breakfast, and easy lunches designed for guests and neighborhood walk-ins.",
        },
        {
          title: "Gym and recovery corner",
          description:
            "Cardio, weights, and a small stretch zone for guests staying in motion.",
        },
      ],
    },
    {
      _type: "offersSection",
      anchorId: "offers",
      sectionLabel: "Offers",
      title:
        "Campaign space for rewards, long-stay value, and seasonal booking pushes.",
      description:
        "These cards mirror the promotional rhythm of the reference site and give marketing room to rotate value props.",
      offers: [
        {
          kicker: "Member value",
          title: "Book direct and unlock late check-out",
          summary:
            "A simple reward-driven offer block for direct-booking positioning.",
          cta: { label: "Claim this offer", href: "/offers" },
        },
        {
          kicker: "City break",
          title: "Weekend stay with breakfast for two",
          summary:
            "Bundle breakfast, flexible arrival, and a neighborhood guide for short leisure stays.",
          cta: { label: "See package", href: "/offers" },
        },
      ],
    },
    {
      _type: "testimonialsSection",
      anchorId: "reviews",
      sectionLabel: "Guest feedback",
      title: "Reviews should feel like reassurance, not filler.",
      description:
        "A review band helps the homepage feel commercially complete before deeper page inventory exists.",
      testimonials: [
        {
          name: "Mina T.",
          origin: "Singapore",
          quote:
            "The location made everything easy, but the calm rooms were what made us extend our stay.",
          rating: 5,
        },
        {
          name: "Daniel R.",
          origin: "Sydney",
          quote:
            "It felt designed for actual travelers, not just for photos. Fast check-in, quiet nights, and great coffee downstairs.",
          rating: 5,
        },
      ],
    },
    {
      _type: "gallerySection",
      anchorId: "gallery",
      sectionLabel: "Visual highlights",
      title:
        "A gallery that sells atmosphere across interiors, rooms, and shared spaces.",
      description:
        "Sanity-managed images here should give marketing an easy place to refresh the homepage without redeploying layout code.",
      images: [
        {
          alt: "Boutique hotel lobby with warm lighting and textured surfaces",
          image: {
            url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
          },
          caption: "Lobby arrival",
        },
        {
          alt: "Hotel room detail with soft bedding and natural material palette",
          image: {
            url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
          },
          caption: "Guestroom mood",
        },
        {
          alt: "Rooftop or terrace hospitality scene at sunset",
          image: {
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
          },
          caption: "Evening atmosphere",
        },
      ],
    },
    {
      _type: "newsletterSection",
      anchorId: "news",
      sectionLabel: "Keep in touch",
      title: "Collect interest for launches, offers, and neighborhood updates.",
      description:
        "This v1 homepage uses a CTA pattern rather than a wired form so marketing can decide the final signup flow later.",
      helperText:
        "Plug in your email platform or CRM destination when the campaign stack is ready.",
      action: { label: "Join the mailing list", href: "/newsletter" },
    },
    {
      _type: "contactSection",
      anchorId: "contact",
      sectionLabel: "Contact",
      title: "Close with location confidence and direct booking contact.",
      description:
        "This final block gives the homepage an operational close: address, hours, contact, and a strong route into booking or inquiry.",
      addressLines: [
        "91 Sukhumvit Soi 31",
        "Khlong Toei Nuea, เขตวัฒนา",
        "Bangkok 10110",
      ],
      phone: "+66 2 555 0199",
      email: "stay@awtanhotel.com",
      hours: "Reservations daily, 08:00-22:00",
      mapLabel: "Open in Google Maps",
      mapHref: "https://maps.google.com/",
      primaryCta: {
        label: "Send an inquiry",
        href: "mailto:stay@awtanhotel.com",
      },
    },
  ],
};

export function getFallbackPayload(
  source: HomepagePayload["source"],
  notice: string,
): HomepagePayload {
  return {
    homepage: fallbackHomepage,
    siteSettings: fallbackSiteSettings,
    source,
    notice,
  };
}
