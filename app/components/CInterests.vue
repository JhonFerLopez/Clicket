<template>
    <page actionBarHidden="true">    
        <FlexboxLayout 
            flexDirection="column" 
            width="50%"            
        >          
            <TextField
                class="input-login"
                hint="buscador"
                autocorrect="false"
                autocapitalizationType="none"
                v-model="buscador"
                returnKeyType="next"
                @returnPress="submit"
            ></TextField>

        </FlexboxLayout>

        <ScrollView orientation="vertical" class="scroll-height full-width">
            <ListView for="item in items" @itemTap="onItemTap">
                <v-template>
                    <FlexboxLayout flexDirection="column">
                        <Label :text="item.titulo" textWrap="true" ></Label>
                        <Image src="~/assets/images/offer/turismo.png" ></Image>
                    </FlexboxLayout>
                </v-template>
            </ListView>   
        </ScrollView>
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CLabel from './CLabel';

    export default {
        //Variables
        data() {
            return {
                items : [],
                datosInterests : [],
                info : ""
            };
        },
        //Inicializador
        components : {
            CLabel
        },
        //LLamado a Componentes
        created() {
            AuthAxiosToken(axios, this); 
            this.getInteres();
        },
        //Metodos de la Pagina
        methods: {            
            onItemTap(payload) {
                var acction = this.validaInteres(payload.id);
                if(acction[0]){
                    this.datosInterests.push({
                        id : payload.id ,  title : payload.title
                    })
                }else{
                    this.datosInterests.splice(acction[1],1);
                }                
            },
            validaInteres(index) { //Validacion de datos Repetidos 
                let adicionar = [true, 0] ;
                var i = 0 ;
                for(const datos of this.datosInterests){
                    if(datos.id == index){
                        adicionar[0] = false;
                        adicionar[1] = i;
                    }
                    i++;
                }
                return adicionar;
            },            
            getInteres(){
                //Consumo de la Api
                axios
                .get(`${this.$store.getters.getServerPath}/auth/posts`)
                .then(response => {//Respuesta de la Api
                    this.items = response.data.data;    
                })
                .catch(response => {//Respuesta de la Api en Caso De Error
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            submit(){

            }
        },
        //Metodos de Ejecuciones Automaticas y Constante.
        computed : {
            CategoriaSeleccionada(){
                this.info = "";
                for(const datos of this.datosInterests){
                    if(this.info == ""){
                        this.info = datos.title;
                    }
                    else{
                        this.info = this.info + ", " + datos.title;
                    }
                }
                return this.info;
            }
        }
    }
</script>

<style scoped>

</style>