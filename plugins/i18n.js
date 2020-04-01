import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fetch from 'isomorphic-fetch'

Vue.use(VueI18n)

export default async ({ app, store }) => {
  async function getLangs(url) {
    const [ru, kk, en] = await Promise.all([
      fetch(url + '/ru.json').then(res => res.json()),
      fetch(url + '/kk.json').then(res => res.json())
    ])

    return { ru, kk, en }
  }

  const isLoadedLangs = !!store.getters.langs
  const isDev = process.env.NODE_ENV === 'development'
  const PORT = process.env.PORT
  const APP_DOMAIN = process.env.APP_DOMAIN

  const langs = isLoadedLangs
    ? store.getters.langs
    : await getLangs(isDev
      ? 'http://localhost:3000/locales' //http://0.0.0.0:3000/locales
      : 'https://partner360.kz/locales')

  if (!isLoadedLangs)
    store.commit('setLangs', langs)

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'ru',
    messages: langs
  })


  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
