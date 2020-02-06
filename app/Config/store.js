import Vue from 'nativescript-vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //configuracion Api
    serverPhoto: "http://clicket.ziel.com.co/uploads",
    server: "http://clicket.ziel.com.co/api",
    role: 'driver',
    token: '',
    //Variables Globales
    user: {
      name: '',
      last_name: '',
      email: '',
    },
    logged: false,
  },
  //Funciones de Cambio de Estado
  mutations: { 
    ADD_TOKEN: (state, payload) => {
      state.token = payload
    },
    ADD_LOGIN_USER: (state, payload) => {
      state.user = payload
      state.logged = true
    },
    ADD_USER_EMAIL: (state, payload) => {
      state.user = {
        email: payload
      }
    },
    LOG_OUT: (state) => {
        state.logged = false
    },
  },
  //Funciones De Cambio de Valores del Componente
  actions: {
    addToken: (context, payload) => {
      context.commit('ADD_TOKEN', payload)
    },
    addLoginUser: (context, payload) => {
      context.commit('ADD_LOGIN_USER', payload)
    },
    addUserEmail: (context, payload) => {
      context.commit('ADD_USER_EMAIL', payload)
    },
    logOut: (context) => {
      context.commit('LOG_OUT')
    }
  },
  // Funciones que retornan Valores/Datos de lo Componentes
  getters: {
    getServerPhoto: state => state.serverPhoto,
    getServerPath: state => state.server,
    getToken: state => state.token,
    getLoginUser: state => state.user,
    getRole: state => state.role,
    isLogged: state => state.logged
  }
}); 

//Guarda todo en el Store para ser utilizado en el aplicativo con this.$store
Vue.prototype.$store = store; 

export default store; //Retorno de Store

