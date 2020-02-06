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
                urlPhoto : this.$store.getters.getServerPhoto,
                buscador : "",
                processing: false,
                InterestPage: {
                    paginationInterets: [
                        this.$store.getters.getInterestPage
                        ? this.$store.getters.getInterestPage.paginationInterets
                        : ""
                    ],
                    numPagInt: this.$store.getters.getInterestPage.numPagInt > 0 
                        ? this.$store.getters.getInterestPage.numPagInt
                        : 1,
                    totNumPagInt: this.$store.getters.getInterestPage.totNumPagInt > 0
                        ? this.$store.getters.getInterestPage.totNumPagInt
                        : 0,
                }
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
                console.log("Antes Pagina Numero "+this.InterestPage.numPagInt);
                console.log("Antes Total Paginas "+this.InterestPage.totNumPagInt);
                axios
                .get(`${this.$store.getters.getServerPath}/auth/user/posts?page=`+this.InterestPage.numPagInt)
                .then(response => {//Respuesta de la Api 
                    console.log("from Pagina from "+response.data.pagination.from);
                    console.log("Antes Pagina Numero "+this.InterestPage.numPagInt);
                    console.log("Antes Total Paginas "+this.InterestPage.totNumPagInt);                    
                    console.log("Data Pagina Numero "+response.data.pagination.current_page);
                    console.log("Data Total Paginas "+response.data.pagination.total);
                    this.InterestPage.paginationInterets = this.InterestPage.paginationInterets.concat(response.data.pagination.data);
                    this.InterestPage.numPagInt = response.data.pagination.current_page+1;
                    this.InterestPage.totNumPagInt = response.data.pagination.total;
                    this.$store.dispatch("addInteretsPagination",this.InterestPage);

                    
                    this.items = this.$store.getters.getInterestPage.paginationInterets;
                    console.log("Despues Pagina Numero "+this.$store.getters.getInterestPage.numPagInt);
                    console.log("Despues Total Paginas "+this.$store.getters.getInterestPage.totNumPagInt);
                })
                .catch(response => {//Respuesta de la Api en Caso De Error
                    console.log(response.data);
                    console.log(response.data.errors);
                });
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