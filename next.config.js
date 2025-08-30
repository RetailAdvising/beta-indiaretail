/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["indiaretailing.go1cms.com", "https://", "via.placeholder.com", "vumbnail.com", 'img.youtube.com',"admin.stage.indiaretailing.com","admin.beta.indiaretailing.com"],
    unoptimized: true,
    // loader: 'custom',
    // loaderFile: './components/ImageLoader.js'
  },
  // output: 'export'
  // sassOptions: {
  //   includePaths: ['./styles'],
  //   // includePaths: [path.join(__dirname, 'styles')],
  //   prependData: `@import "@styles/Variable.scss";`,
  // }
  swcMinify: false, // it should be false by default 

  async redirects() {
    return [
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/:slug",
        permanent: true, // 301 redirect
      },
    ];
  },
}

module.exports = nextConfig
// module.exports = {target: 'serverless'}
