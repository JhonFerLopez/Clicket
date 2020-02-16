<template>
    <page actionBarHidden="true"> 
        <StackLayout width="90%" height="100%">
            <StackLayout class="textbutton" height="15%" width="100%">
                <GridLayout width="100%" height="100%" 
                        rows="auto" columns="*, *, *">      
                    <TextField
                        class="input input-rounded"
                        hint="Buscar algún tema"
                        autocorrect="false"
                        autocapitalizationType="none"
                        v-model="buscador"
                        returnKeyType="next"
                        @returnPress="getInteres"
                        height="60%" colSpan="3" width="100%"
                        horizontalAlignment="left"
                        verticalAlignment="center"
                    ></TextField>
                    <Image src="~/assets/images/search.png" width="8%" horizontalAlignment="right"
                        height="100%" class="icon" @tap="getInteres" colSpan="3"/>
                </GridLayout>
            </StackLayout>
            <GridLayout width="100%" height="85%" 
                        rows="auto" columns="*, *, *">
                <ListView for="item in items" @itemTap="onItemTap" height="100%" colSpan="3">
                    <v-template>
                        <FlexboxLayout flexDirection="column" width="100%" height="300">
                            <Image row="2" colSpan="3" :src="urlPhoto+'/' + item.post_url" 
                                stretch="aspectFill" height="120" class="btn-image" loadMode="async"/>
                        </FlexboxLayout>                    
                    </v-template>
                </ListView>
                <StackLayout class="btn-button" height="100%" colSpan="3" 
                    horizontalAlignment="right"
                    verticalAlignment="bottom">
                    <Button text="+" @tap="getInteres" class="btn-mas" ></Button>
                </StackLayout>
            </GridLayout>
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
                busquedaOld: "",
                search : "",
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
                //if(!this.processing){
                    //Buscador
                    if(this.buscador != this.busquedaOld && this.buscador != ""){
                        this.search = "&search=" + this.buscador;
                        this.numPagInt = 1;             
                        this.busquedaOld = this.buscador;           
                    }else if(this.buscador == "" && this.busquedaOld !=""){
                        this.search =  "";
                        this.busquedaOld = "";
                        this.numPagInt = 1;             
                    }else{
                        
                    }
                    console.log("Pagina "+this.numPagInt);
                    console.log("busqueda "+this.buscador);
                    console.log("search "+this.search);
                    axios
                    .get(`${this.$store.getters.getServerPath}/auth/user/posts?page=`+this.numPagInt+this.search)
                    .then(response => {//Respuesta de la Api 
                        console.log("Si hay datos");
                        if(response.data.page == 1){
                            this.items = response.data.data;
                        }else{
                            this.items = this.items.concat(response.data.data);
                        }
                        this.totNumPagInt = response.data.count;
                        this.numPagInt = this.numPagInt + 1;
                        if(response.data.page == response.data.pages){
                            this.processing = true;
                        }else{
                            this.processing = false;
                        }
                    })
                    .catch(response => {//Respuesta de la Api en Caso De Error
                        goToSection(this, this.$router.category, {}, "slideRight", true);                         
                        console.log(response.data);
                        console.log(response.data.errors);
                    });
                //}            
            },
            Pagination(){

            },
            submit(){

            }
        }
    }
</script>

<style scoped>
    .icon{
        margin-right: 30px;
    }
    .btn-mas{
        border-radius: 100%;
          background: rgb(140, 112, 251);
    }
</style>