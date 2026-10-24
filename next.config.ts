import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Photos des logements servies par le S3 d'OpenClassrooms (URLs renvoyées par l'API)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/course.oc-static.com/**",
      },
    ],
  },
};

export default nextConfig;
