<template>
    <page actionBarHidden="true">
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="false">
            <Button @tap="navigateBack" android.systemIcon="ic_menu_back"/>          
            <StackLayout class="form" width="100%">
                <GridLayout width="100%" height="auto" 
                        rows="auto" columns="*, *, *">
                    <Image :src="urlPhoto+'/' + expert.picture" 
                        loadMode="async" stretch="aspectFill" colSpan="3">
                    </Image> 
                    <Button text="<" class="go_back" width="120px"
                        horizontalAlignment="left" height="120px" 
                        verticalAlignment="top" @tap="navigateBack">
                    </Button>
                </GridLayout>  
                <StackLayout width="70%" horizontalAlignment="center">
                    <Label :text="expert.name" textWrap="true" class="text-label"></Label> 
                    <Label :text="expert.description+ ' Lorem Ipsum es simplemente un texto ficticio de la industria de impresión y composición tipográfica. Lorem Ipsum ha sido el texto ficticio estándar de la industria desde el año 1500, cuando una impresora desconocida tomó una galera de tipo y la mezcló para hacer un libro de muestras. Ha sobrevivido no solo cinco siglos, sino también el salto a la composición electrónica, permaneciendo esencialmente sin cambios. Se popularizó en la década de 1960 con el lanzamiento de las hojas de Letraset que contienen pasajes de Lorem Ipsum, y más recientemente con software de publicación de escritorio como Aldus PageMaker que incluye versiones de Lorem Ipsum. Lorem Ipsum es simplemente un texto ficticio de la industria de impresión y composición tipográfica. Lorem Ipsum ha sido el texto ficticio estándar de la industria desde el año 1500, cuando una impresora desconocida tomó una galera de tipo y la mezcló para hacer un libro de muestras. Ha sobrevivido no solo cinco siglos, sino también el salto a la composición electrónica, permaneciendo esencialmente sin cambios. Se popularizó en la década de 1960 con el lanzamiento de las hojas de Letraset que contienen pasajes de Lorem Ipsum, y más recientemente con software de publicación de escritorio como Aldus PageMaker que incluye versiones de Lorem Ipsum.'" 
                        textWrap="true" class="text-field texto"></Label> 
                    <StackLayout class="btn-button" width="100%"  height="10%">
                        <Button text="Contactar" class="btn btn-primary"></Button>
                    </StackLayout>
                </StackLayout> 
            </StackLayout>
        </ScrollView>
    </page>
</template>


<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";

export default {
    props: ["context"],
    //Variables
    data() {
        return { 
            urlPhoto : this.$store.getters.getServerPhoto,
            expert: {}         
        };
    },
    //Inicializador
    created() {
        AuthAxiosToken(axios, this);           
        this.getExpert();            
    },
    //Metodos de la Pagina  
    methods: {
        getExpert(){
            console.log("id Experto "+this.context.id);
            axios
            .get(`${this.$store.getters.getServerPath}/auth/expert?id=`+this.context.id)
            .then(response => {
                this.expert = response.data.data; 
            })
            .catch(response => {
                console.log(response.data);
                console.log(response.data.errors);
            });
        },
        navigateBack(){
            goToSection(this, this.$router.welcome, {}, "slideRight", true);
        }
    }
}
</script>

<style scoped>

</style>