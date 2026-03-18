import {
  defineArrayMember,
  defineConfig,
  defineField,
  defineType,
} from "sanity";
import { structureTool } from "sanity/structure";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  "your-project-id";
const dataset =
  import.meta.env.VITE_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  process.env.PUBLIC_SANITY_DATASET ??
  "production";

console.info("[sanity-env][studio-config]", {
  VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID ?? null,
  VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET ?? null,
  VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION ?? null,
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID ?? null,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET ?? null,
  SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION ?? null,
  resolvedProjectId: projectId,
  resolvedDataset: dataset,
});

const singletonTypes = new Set(["homepage", "siteSettings"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const ctaFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "href",
    title: "Link target",
    type: "string",
    description: "Use anchors like #rooms or future paths like /offers.",
    validation: (rule) => rule.required(),
  }),
];

const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with alt text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required().min(8),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
});

const ctaLink = defineType({
  name: "ctaLink",
  title: "CTA link",
  type: "object",
  fields: ctaFields,
});

const navItem = defineType({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    ...ctaFields,
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
});

const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});

const sectionFields = [
  defineField({
    name: "anchorId",
    title: "Anchor ID",
    type: "string",
    description:
      "Used for homepage navigation links such as #rooms or #offers.",
  }),
  defineField({
    name: "sectionLabel",
    title: "Section label",
    type: "string",
  }),
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 4,
  }),
];

const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "bookingCardTitle",
      title: "Booking card title",
      type: "string",
    }),
    defineField({
      name: "bookingCardText",
      title: "Booking card text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bookingActions",
      title: "Booking actions",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
    }),
  ],
});

const roomCard = defineType({
  name: "roomCard",
  title: "Room card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaLink",
    }),
  ],
});

const storySection = defineType({
  name: "storySection",
  title: "Story",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});

const roomHighlightsSection = defineType({
  name: "roomHighlightsSection",
  title: "Room highlights",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "array",
      of: [defineArrayMember({ type: "roomCard" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const amenityItem = defineType({
  name: "amenityItem",
  title: "Amenity item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
});

const amenitiesSection = defineType({
  name: "amenitiesSection",
  title: "Amenities",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [defineArrayMember({ type: "amenityItem" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const offerCard = defineType({
  name: "offerCard",
  title: "Offer card",
  type: "object",
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaLink",
    }),
  ],
});

const offersSection = defineType({
  name: "offersSection",
  title: "Offers",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "offers",
      title: "Offers",
      type: "array",
      of: [defineArrayMember({ type: "offerCard" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Guest name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating out of 5",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
  ],
});

const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "testimonialItem" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const gallerySection = defineType({
  name: "gallerySection",
  title: "Gallery",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.min(2),
    }),
  ],
});

const newsletterSection = defineType({
  name: "newsletterSection",
  title: "Newsletter",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "helperText",
      title: "Helper text",
      type: "string",
    }),
    defineField({
      name: "action",
      title: "Action",
      type: "ctaLink",
    }),
  ],
});

const contactSection = defineType({
  name: "contactSection",
  title: "Contact",
  type: "object",
  fields: [
    ...sectionFields,
    defineField({
      name: "addressLines",
      title: "Address lines",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "string",
    }),
    defineField({
      name: "mapLabel",
      title: "Map label",
      type: "string",
    }),
    defineField({
      name: "mapHref",
      title: "Map link",
      type: "url",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
  ],
});

const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "storySection" }),
        defineArrayMember({ type: "roomHighlightsSection" }),
        defineArrayMember({ type: "amenitiesSection" }),
        defineArrayMember({ type: "offersSection" }),
        defineArrayMember({ type: "testimonialsSection" }),
        defineArrayMember({ type: "gallerySection" }),
        defineArrayMember({ type: "newsletterSection" }),
        defineArrayMember({ type: "contactSection" }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "hotelName",
      title: "Hotel name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "navItems",
      title: "Primary navigation",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Footer phone",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Footer email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});

export default defineConfig({
  name: "default",
  title: "Awtan Hotel CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document().schemaType("homepage").documentId("homepage"),
              ),
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
  ],
  schema: {
    types: [
      imageWithAlt,
      ctaLink,
      navItem,
      socialLink,
      roomCard,
      amenityItem,
      offerCard,
      testimonialItem,
      heroSection,
      storySection,
      roomHighlightsSection,
      amenitiesSection,
      offersSection,
      testimonialsSection,
      gallerySection,
      newsletterSection,
      contactSection,
      homepage,
      siteSettings,
    ],
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(
            (item) => item.action && singletonActions.has(item.action),
          )
        : prev,
  },
});
