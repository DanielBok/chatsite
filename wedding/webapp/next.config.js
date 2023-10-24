/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatsite.sgp1.digitaloceanspaces.com",
        pathname: "/*",
        port: "",
      }
    ]
  }
};

module.exports = nextConfig;
