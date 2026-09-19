import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/Sudipta De Resume.pdf",
        destination: "/Sudipta De Resume.pdf",
        permanent: true,
      },
      {
        source: "/Sudipta De  \\[Resume\\].pdf",
        destination: "/Sudipta De Resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
