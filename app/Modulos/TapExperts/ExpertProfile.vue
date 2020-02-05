<template>
    <page > 
        <ActionBar>
            <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="Clicketttt"></Label>
        </ActionBar>            
        <FlexboxLayout 
            flexDirection="column" 
            width="50%"            
        >      
            <Image row="2" :src="urlPhoto+'/' + expert.picture" 
                tretch="aspectFill" height="120" 
                class="m-r-20" loadMode="async"/> 
            <TextField
                class="input input-rounded"
                hint="Nombre Completo"
                autocorrect="false"
                autocapitalizationType="words"
                v-model="expert.name"
                returnKeyType="next"
            ></TextField> 
            <Label :text="this.expert.description" textWrap="true" ></Label> 
        </FlexboxLayout>        
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
            expert: []         
        };
    },
    //Inicializador
    created() {
        AuthAxiosToken(axios, this);           
        this.getExpert();            
    },
    //Metodos de la Pagina  
    methos: {
        getExpert(){
            axios
            .get(`${this.$store.getters.getServerPath}/auth/expert?id=`+this.context.id)
            .then(response => {
                this.expert = response.data.data; 
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

</style>