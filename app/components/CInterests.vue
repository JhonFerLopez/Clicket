<template>
    <page actionBarHidden="true">      
        <RadListView ref="listView" 
            for="(detalle, index) in datos" 
            @itemTap="onItemTap" >
            <FlexboxLayout>
                <Label :text="detalle.name+'hoaalalalal'"></Label>  
                <Image src="~/assets/images/offer/automoviles.png"></Image> 
            </FlexboxLayout>
        </RadListView >
        <!---
        <ScrollView orientation="vertical" class="scroll-height full-width">
            <FlexboxLayout
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                class="full-width"
            >
                <StackLayout v-if="datos.length > 0">
                    <ListView for="detalle in datos" @itemTap="onItemTap" >
                        <StackLayout>
                            <FlexboxLayout>
                                <Label :text="detalle.name+'hoaalalalal'"></Label>  
                                <Image src="~/assets/images/offer/automoviles.png"></Image> 
                            </FlexboxLayout>
                        </StackLayout>
                    </ListView >
                </StackLayout>
            </FlexboxLayout>
        </ScrollView>
        -->
    </page>
</template>

<script>
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    
    export default {
        data() {
            return {
                datos : [],
                datosInterests : []
            };
        },
        created() {
            AuthAxiosToken(axios, this);
            this.getInteres();
        },
        methods: {//Metodos de la Pagina
            onItemTap(event) {
                //console.log(event.index)
                console.log(event.name)
            },
            getInteres(){
                axios
                .get(`${this.$store.getters.getServerPath}/tags`)
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