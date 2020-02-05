//importacion de Librerias Modulos->Login
import App from '~/Modulos/Login/Login.vue' // Rutas Incio de Aplicativo
import Session from "~/Modulos/Login/Session.vue";
import Register from "~/Modulos/Login/Register.vue";
import Category from "~/Modulos/Login/Category.vue";

//importacion de Librerias Modulos
import Welcome from "~/Modulos/Welcome.vue";

//Declaracion de Rutas con variables 
const routes = {
    login : App,
    session : Session,
    register : Register,
    welcome : Welcome,
    category : Category,
    
    testeo : function(str) {
        console.log("Testeo Router "+str);
    }
}

export default routes;// Retorno de Rutas