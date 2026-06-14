import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Restrict build tracing to this local directory to prevent scanning parent folders
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
