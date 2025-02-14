import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/valentine-for-beloved', // Укажи имя репозитория, если сайт не на корневом домене
    assetPrefix: "/valentine-for-beloved", // Правильные пути для статических файлов
    images: { unoptimized: true } // Next.js требует это для экспорта
};

export default nextConfig;
