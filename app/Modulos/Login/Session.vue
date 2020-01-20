<template>
    <Page>
        <ActionBar title="Registro De Usuario" >
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
            <ActionItem 
                ios.systemIcon="2" 
                android.systemIcon="ic_menu_edit" 
                ios.position="right"
                @tap="goBack"
            ></ActionItem>
        </ActionBar>    

        <StackLayout >
            <TextField
                class="input-password"
                hint="Contraseña"
                ref="password"
                :isEnabled="!processing"
                secure="true"
                v-model="user.password"
                returnKeyType="done"
                @returnPress="submit"
            ></TextField>
            <Button
                text="Ingresar"
                @tap="submit"
                :isEnabled="!processing"
                class="btn-green" 
            ></Button>
        </StackLayout>
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";//Ayudas
    //Llamado a componentes
    import CLabel from './../../components/CLabel';

export default {
    data() {//Variables
        return {
            isLoggingIn: true,
            processing: false,
            role: this.$store.getters.getRole,
            user: {
                email: this.$store.getters.getLoginUser
                ? this.$store.getters.getLoginUser.email
                : "",
                password: "andres.arcila@ziel.com.co"
            }
        };
    },
    created() {//Inicializador
        AuthAxiosToken(axios, this);
    },
    components : {//LLamado a Componentes
        CLabel
    },
    methods: {//Metodos de la Pagina
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

            axios
            .post(`${this.$store.getters.getServerPath}/auth/login`, {
                email: this.user.email,
                password: this.user.password,
                role: this.role
            },)
            .then(response => {

                //impresion en datos en Consola
                console.log(this.user.email);
                console.log(this.user.password);
                console.log(response.data);

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
            .catch(err => {
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