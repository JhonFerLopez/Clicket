<template>
    <page actionBarHidden="true">           
        <!--
<ScrollView orientation="vertical" class="scroll-height full-width">
    <FlexboxLayout
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        class="full-width"
    >
        <StackLayout v-if="datos.length > 0">
            <StackLayout v-for="detalle in datos" :key="detalle.id">
                <FlexboxLayout>
                    <Label :text="detalle.name"></Label>  
                    
                </FlexboxLayout>
            </StackLayout>
        </StackLayout>

    </FlexboxLayout>
</ScrollView>
    -->
        <StackLayout>
            <StackLayout v-for="detalle in datos" :key="detalle.id">
                
                    <Label :text="detalle.name"></Label>                 
                    <Image src="~/assets/images/offer/automoviles.png"></Image> 
                
            </StackLayout>  
        </StackLayout>

    </page>
</template>

<script>
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";

    export default {
        data() {
            return {
                datos : []
            };
        },
        created() {
            AuthAxiosToken(axios, this);
            this.getInteres();
        },
        methods: {//Metodos de la Pagina
            getInteres(){
                axios
                .get(`${this.$store.getters.getServerPath}/auth/interests`)
                .then(response => {
                    console.log("Datos-> "+response.data.data);
                    this.datos = response.data.data;    
                })
                .catch(response => {
                    console.log(response.data.errors);
                });
            }
        }
    }
</script>

<style scoped>

</style>