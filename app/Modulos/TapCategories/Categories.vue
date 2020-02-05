<template>
    <Page actionBarHidden="true">
        <!--<ScrollView orientation="vertical" class="scroll-height full-width">-->
            <ListView for="item in items" @itemTap="onItemTap">
                <v-template>
                    <FlexboxLayout flexDirection="column">
                        <Label :text="item.id+' -- '+item.name" textWrap="true" ></Label>
                        <Image row="2" :src="urlPhoto+'/' + item.image" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>
                    </FlexboxLayout>
                </v-template>
            </ListView>   
        <!--</ScrollView>-->
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