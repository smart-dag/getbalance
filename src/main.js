import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import VueCookies from 'vue-cookies'

import zhLocale from './locale/zh_CN';
import enLocale from './locale/en_US';

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueCookies)

// const navLang = navigator.language;
// const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
// const lang = (Vue.cookies.isKey('lang') ? Vue.cookies.get('lang') : false) || localLang || 'en_US';
const lang = (Vue.cookies.isKey('lang') ? Vue.cookies.get('lang') : false) || 'en_US';

Vue.config.lang = lang;

Vue.locale('zh_CN', zhLocale);
Vue.locale('en_US', enLocale);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
