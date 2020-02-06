<template>
    <page >
        <ActionBar>
            <NavigationButton @tap="navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="Clicket"></Label>
        </ActionBar>     
        <FlexboxLayout 
            flexDirection="column" 
            width="50%"            
        >      
            <Image row="2" :src="urlPhoto+'/' + datos.post_url" 
                tretch="aspectFill" height="120" 
                class="m-r-20" loadMode="async"/> 
            <Label :text="datos.title" textWrap="true" ></Label> 
            <Label :text="datos.description" textWrap="true" ></Label> 
        </FlexboxLayout>
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    
    export default {
        //Variables recibidas de la interfaz que la invoca 
        props: ["context"],
        //Variables
        data() {
            return {
                urlPhoto : this.$store.getters.getServerPhoto,
                datos : {}               
            };
        },
        //LLamado a Componentes
        created() {
            AuthAxiosToken(axios, this); 
            this.getDataSinglePost();
        },
        //Metodos de la Pagina
        methods: {           
            getDataSinglePost(){
                //Consumo de la Api
                console.log("Id Single Post "+this.context.id);
                axios
                .get(`${this.$store.getters.getServerPath}/auth/post?id=`+this.context.id)
                .then(response => {//Respuesta de la Api
                    this.datos = response.data.data; 
                    console.log("--> "+this.datos.id);   
                })
                .catch(response => {//Respuesta de la Api en Caso De Error
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