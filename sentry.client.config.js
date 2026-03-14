import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://91e2ecbfbb27d4b3433e1c76c01989fc@o4504709842862080.ingest.us.sentry.io/4511041215987712",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
