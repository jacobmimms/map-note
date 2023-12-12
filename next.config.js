/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mimms-pictures.s3.amazonaws.com'], // Set the allowed domains for images
    },
};

module.exports = nextConfig
