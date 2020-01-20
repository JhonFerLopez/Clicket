//importacion de Librerias
import App from '~/Modulos/Login/Login.vue' // Rutas Incio de Aplicativo
import Session from "~/Modulos/Login/Session.vue";
import Welcome from "~/Modulos/Welcome.vue";

//Declaracion de Rutas con variables 
const routes = {
    login : App,
    session : Session,
    welcome : Welcome,
    text : 'Pruebas'
}

export default routes;// Retorno de Rutas