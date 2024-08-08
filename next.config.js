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
    domains:['flagcdn.com', 'ng.jumia.is','ke.jumia.is','tn.jumia.is','dz.jumia.is','gh.jumia.is','sn.jumia.is','ug.jumia.is','eg.jumia.is','ma.jumia.is','ci.jumia.is','za.jumia.is']
  }
}

module.exports = nextConfig
