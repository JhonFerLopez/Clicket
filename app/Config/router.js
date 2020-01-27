//importacion de Librerias Modulos->Login
import App from '~/Modulos/Login/Login.vue' // Rutas Incio de Aplicativo
import Session from "~/Modulos/Login/Session.vue";
import Register from "~/Modulos/Login/Register.vue";

//importacion de Librerias Modulos
import Welcome from "~/Modulos/Welcome.vue";
import Category from "~/Modulos/Category.vue";
import Categories from "~/Modulos/Categories.vue";
import SubCategories from "~/Modulos/SubCategories.vue";


//Declaracion de Rutas con variables 
const routes = {
    login : App,
    session : Session,
    register : Register,
    welcome : Welcome,
    category : Category,
    categories : Categories,
    subCategories : SubCategories,
    testeo : function(str) {
        console.log("Testeo Router "+str);
    }
}

export default routes;// Retorno de Rutas