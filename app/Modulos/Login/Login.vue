<template>
  <Page actionBarHidden="true" >
    <FlexboxLayout
      flexDirection="column"
      backgroundColor="red"
      width="100%" 
      height="100%"
    >
      <Image class="logo-login" 
        backgroundColor="green" 
        with="100%" 
        height="70%" 
        src="~/assets/images/Clicket.png">
      </Image> 
      <TextField
        class="input-login"
        hint="Introduce tu email"
        :isEnabled="!processing"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        v-model="user.email"
        returnKeyType="next"
        @returnPress="submit"
        height="10%"
        width="10%"
      ></TextField>
      <Button
        text="Continuar"
        @tap="submit"
        :isEnabled="!processing"
        class="btn-button"
        height="10%"
        width="10%"
      ></Button>
      <label text="Al continuar, aceptas las condiciones del Servicio." 
        class="text" 
        height="10%"
        width="10%"/>
    </FlexboxLayout>
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
