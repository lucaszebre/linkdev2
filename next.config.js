/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Supabase storage host used for profile pictures
    remotePatterns: [
      { protocol: 'https', hostname: 'rrqmpgpvlhaxsozwlntq.supabase.co' },
    ],
  },
};

module.exports = nextConfig;
