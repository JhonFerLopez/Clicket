//importacion de Librerias
import Vue from 'nativescript-vue'
import router from './Config/router'
import store from './Config/store'

//Vue.registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager"). PreviousNextView)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

//Guarda todo en el router para ser utilizado en el aplicativo con this.$router
Vue.prototype.$router = router;

//Inicializacion del Aplicativo
new Vue({
  store,
  render: h => h('frame', [h(router['login'])])
}).$start()


