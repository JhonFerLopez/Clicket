<template>
    <Page>
        <ActionBar title="Registro De Usuario" >
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
        </ActionBar>
        <StackLayout >
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
            <TextField
                class="input input-rounded"
                ref="repassword"
                hint="Repetir Contraseña"
                secure="true"
                v-model="user.repassword"
                returnKeyType="done"
                @returnPress="registerUser"
            ></TextField>

            <Button
                text="Finalizar"
                @tap="registerUser"
                :isEnabled="!processing"
                class="btn-green"
            ></Button>

        </StackLayout>

    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.   
    import axios from "axios";
    import { AuthAxiosToken, goToSection , isEmpty} from "~/../app/helpers/index.js";//Ayudas

    export default {
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
        created() {//Inicializador
            AuthAxiosToken(axios, this);
        },
        computed: {
            message() {
                return this.$store.getters.getMessage;
            },
            errors() {
                return errors;
            }
        },
        methods: {//Metodos de la Pagina
            goBack() {//Regresar
                goToSection(this, this.$router.login, {}, "slideRight", true);
            },focusLastName() {//Nombre Completo
                this.$refs.lastname.nativeView.focus();
            },
            focusRePassword() {//Contraseña
                this.$refs.repassword.nativeView.focus();
            },
            registerUser() {
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