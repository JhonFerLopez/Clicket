<template>
    <Page>
        <ActionBar class="ActionBar" flat="true">
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
            <Label text="" horizontalAlignment="center" />
        </ActionBar>
        <StackLayout class="form" width="90%">
            <label class="text-label" text="Completa estos datos para continuar" textWrap="true"/>
            <StackLayout class="input-field">
                <TextField
                    class="input input-rounded"
                    hint="Nombre Completo"
                    :isEnabled="!processing"
                    autocorrect="false"
                    autocapitalizationType="words"
                    v-model="user.name"
                    returnKeyType="next"
                    @returnPress="focusLastName"
                ></TextField>
            </StackLayout>
            <StackLayout class="input-field">
                <TextField
                    class="input input-rounded"
                    ref="password"
                    hint="Contraseña"
                    secure="true"
                    autocorrect="false"
                    v-model="user.password"
                    autocapitalizationType="none"
                    returnKeyType="next"
                    @returnPress="focusRePassword"
                ></TextField>
            </StackLayout>
            <StackLayout class="input-field">
                <TextField
                    class="input input-rounded"
                    ref="repassword"
                    hint="Repetir Contraseña"
                    secure="true"
                    v-model="user.repassword"
                    returnKeyType="done"
                    @returnPress="registerUser"
                ></TextField>
            </StackLayout>
            <StackLayout class="btn-button">
                <Button
                    text="Continuar"
                    @tap="registerUser"
                    :isEnabled="!processing"
                    class="btn btn-primary"
                ></Button>
            </StackLayout>
        </StackLayout>
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.   
    import axios from "axios";
    import { AuthAxiosToken, goToSection , isEmpty} from "~/../app/helpers/index.js";//Utilidades

    export default {
        //Variables
        data() {
            return {
                selectedIndex: 0,
                isLoggingIn: true,
                processing: false,
                user: {
                    name: "",
                    email: this.$store.getters.getLoginUser.email,
                    password: "",
                    repassword: ""
                }
            };
        },
        //Inicializador
        created() {
            AuthAxiosToken(axios, this);
        },
        //Metodos de la Pagina
        methods: {
            goBack() {//Regresar
                goToSection(this, this.$router.login, {}, "slideRight", true);
            },focusLastName() {//Nombre Completo
                this.$refs.lastname.nativeView.focus();
            },
            focusRePassword() {//Contraseña
                this.$refs.repassword.nativeView.focus();
            },
            registerUser() {//Registro de Usuario 
                //Validaciones
                if (isEmpty(this.user)) {
                    alert({
                        title: "Campos requeridos",
                        message: "Ingresa todos los datos para crear un usuario",
                        okButtonText: "OK"
                    });
                }else{
                    if (!(this.user.password === this.user.repassword)) {
                        alert({
                            title: "Contraseñas diferentes",
                            message: "Las contraseñas no coinciden",
                            okButtonText: "OK"
                        });
                    } else {
                        //Llamado al Api de Registro
                       axios
                        .post(`${this.$store.getters.getServerPath}/auth/signup`, {
                            name: this.user.name,
                            email: this.user.email,
                            password: this.user.password,
                            password_confirmation: this.user.repassword
                        })
                        .then(response => {
                            this.processing = true;
                            alert({
                                title: "Nuevo usuario",
                                message: response.data.message,
                                okButtonText: "OK"
                            }).then(() => {
                                let token = `Bearer ${response.data.access_token}`;
                                let user = response.data.user;
                                this.processing = false;

                                //Almacenar token
                                this.$store.dispatch("addToken", token);
                                //Almacenar usuario
                                this.$store.dispatch("addLoginUser", response.data.user);

                                console.log("Register.Vue-->ObjUser "+Object.values(user));

                                if (user != null) {
                                    goToSection(this, this.$router.category, {}, "fade", true);
                                }
                            });
                        })
                        .catch(err => {
                             console.dir(err.response);
                            if (err.response.status == 422) {
                                alert({
                                    title: "Error al crear usuario",
                                    message: "Este correo electrónico ya se encuentra en uso",
                                    okButtonText: "OK"
                                });
                            }
                        });                         
                    }
                }
            }//Fin registerUser
        }
    }
</script>

<style scoped>

</style>