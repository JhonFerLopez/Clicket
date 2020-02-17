<template>
    <Page actionBarHidden="true" >    
        <StackLayout width="90%" height="100%">
            <StackLayout class="btn-button" width="100%"  height="10%">
                <Button :text="CategoryFilter.name" class="btn-modal" @tap="showCategoriesPageModally" />
            </StackLayout> 
            <StackLayout class="btn-button" width="100%"  height="10%">
                <Button :text="CityFilter.name" class="btn-modal" @tap="showCityPageModally"/>
            </StackLayout>
            <StackLayout height="85%">
                <ScrollView height="100%" scrollBarIndicatorVisible="false">
                    <WrapLayout orientation="horizontal" width="100%">
                        <StackLayout width="50%">
                            <StackLayout v-for="item2 in itemList2" :key="item2.id" width="100%">
                                <label :text="item2.name" height="10%"  horizontalAlignment="center"/>
                                <Image :src="urlPhoto+'/' + item2.picture" @tap="onItemTap(item2)" 
                                    stretch="aspectFill" loadMode="async" class="btn-image-expert" ></Image> 
                            </StackLayout>
                        </StackLayout>
                        <StackLayout width="50%">
                            <StackLayout v-for="item1 in itemList1" :key="item1.id" width="100%">
                                <label :text="item1.name" height="10%" horizontalAlignment="center"/>
                                <Image :src="urlPhoto+'/' + item1.picture" @tap="onItemTap(item1)" 
                                    stretch="aspectFill" loadMode="async" class="btn-image-expert" ></Image> 
                            </StackLayout>
                        </StackLayout>
                    </WrapLayout>
                </ScrollView>
                <!--
                <ListView for="item in itemList" @itemTap="onItemTap"  height="88%">
                    <v-template>
                        <FlexboxLayout flexDirection="column" width="100%" height="300">
                            <label :text="item.name" height="10%" />
                            <Image row="2" :src="urlPhoto+'/' + item.picture" 
                                stretch="aspectFill" height="120" 
                                class="btn-image" loadMode="async"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
                -->
            </StackLayout>  
        </StackLayout> 
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
                itemList1: [],
                itemList2 : [],
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
                    this.itemList1 = [];
                    this.itemList2 = [];
                    for(let i = 0; i < response.data.data.length; i++){
                        if(i % 2){
                            this.itemList1.push(response.data.data[i]);
                        }else{
                            this.itemList2.push(response.data.data[i]);
                        }
                    } 
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            onItemTap(event){
                /*const view = event.view;
                const page = view.page;
                const tappedItem = view.bindingContext;
                */
                //goToSection(this, ExpertProfile, {tappedItem}, "slide", true);
                
                
                this.$navigateTo(ExpertProfile, {
                    props: { 
                        context: event,//tappedItem,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .btn-modal{
        text-align: center;
        border-radius: 30%;
        background: #F2F2F2;
        border: solid 1px black;
    }
    .btn-image-expert{
        padding: 5%;
        border-radius: 100%;

    }

</style>