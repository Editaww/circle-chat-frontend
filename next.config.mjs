/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // SERVER_URL: "http://localhost:3000",
    SERVER_URL: "https://travel-spot-api.onrender.com",

    JWT_KEY: "question_app_jwt",
  },
};

export default nextConfig;
