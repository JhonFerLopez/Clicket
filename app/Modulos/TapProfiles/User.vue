<template>
    <page actionBarHidden="true">             
        <FlexboxLayout 
            flexDirection="column" 
            width="50%"            
        >      
            <Image row="2" :src="urlPhoto+'/' + user.image" 
                tretch="aspectFill" height="120" 
                class="m-r-20" loadMode="async"/> 
            <TextField
                class="input input-rounded"
                hint="Nombre Completo"
                autocorrect="false"
                autocapitalizationType="words"
                v-model="user.name"
                returnKeyType="next"
            ></TextField> 
            <Label :text="this.user.email" textWrap="true" ></Label> 
            <Button :text="'Cerrar Sesión'" height="7%" @tap="getLogout"/> 
        </FlexboxLayout>        
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection, LogOut} from "~/../app/helpers/index.js";

export default {
    //Variables
    data() {
        return { 
            urlPhoto : this.$store.getters.getServerPhoto,
            user: {
                name: this.$store.getters.getLoginUser.name,
                last_name: this.$store.getters.getLoginUser.last_name,
                email: this.$store.getters.getLoginUser.email,
                password: "",
                image:""
            }           
        };
    },
    methods: {
        getLogout(){
            console.log("Peticion de Cierre");
            LogOut(axios, this, this.$router.login);
        }
    }
}
</script>

<style scoped>

</style>