// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination: process.env.DESTINATION_URL,
        },
      ];
    }
    else {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination: process.env.DESTINATION_URL,
        },
      ];
    }
  },
}
