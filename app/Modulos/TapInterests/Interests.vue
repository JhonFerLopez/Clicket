<template>
    <page actionBarHidden="true"> 
        <StackLayout width="90%" height="100%">
            <StackLayout class="textbutton" height="15%" width="100%">
                <FlexboxLayout alignItems="flex-start">       
                    <TextField
                        class="input input-rounded"
                        hint="Buscar algún tema"
                        autocorrect="false"
                        autocapitalizationType="none"
                        v-model="buscador"
                        returnKeyType="next"
                        @returnPress="submit"
                        width="70%"
                        height="50%" 
                        horizontalAlignment="left"
                        verticalAlignment="center"
                    ></TextField>
                    <Button text="Buscar" class="lupa" width="30%"
                        horizontalAlignment="right" height="50%"
                        verticalAlignment="center" 
                        :isEnabled="!processing" 
                        @tap="getInteres">
                    </Button>
                </FlexboxLayout>
            </StackLayout>
            <StackLayout height="85%">
                <ListView for="item in items" @itemTap="onItemTap" height="88%">
                    <v-template>
                        <FlexboxLayout flexDirection="column" width="100%" height="300">
                            <Image row="2" :src="urlPhoto+'/' + item.post_url" stretch="aspectFill" height="120" class="btn-image" loadMode="async"/>
                        </FlexboxLayout>                    
                    </v-template>
                </ListView>                    
            </StackLayout>
            <StackLayout class="btn-button" height="12%">
                <Button text="Ver Mas" @tap="getInteres" class="btn btn-primary"></Button>
            </StackLayout>
        </StackLayout>       
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection, isEmpty } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CLabel from './../../components/CLabel';
    import SinglePost from "./SinglePost.vue";

    export default {
        //Variables
        data() {
            return {
                items : [],
                numPagInt: 1,
                totNumPagInt: 0,
                urlPhoto : this.$store.getters.getServerPhoto,
                buscador : "",
                processing: false,
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
            onItemTap(event) {  
                const view = event.view;
                const page = view.page;
                const tappedItem = view.bindingContext;
                
                this.$navigateTo(SinglePost, {
                    props: { 
                        context: tappedItem,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    }
                });              
            },           
            getInteres(){
                //Consumo de la Api
                if(!this.processing){
                    console.log("Consulta Datos");
                    console.log("Pruebas "+this.buscador);
                    if(this.buscador){

                    }
                    axios
                    .get(`${this.$store.getters.getServerPath}/auth/user/posts?page=`+this.numPagInt)
                    .then(response => {//Respuesta de la Api 
                        console.log("Consulta Datos "+response.data.count);
                        this.items = this.items.concat(response.data.data);
                        this.totNumPagInt = response.data.count;
                        this.numPagInt = this.numPagInt + 1;
                        if(response.data.page == response.data.pages){
                            this.processing = true;
                        }
                    })
                    .catch(response => {//Respuesta de la Api en Caso De Error
                        goToSection(this, this.$router.category, {}, "slideRight", true);                         
                        console.log(response.data);
                        console.log(response.data.errors);
                    });
                }            
            },
            Pagination(){

            },
            submit(){

            }
        }
    }
</script>

<style scoped>

</style>