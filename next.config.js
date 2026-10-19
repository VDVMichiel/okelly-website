/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // The site is a one-pager: these older standalone pages duplicated the
  // homepage sections (with outdated info). Send any existing inbound links
  // and Google rankings to the matching homepage section instead.
  async redirects() {
    return [
      { source: '/over', destination: '/#overons', permanent: true },
      { source: '/over/', destination: '/#overons', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/contact/', destination: '/#contact', permanent: true },
      { source: '/agenda', destination: '/#agenda', permanent: true },
      { source: '/agenda/', destination: '/#agenda', permanent: true },
    ];
  },
};

module.exports = nextConfig;