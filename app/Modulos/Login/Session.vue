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
            <label class="text-label" text="¡ Hola de nuevo !" />
            <StackLayout class="input-field">
                <TextField
                    class="input input-rounded"
                    hint="Contraseña"
                    ref="password"
                    :isEnabled="!processing"
                    secure="true"
                    v-model="user.password"
                    returnKeyType="done"
                    @returnPress="submit"
                ></TextField>
            </StackLayout>
            <StackLayout class="btn-button">
                <Button
                    text="Continuar"
                    @tap="submit"
                    :isEnabled="!processing"
                    class="btn btn-primary" 
                ></Button>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";//Utilidades
    //Llamado a componentes
    import CLabel from './../../components/CLabel';

export default {
    //Variables
    data() {
        return {
            isLoggingIn: true,
            processing: false,
            role: this.$store.getters.getRole,
            user: {
                email: this.$store.getters.getLoginUser
                ? this.$store.getters.getLoginUser.email
                : "",
                password: ""
            }
        };
    },
    //Inicializador
    created() {
        AuthAxiosToken(axios, this);
    },
    //LLamado a Componentes
    components : {
        CLabel
    },
    //Metodos de la Pagina
    methods: {
        goBack() {
            goToSection(this, this.$router.login, {}, "slideRight", true);
        },
        focusPassword() {
            this.$refs.password.nativeView.focus();
        },
        submit() {//Submit: Verificacion de Contraseña
            if (!this.user.email || !this.user.password) {
                alert({
                title: "Campos requeridos",
                message: "Ingresa tus datos para iniciar sesión",
                okButtonText: "OK"
                });
                return;
            }
            this.processing = true;

            //consumo de Api
            axios
            .post(`${this.$store.getters.getServerPath}/auth/login`, {
                email: this.user.email,
                password: this.user.password,
                role: this.role
            },)
            .then(response => {//Respuesta de la Api

                //impresion en datos en Consola
                console.log(this.user.email);
                console.log(this.user.password);
                console.log("->Datos "+response.data.access_token+" <-");

                let token = `Bearer ${response.data.access_token}`;

                this.processing = false;

                //Almacenar token
                this.$store.dispatch("addToken", token);
                //Almacenar usuario
                this.$store.dispatch("addLoginUser", response.data.user);
                let user = response.data.user;

                console.log(user);
                if (user != null) {
                    goToSection(this, this.$router.welcome, {}, "fade", true);
                } 
            })
            .catch(err => {//Respuesta de la Api en Caso De Error
                this.processing = false;
                alert({
                    title: "Campos incorrectos",
                    message: "El email o contraseña son incorrectos",
                    okButtonText: "OK"
                });
            });
        } //Fin Submit  
    }
}
</script>

<style>

</style> 