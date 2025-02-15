import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  unoptimized:true
 },
 env: {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
},
webpack: (config) => {
  config.externals = [...(config.externals || []), 'cloudinary'];
  return config;
},
};

export default nextConfig;
