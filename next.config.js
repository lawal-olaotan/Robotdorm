/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  transpilePackages:['framer-motion'],
  webpack(config) {
    config.module.rules.push({
      test: /\.(?:js|mjs|cjs)$/,
      use: ["babel-loader"],
    });

    return config;
  },
  images: {
    domains:['flagcdn.com']
  }
}

module.exports = nextConfig
