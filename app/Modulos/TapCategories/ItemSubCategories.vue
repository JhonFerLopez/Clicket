<template>
    <Page >        
        <ActionBar>
            <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="Clicket"></Label>
        </ActionBar>
        <FlexboxLayout >          
            <FlexboxLayout flexDirection="column" backgroundColor="#FAD7D0">
                <Label class="m-10 h3" :text="context.name" verticalAlignment="top" ></Label>
                <Frame> 
                    <CButtonInterests :PDatos="context" />
                </Frame>
            </FlexboxLayout>
            <GridLayout>
                <ListView for="item in items" >
                    <v-template>
                        <FlexboxLayout flexDirection="column">
                            <Label :text="item.id+' -- '+item.title" textWrap="true" ></Label>
                            <Image row="2" :src="urlPhoto+'/' + item.post_url" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </GridLayout> 
        </FlexboxLayout >  
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    import CButtonInterests from './../../components/CButtonInterests';
    
    export default {
        props: ["context"],
        data() {
            return {
                items : [],
                urlPhoto : this.$store.getters.getServerPhoto,
            };
        },
        components : {
            CButtonInterests
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getItemSubCategories();            
        },
        methods: {
            getItemSubCategories(){
                //Consumo de la Api
                console.log("id de consulta "+this.context.id);
                axios
                .get(`${this.$store.getters.getServerPath}/auth/posts/tag?id=`+this.context.id)
                .then(response => {//Respuesta de la Api
                    console.log("Respuesta de la data "+response.data.data);
                    this.items = response.data.data;    
                })
                .catch(err => {
                    console.dir(err.response);
                    if (err.response.status == 422) {
                        alert({
                            title: "Error al crear usuario",
                            message: "Error al consultar los datos",
                            okButtonText: "OK"
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>