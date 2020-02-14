<template>
    <Page actionBarHidden="true">                
        <StackLayout height="50%" class="modal">
            <StackLayout class="ActionBar titulo" width="100%" height="15%">
                <label text="Ciudades"/>
            </StackLayout> 
            <StackLayout width="100%" height="70%" >
                <ListView for="item in itemList" @itemTap="onItemTap" height="100%">
                    <v-template>
                        <FlexboxLayout flexDirection="column" width="100%" height="100">
                            <label row="2" :text="item.name" 
                                class="label_modal" height="10%" 
                                horizontalAlignment="left" 
                                verticalAlignment="center"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout> 
            <StackLayout class="" width="100%" height="15%">
                <Button text="Cancel" class="button-modal" @tap="$modal.close()" 
                    width="40%" height="auto"
                    horizontalAlignment="right" 
                    verticalAlignment="center"
                    >
                </Button>
            </StackLayout> 
        </StackLayout>  
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
                        name: "Ciudades"
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
                .get(`${this.$store.getters.getServerPath}/auth/countries`)
                .then(response => {
                    this.itemList = this.itemList.concat(response.data.data[0].cities); 
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
    .titulo{
        padding: 2%;
    }

    .modal{
        padding: 5%;
        border-radius: 1000%;
    }

    .label_modal{
        color: #000;
        font-size: 20; 
        padding: 12%;
        text-align: left;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
    }

    .button-modal{
        background: #ffffff;
        color: rgb(140, 112, 251);
        border: 0px;
        font-size: 15;
        border-radius: 10px;
        outline:none;
    }
</style>