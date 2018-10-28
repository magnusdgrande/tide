import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/nb-NO'

import './registerServiceWorker'
const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional
Vue.use(require('vue-moment'))
Vue.use(ElementUI), { locale };

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
