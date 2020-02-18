<template>
    <page actionBarHidden="true"> 
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="false">            
            <StackLayout class="form" width="80%">
                <StackLayout width="80%" height="50%"
                    horizontalAlignment="center"  
                    verticalAlignment="center">
                    <Image :src="urlPhoto+'/expert.png'" class="image-profile" 
                        loadMode="async" stretch="aspectFill"/>            
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
                        <Image :src="imagePassword" width="8%" horizontalAlignment="right"
                            height="100%" class="icon" @tap="getViewPassword" colSpan="3"/>
                    </GridLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <GridLayout width="100%" height="100%" 
                        rows="auto" columns="*, *, *">
                        <TextField
                            class="input input-rounded"
                            ref="password"
                            hint="Repetir Contraseña"
                            :secure="secureRepassword"
                            autocorrect="false"
                            v-model="user.repassword"
                            autocapitalizationType="none"
                            returnKeyType="next"
                            colSpan="3"
                        ></TextField>
                        <Image :src="imageRepassword" width="8%" horizontalAlignment="right"
                            height="100%" class="icon" @tap="getViewRepassword" colSpan="3"/>
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
            imagePassword: '~/assets/images/pass_false.png',
            imageRepassword: '~/assets/images/pass_false.png',
            securePassword: true,
            secureRepassword: true,
            urlPhoto : this.$store.getters.getServerPhoto,
            user: {
                name: this.$store.getters.getLoginUser.name,
                last_name: this.$store.getters.getLoginUser.last_name,
                email: this.$store.getters.getLoginUser.email,
                password: "",
                repassword: "",
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
                if (!(this.user.password === this.user.repassword)) {
                    alert({
                        title: "Contraseñas diferentes",
                        message: "Las contraseñas no coinciden",
                        okButtonText: "OK"
                    });
                } else {
                    axios
                    .post(`${this.$store.getters.getServerPath}/auth/user/edit`, {
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password
                    })
                    .then(response => {
                        alert({
                            title: "Actualización Exitosa",                        
                            okButtonText: "OK"
                        }).then(() => {
                            //Almacenar usuario
                            this.$store.dispatch("addLoginUser",this.user);
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
            }
        },
        getViewPassword(){
            this.securePassword = !this.securePassword;
            if(this.securePassword){
                this.imagePassword = '~/assets/images/pass_false.png'
            }else{
                this.imagePassword = '~/assets/images/pass_true.png'
            }
        }
        ,
        getViewRepassword(){
            this.secureRepassword = !this.secureRepassword;
            if(this.secureRepassword){
                this.imageRepassword = '~/assets/images/pass_false.png'
            }else{
                this.imageRepassword = '~/assets/images/pass_true.png'
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