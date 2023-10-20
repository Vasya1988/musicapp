/** @type {import('next').NextConfig} */
const nextConfig = {
    // Что бы при запуске npm run build, собрать экспорт в папку out
    output: "export", 
    
    // Что бы указать корретный путь к css файлам на github
    assetPrefix: `/musicapp`, 
    basePath: '/musicapp'
}

module.exports = nextConfig
