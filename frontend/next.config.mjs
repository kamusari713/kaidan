/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's4.anilist.co',
				pathname: '/file/anilistcdn/**',
			},
			{
				protocol: 'https',
				hostname: 'cover.imglib.info',
				pathname: '/**',
			},
		],
	},
	swcMinify: true,
}

export default nextConfig
