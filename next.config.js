/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "fr", "es", "am"], // Add the locales you want to support
    defaultLocale: "en", // Set the default locale
  },
  images: {
    domains: [
      "a.storyblok.com",
      "www.pngitem.com",
      "avatars.githubusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
