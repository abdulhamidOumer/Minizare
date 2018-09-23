module.exports = {
    staticFileGlobs: [
        'build/index.html',
        'build/static/css/**.css',
        'build/static/js/**.js'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    handleFetch: false,
    runtimeCaching: [{
      urlPattern: /^https:\/\/restcountries\.eu\/data/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'flags-cache'
        }
    }
    }]
  }