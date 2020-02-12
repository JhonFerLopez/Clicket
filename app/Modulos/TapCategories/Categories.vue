<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%" width="90%">
            <ListView for="item in items" @itemTap="onItemTap">
                <v-template>
                    <GridLayout width="100%"
                        height="300" rows="auto" columns="*, *, *">
                        <Image :src="urlPhoto+'/' + item.image" 
                            row="0" colSpan="3"                            
                            stretch="aspectFill" 
                            height="120" 
                            class="btn-image" 
                            loadMode="async"/>
                        <Label :text="item.id+' -- '+item.name" textWrap="true" row="0"
                            colSpan="3" horizontalAlignment="center"
                            verticalAlignment="center" class="label-float"></Label>                        
                    </GridLayout>
                </v-template>
            </ListView>   
        </StackLayout>
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CLabel from './../../components/CLabel';
    import SubCategories from "./SubCategories.vue";

    export default {
        //Variables
        data() {
            return {
                datosInterests : [],
                info : "",
                urlPhoto : this.$store.getters.getServerPhoto,
                items : []
            };
        },
        //LLamado a Componentes
        components : {
            CLabel
        },
        //Inicializador
        created() {
            AuthAxiosToken(axios, this);           
            this.getCategories();
        },
        //Metodos de la Pagina    
        methods: { 
            getCategories(){
                //Consumo de la Api
                axios
                .get(`${this.$store.getters.getServerPath}/auth/tags`)
                .then(response => {//Respuesta de la Api
                    this.items = response.data.data;    
                })
                .catch(response => {//Respuesta de la Api en Caso De Error
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            onItemTap(event) {
                //goToSection(this, this.$router.subCategories, {index}, "fade", true);
                console.log("index "+event.index);
                const view = event.view;
                console.log("view "+event.view);
                const page = view.page;
                console.log("page "+view.page);
                const tappedItem = view.bindingContext;
                console.log("tappeditem "+view.bindingContext);             
                
                this.$navigateTo(SubCategories, {
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
            }
        },
        computed : {
        }
    }
</script>

<style scoped>

</style>