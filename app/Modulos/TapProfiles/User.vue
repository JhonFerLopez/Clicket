<template>
    <page actionBarHidden="true"> 
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="false">            
            <StackLayout class="form" width="80%">
                <StackLayout width="80%" height="50%"
                    horizontalAlignment="center"  
                    verticalAlignment="center">
                    <Image :src="urlPhoto+'/expert.png'" class="image-profile" 
                        loadMode="async" stretch="aspectFill" background="red"/>            
                </StackLayout>
                <StackLayout class="input-field">
                    <Label :text="this.user.email" textWrap="true" horizontalAlignment="center" ></Label> 
                    <TextField
                        class="input input-rounded"
                        hint="Nombre Completo"
                        autocorrect="false"
                        autocapitalizationType="words"
                        v-model="user.name"
                        returnKeyType="next"
                    ></TextField>
                </StackLayout>
                <StackLayout class="input-field">
                    <GridLayout width="100%" height="100%" 
                        rows="auto" columns="*, *, *">
                        <TextField
                            class="input input-rounded"
                            ref="password"
                            hint="Contraseña"
                            :secure="securePassword"
                            autocorrect="false"
                            v-model="user.password"
                            autocapitalizationType="none"
                            returnKeyType="next"
                            colSpan="3"
                        ></TextField>
                        <Image :src="image" width="8%" horizontalAlignment="right"
                            height="100%" class="icon" @tap="getViewPassword" colSpan="3"/>
                    </GridLayout>
                </StackLayout>
                <StackLayout class="btn-button" height="10%">
                    <Button :text="'Guardar'"  height="100%" @tap="getUpdate" class="btn btn-primary"/>
                </StackLayout>
                <StackLayout class="btn-button" height="10%">
                    <Button :text="'Cerrar Sesión'" height="100%" @tap="getLogout" class="btn btn-primary"/> 
                </StackLayout>
            </StackLayout>    
        </ScrollView>
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
            image: '~/assets/images/pass_false.png',
            securePassword: true,
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
    //Inicializador
    created() {
        AuthAxiosToken(axios, this);
    },
    methods: {
        getLogout(){
            console.log("Peticion de Cierre");
            LogOut(axios, this, this.$router.login);
        },
        getUpdate(){
            if(this.user.name != ""){
                axios
                .post(`${this.$store.getters.getServerPath}/auth/user/edit`, {
                    name: this.user.name,
                    email: this.user.email
                })
                .then(response => {
                    this.processing = true;
                    alert({
                        title: "Actualización Exitosa",                        
                        okButtonText: "OK"
                    }).then(() => {
                        let user = response.data.user;
                        //Almacenar usuario
                        this.$store.dispatch("addLoginUser", response.data.user);
                    });
                })
                .catch(err => {
                        console.dir(err.response);
                    if (err.response.status == 422) {
                        alert({
                            title: "Error al Actualizar usuario",
                            message: "Problemas al actualizar el usuario",
                            okButtonText: "Error"
                        });
                    }
                });
            }
        },
        getViewPassword(){
            console.log("hola mundo  --> "+this.image);
            this.securePassword = !this.securePassword;
            if(this.securePassword){
                this.image = '~/assets/images/pass_false.png'
            }else{
                this.image = '~/assets/images/pass_true.png'
            }
        }
    }
}
</script>

<style scoped>
    .image-profile{
        border-radius: 130%;
    }
    .icon{
        margin-right: 30px;
    }
</style>