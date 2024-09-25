/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: "http://localhost:3000",
    JWT_KEY: "question_app_jwt",
  },
};

export default nextConfig;
