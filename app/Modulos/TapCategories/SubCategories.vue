<template>
    <Page >        
        <ActionBar class="ActionBar" flat="true">
            <NavigationButton @tap="navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="CLICKET" horizontalAlignment="center" />
        </ActionBar> 
        <StackLayout width="90%" height="100%">
            <StackLayout class="textbutton" height="10%" width="100%" background="red">
                <Frame>
                    <CLabel :PText="context.name" />
                </Frame>
                <!--<Label class="m-10 h3" :text="context.name" verticalAlignment="top" ></Label>                -->
            </StackLayout>
            <StackLayout class="textbutton" height="10%" width="100%">
                <Frame> 
                    <CButtonInterests :PDatos="context" />
                </Frame>
            </StackLayout>
            <StackLayout height="80%">
                <ListView for="item in items" @itemTap="onItemTap">
                    <v-template>
                        <GridLayout width="100%"
                            height="300" rows="auto" columns="*, *, *">
                            <Image :src="urlPhoto+'/' + item.image" 
                                row="0" colSpan="3"                            
                                stretch="aspectFill" 
                                height="120" 
                                class="btn-image" 
                                loadMode="async"/>
                            <Label :text="item.name" textWrap="true" row="0"
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
    import ItemSubCategories from "./ItemSubCategories.vue";
    import CButtonInterests from './../../components/CButtonInterests';
    import CLabel from './../../components/CLabel';
    
    export default {
        props: ["context"],
        data() {
            return {
                items : [],
                urlPhoto : this.$store.getters.getServerPhoto
            };
        },
        components : {
            CButtonInterests,
            CLabel
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getSubCategories();            
        },
        methods: {
            getSubCategories(){
                //Consumo de la Api
                console.log("id de consulta "+this.context.id);
                axios
                .get(`${this.$store.getters.getServerPath}/auth/tag/childs?id=`+this.context.id)
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
                console.log("test 1");
            },
            onItemTap (args) {
//
                const view = args.view;
                const page = view.page;
                const tappedItem = view.bindingContext;

                this.$navigateTo(ItemSubCategories, {
                    props: { 
                        context: tappedItem,
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    }
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