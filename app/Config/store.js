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
    InterestPage: {
      paginationInterets: [],
      numPagInt: 1,
      totNumPagInt: 0,
    },
    //Variables Globales
    user: {
      name: 'Andres',
      last_name: 'Arcila',
      email: 'andres.arcila@ziel.com.co',
    }
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
    ADD_PAGINATION_INTERETS: (state, payload) => {
      state.InterestPage = {
        paginationInterets: payload
      }
    },
    ADD_NUM_PAG_INT: (state, payload) => {
      state.InterestPage = {
        numPagInt: payload
      }
    },
    ADD_TOT_NUM_PAG_INT: (state, payload) => {
      state.InterestPage = {
        totNumPagInt: payload
      }
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
    addPaginationInterets: (context, payload) => {
      context.commit('ADD_PAGINATION_INTERETS', payload)
    },
    addNumPagInt: (context, payload) => {
      context.commit('ADD_NUM_PAG_INT', payload)
    },
    addTotNumPagInt: (context, payload) => {
      context.commit('ADD_TOT_NUM_PAG_INT', payload)
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
    getInterestPage: state => state.InterestPage,
    isLogged: state => state.logged
  }
}); 

//Guarda todo en el Store para ser utilizado en el aplicativo con this.$store
Vue.prototype.$store = store; 

export default store; //Retorno de Store

