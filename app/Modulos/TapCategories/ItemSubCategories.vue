<template>
    <Page >        
        <ActionBar class="ActionBar" flat="true">
            <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="CLICKET" horizontalAlignment="center" />
        </ActionBar> 
        <StackLayout width="90%" height="100%">
            <StackLayout class="textbutton" height="8%" width="100%">
                <Frame>
                    <CLabel :PText="context.name" />
                </Frame>
                <!--<Label class="m-10 h3" :text="context.name" verticalAlignment="top" ></Label>                -->
            </StackLayout>
            <StackLayout class="textbutton" height="12%" width="100%">
                <Frame> 
                    <CButtonInterests :PDatos="context" />
                </Frame>
            </StackLayout>
            <StackLayout height="80%">
                <ListView for="item in items" @itemTap="onItemTap"  height="100%">
                    <v-template>
                        <GridLayout width="100%"
                            height="300" rows="auto" columns="*, *, *">
                            <Image :src="urlPhoto+'/' + item.post_url" 
                                row="0" colSpan="3"                            
                                stretch="aspectFill" 
                                height="120" 
                                class="btn-image" 
                                loadMode="async"/>
                            <Label :text="item.title" textWrap="true" row="0"
                                colSpan="3" horizontalAlignment="center"
                                verticalAlignment="center" class="label-float"></Label>                        
                        </GridLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </StackLayout> 
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    import CButtonInterests from './../../components/CButtonInterests';
    import CLabel from './../../components/CLabel';
    
    export default {
        props: ["context"],
        data() {
            return {
                items : [],
                urlPhoto : this.$store.getters.getServerPhoto,
            };
        },
        components : {
            CButtonInterests,
            CLabel
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
            }/*,
            navigateBack(){
                goToSection(this, this.$router.welcome, {}, "slideRight", true);
            }*/
        }
    }
</script>

<style scoped>

</style>