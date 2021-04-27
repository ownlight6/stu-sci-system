import Vue from 'vue'
import App from './App.vue'
import router from "./router"

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./static/base.css"
import "./static/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
