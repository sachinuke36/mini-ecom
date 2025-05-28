import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://mini-ecom-5r93.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
