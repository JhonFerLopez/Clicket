<template>
  <Page actionBarHidden="true" xmlns:IQKeyboardManager="nativescript-iqkeyboardmanager">
    <FlexboxLayout
      class="gradient"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image class="logo-login" src="https://i0.wp.com/elpuntocristiano.org/wp-content/uploads/2015/10/reino.png?w=800"></Image>
     
        <StackLayout class="login-form">
          <StackLayout class="input-field">
            <TextField
              class="input-login"
              hint="Correo electrónico"
              :isEnabled="!processing"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.email"
              returnKeyType="next"
              @returnPress="submit"
            ></TextField>
          </StackLayout>
          <Button
            hint="button"
            text="Continuar"
            @tap="submit"
            :isEnabled="!processing"
            class="btn-button"
          ></Button>

          <!--componente : Recibe Propiedades -->
          <Frame>
            <CLabel :PText="user.email" />
          </Frame>
          
        </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
  //LLamado a Axios: Conexion API a BD.
  import axios from "axios";
  import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";//Funciones
  //Llamado a componentes
  import CLabel from './../../components/CLabel';

  export default {
    //Variables
    data() {
      return {
        isLoggingIn: true,
        processing: false,
        user: {
          email: this.$store.getters.getLoginUser
            ? this.$store.getters.getLoginUser.email
            : ""
        }        
      }
    },
    //LLamado a Componentes
    components : {
      CLabel
    },
    //Inicializador
    created() {
      AuthAxiosToken(axios, this);
    },
    //Metodos de la Pagina
    methods: {
      submit() {//Submit: Verificacion de Correo
        if (!this.user.email) {
          alert({
            title: "Campos requeridos",
            message: "Ingresa tus datos para iniciar sesión",
            okButtonText: "OK"
          });
          return;
        }
        console.log("inicio a axios "+this.$store.getters.getServerPath);
        this.processing = true;

        //consumo de Api
        axios
          .post(`${this.$store.getters.getServerPath}/auth/checkemail`, {
            email: this.user.email
          })
          .then(response => {//Respuesta de la Api
            console.log(response.data);
            
            this.processing = false;
            this.$store.dispatch("addUserEmail", this.user.email);

            if (response.data.exist == 0) {
              goToSection(this, this.$router.register, {}, "slideLeft", true);
            }
            if (response.data.exist == 1) {
              goToSection(this, this.$router.session, {}, "slideLeft", true);
            }
          })
          .catch(err => {//Respuesta de la Api en Caso De Error
            this.processing = false;
            console.log(err);
            console.log(err.response);
            alert({
              title: "Campos incorrectos",
              message: "El email es incorrecto",
              okButtonText: "OK"
            });
          });          
      }//Fin Submit
    }
  }
</script>

<style scoped>
</style>
