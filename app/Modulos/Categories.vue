<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical" class="scroll-height full-width">
            <ListView for="item in items" @itemTap="onItemTap(item)">
                <v-template>
                    <FlexboxLayout flexDirection="column">
                        <Label :text="item.name" textWrap="true" ></Label>
                        <Image src="~/assets/images/offer/deporte.png" ></Image>
                    </FlexboxLayout>
                </v-template>
            </ListView>   
        </ScrollView>
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CLabel from './../components/CLabel';

    export default {
        //Variables
        data() {
            return {
                datosInterests : [],
                info : "",
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
            this.getInteres();
        },
        //Metodos de la Pagina    
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
            onItemTap(index) {
                goToSection(this, this.$router.subCategories, {index}, "fade", true);
            }
        },
        computed : {
        }
    }
</script>

<style scoped>

</style>