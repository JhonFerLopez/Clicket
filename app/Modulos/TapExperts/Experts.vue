<template>
    <Page actionBarHidden="true" >    
        <FlexboxLayout flexDirection="column" height="100%" backgroundColor="#3c495e">            
            <Button :text="CategoryFilter.name" height="7%" @tap="showCategoriesPageModally" />
            <Button :text="CityFilter.name" height="7%" @tap="showCityPageModally" />
            <FlexboxLayout flexDirection="column" height="86%" backgroundColor="red"> 
                <ListView for="item in itemList" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="column">
                            <label :text="item.name" height="10%" />
                            <Image row="2" :src="urlPhoto+'/' + item.picture" 
                                stretch="aspectFill" height="120" 
                                class="m-r-20" loadMode="async"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </FlexboxLayout>           
        </FlexboxLayout>  
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection, isEmpty } from "~/../app/helpers/index.js";
    //LLamado a Componentes
    import ModalCategories from './../../components/ModalCategories'
    import ModalCity from './../../components/ModalCity'
    import ExpertProfile from "./ExpertProfile.vue";
    
    import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
    
    export default {
        //Variables
        data() {
            return {
                itemList: [],
                urlPhoto : this.$store.getters.getServerPhoto,
                CategoryFilter : {
                    id : 0,
                    name : "Categorias",
                },
                CityFilter : {
                    id : 0,
                    name : "Ciudad",
                },
                condicion: ""
            };
        },
        //Inicializador
        created() {
            AuthAxiosToken(axios, this);           
            this.getExperts();            
        },
        //Metodos de la Pagina 
        methods: {
            //LLamado al Modal de Categorias
            showCategoriesPageModally() {
                this.$showModal(ModalCategories)
                .then(response => {
                    this.CategoryFilter.id =  response.id;
                    this.CategoryFilter.name =  response.name;
                    this.getExperts();
                });
            },
            //LLamado al Modal de Ciudades
            showCityPageModally() {
                this.$showModal(ModalCity)
                .then(response => {
                    this.CityFilter.id =  response.id;
                    this.CityFilter.name =  response.name;
                    this.getExperts();
                });
            },
            //Consulta a los Expertos
            getExperts(){
                //Consumo de la Api
                this.condicion =  "";
                if(this.CategoryFilter.id > 0){
                    this.condicion = this.condicion+"cat_id="+this.CategoryFilter.id;
                }
                this.condicion += "&";
                if(this.CityFilter.id > 0){
                    this.condicion = this.condicion+"city_id="+this.CityFilter.id;
                }     
                console.log("Estas son condiciones "+this.condicion);           
                axios
                .get(`${this.$store.getters.getServerPath}/auth/experts?`+this.condicion)
                .then(response => {
                    this.itemList = response.data.data; 
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            onItemTap(event){
                const view = event.view;
                const page = view.page;
                const tappedItem = view.bindingContext;

                goToSection(this, ExpertProfile, {tappedItem}, "slide", true);
                
                /*
                this.$navigateTo(ExpertProfile, {
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
                */

            }
        }
    }
</script>

<style scoped>

</style>