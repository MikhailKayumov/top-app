module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['courses-top.ru']
  },
  webpack(config) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      test: /\.svg$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{ removeViewBox: false }]
        },
        titleProp: true
      },
    })

    return config;
  }
}
