const path = require('path')
const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles'), path.join(__dirname, 'public')],
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`
  },
  webpack(config) {
    // Disabling css module style
    config.module.rules[3].oneOf.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return;
      one.issuer.and = [path.resolve(__dirname)];
    });
    // Svgr module
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ['localhost', ""]
  }
}

module.exports = nextTranslate(nextConfig)
