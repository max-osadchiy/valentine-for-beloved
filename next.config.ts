import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/valentine-for-beloved', // Укажи имя репозитория, если сайт не на корневом домене
    images: { unoptimized: true } // Next.js требует это для экспорта
};

export default nextConfig;
