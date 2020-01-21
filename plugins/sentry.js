import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if (process.env.NODE_ENV === 'production')
    Raven
        .config('https://2d6c787b94d047baba44165e2852620c@sentry.ibecsystems.kz/43')
        .addPlugin(RavenVue, Vue)
        .install()