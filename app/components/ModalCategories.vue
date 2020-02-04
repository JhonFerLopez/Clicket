<template>
    <Page actionBarHidden="true">                
        <GridLayout backgroundColor="green">
            <ScrollView orientation="vertical" class="scroll-height full-width">
                <ListView for="item in itemList" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="column">
                            <label row="2" :text="item.id" />
                            <label row="2" :text="item.name" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </ScrollView>
        </GridLayout>  
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";

    export default {
        
        data() {
            return {
                itemList : [{
                        id: 0,
                        name: "Selecciona Uno"
                    }]
            };
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getCategories();            
        },
        methods: {
            onItemTap(event) {
                const view = event.view;
                const page = view.page;
                const tappedItem = view.bindingContext;
                this.$modal.close(tappedItem);
            },
            getCategories(){
                //Consumo de la Api
                 axios
                .get(`${this.$store.getters.getServerPath}/auth/tags`)
                .then(response => {
                    this.itemList = this.itemList.concat(response.data.data);  
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            }
        }
    }
</script>