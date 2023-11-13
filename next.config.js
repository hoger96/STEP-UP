/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
    // typedRoutes: true
  },
  cleanDistDir: true,
  async rewrites() {
    return [
      {
        source:'/stepup/api/:path*',
        destination: 'http://192.168.0.101:28080/stepup/api/:path*'
      }
    ]    
  }
}


 

module.exports = nextConfig