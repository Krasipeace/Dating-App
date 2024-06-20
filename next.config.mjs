/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 0 //default 30
        }
    }
};

export default nextConfig;
