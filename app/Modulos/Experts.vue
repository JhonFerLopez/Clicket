<template>
    <Page actionBarHidden="true">    
        <GridLayout backgroundColor="red">            
            <FlexboxLayout flexDirection="column" >
                <Button :text="CategoryFilter.name" @tap="showCategoriesPageModally" />
                <Button :text="'Categorias_2'" @tap="showCategoriesPageModally" />
                <ScrollView orientation="vertical" class="scroll-height full-width">
                    <ListView for="item in itemList" @itemTap="onItemTap">
                        <v-template>
                            <FlexboxLayout flexDirection="column">
                                <label :text="item.name" />
                                <Image row="2" :src="urlPhoto+'/' + item.picture" 
                                    stretch="aspectFill" height="120" 
                                    class="m-r-20" loadMode="async"/>
                            </FlexboxLayout>
                        </v-template>
                    </ListView>   
                </ScrollView>
            </FlexboxLayout>            
        </GridLayout>  
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    import ModalCategories from './../components/ModalCategories'
    
    import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
    
    export default {
        data() {
            return {
                itemList: [],
                urlPhoto : this.$store.getters.getServerPhoto,
                CategoryFilter : {
                    id : 0,
                    name : "Selecione Uno",
                },
            };
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getExperts();            
        },
        methods: {
            //LLamado al Modal de Categorias
            showCategoriesPageModally() {
                this.$showModal(ModalCategories)
                .then(response => {
                    this.CategoryFilter.id =  response.id;
                    this.CategoryFilter.name =  response.name;
                });
            },
            //Consulta a los Expertos
            getExperts(){
                //Consumo de la Api
                axios
                .get(`${this.$store.getters.getServerPath}/auth/experts`)
                .then(response => {
                    this.itemList = response.data.data; 
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            }
        }
    }
</script>

<style scoped>

</style>