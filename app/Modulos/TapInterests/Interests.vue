<template>
    <page actionBarHidden="true">    
        <FlexboxLayout flexDirection="column" height="100%" backgroundColor="#3c495e">        
            <TextField
                class="input-login"
                hint="Buscar algún tema"
                autocorrect="false"
                autocapitalizationType="none"
                v-model="buscador"
                returnKeyType="next"
                @returnPress="submit"
                height="7%"
            ></TextField>
            
            <FlexboxLayout flexDirection="column" height="86%" backgroundColor="red">
                <ListView for="item in items" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="column">
                            <Image row="2" :src="urlPhoto+'/' + item.post_url" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>                     
            </FlexboxLayout>
            <Button :text="'Ver Mas ++'" height="7%" 
                :isEnabled="!processing" 
                @tap="getInteres"/>
        </FlexboxLayout>        
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
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
                    axios
                    .get(`${this.$store.getters.getServerPath}/auth/user/posts?page=`+this.numPagInt)
                    .then(response => {//Respuesta de la Api 
                        this.items = this.items.concat(response.data.pagination.data);
                        this.totNumPagInt = response.data.pagination.total;
                        this.numPagInt = this.numPagInt + 1;
                        if(this.totNumPagInt == response.data.pagination.to){
                            this.processing = true;
                        }
                    })
                    .catch(response => {//Respuesta de la Api en Caso De Error
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