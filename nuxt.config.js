const pkg = require('./package')
const dir = "/"

module.exports = {
  mode: 'spa',
  cache: true,

  /*
  ** Headers of the page
  */
  head: {    
    title: 'JTI Partner 360',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v2' }

    ],
    script: [
      {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js'},
      {
        src:"https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js",
        integrity:"sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA",
        crossorigin:"anonymous", defer:true
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/index.scss',
    'vue-multiselect/dist/vue-multiselect.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~plugins/bootstrap.js',
    '~plugins/vue-select.js',
    '~plugins/vue-signature.js',
    '~plugins/vee-validate.js',
    '~plugins/vue-swiper.js',
    '~plugins/sentry.js',
    '~/plugins/axios.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
  ],

  manifest: {      
    lang: 'en',
    name: 'JTI Partner 360',
    short_name: 'JTI Partner 360',
    start_url:`/`,      
    display: 'standalone',     
  },

  workbox: {
    development: true // or use a global variable to track the current NODE_ENV, etc to determine dev mode
  },
  /*
  ** Axios module configuration
  */

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.NODE_ENV === 'development' ? 'http://jti.ibec.systems/api/v1' : 'https://backend.partner360.kz/api/v1',
  },


  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // }

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
