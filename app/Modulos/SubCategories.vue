<template>
    <page actionBarHidden="true">        

        <ListView for="item in items" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="horizontal">
                    <Label :text="item.name" textWrap="true"></Label>
                </StackLayout>
            </v-template>
        </ListView>

    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    export default {
        props: ["index"],
        data: () => {
            return {
                items: []
            };
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getInteres();
            console.log(this.index);
        },
        methods: {
            getInteres(){
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
            onItemTap (args) {
//
                /*const view = args.view;
                const page = view.page;
                const tappedItem = view.bindingContext;

                this.$navigateTo(ItemDetails, {
                    props: { 
                        context: tappedItem,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }}});*/
            }
        }
    }
</script>

<style scoped>

</style>