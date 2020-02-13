<template>
    <Page actionBarHidden="true">
        <Button :text="ButtonText" @tap="onButtonTap" class="btnInteres" 
            horizontalAlignment="left" verticalAlignment="center">
        </Button>
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    console.log("Componente Button");
    export default {
        /* Propiedades
            text : PDatos
        */
        props: ["PDatos"],
        data() {//Variables
            return {
                msg : " hola ",                
                ButtonText : "",
                AgregarInteres : true
            }
        },
        created() {
            AuthAxiosToken(axios, this);  
            console.log("hola mundo Button");
            this.getEstadoButton();         
        },
        methods: {
            onButtonTap (event){
                //Consumo de la Api      
                if (this.AgregarInteres){   
                    var consume = "/auth/interest/add";
                    var message = "Se Agrego La Categoria ";
                }else{
                    var consume = "/auth/interest/remove";
                    var message = "Se Quita la Cartegoria ";
                }
                axios
                .post(`${this.$store.getters.getServerPath + consume}`, {
                    id: this.PDatos.id
                },)
                .then(response => {
                    if (this.AgregarInteres){   
                        this.AgregarInteres = false;
                        this.ButtonText = "Quitar De Mis Gustos";
                    }else{
                        this.AgregarInteres = true;
                        this.ButtonText = "Añadir A Mis Gustos";
                    }
                    alert({
                        title: "Registro Exitoso",
                        message: message + this.PDatos.name,
                        okButtonText: "Ok"
                    });
                })
                .catch(err => {//Respuesta de la Api en Caso De Error
                    var error = true;
                    this.processing = false;
                    alert({
                        title: "Error en Aplicativo",
                        message: "No se Pudo Procesar la Solicitud",
                        okButtonText: "ERROR"
                    });
                });
            },
            getEstadoButton (){   
                console.log("texto button "+this.ButtonText);             
                axios
                .get(`${this.$store.getters.getServerPath}/auth/interest/consult?id=`+this.PDatos.id)
                .then(response => {                    
                    console.log("Estado buton "+response.data.data);
                    if (response.data.data){   
                        this.AgregarInteres = false;
                        this.ButtonText = "Quitar De Mis Gustos";
                    }else{
                        this.AgregarInteres = true;
                        this.ButtonText = "Añadir A Mis Gustos";
                    }
                })
                .catch(err => {//Respuesta de la Api en Caso De Error
                    var error = true;
                    this.processing = false;
                    alert({
                        title: "Error en peticion",
                        message: "no se pudo consultar el estado del boton ",
                        okButtonText: "ERROR"
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .btnInteres{
        font-family: Roboto Condensed;
        background: rgb(140, 112, 251);
        color: rgb(253, 254, 254);
        border-radius: 30px;
        font-size: 20;
        font-weight: bold;
        text-transform: capitalize;
        height: 70%;
    }
</style>