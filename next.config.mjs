/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    // If you are using headers in the next.config.js, make sure it's correctly configured
    return [
      {
        source: "/settings",
        headers: [
          {
            key: "x-custom-header",
            value: "my value",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "wordpress-1300035-4726928.cloudwaysapps.com",
      },
    ],
  },
};

export default nextConfig;
