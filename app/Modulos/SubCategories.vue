<template>
    <Page >        
        <ActionBar>
            <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="Clicket"></Label>
        </ActionBar>  
        
        <FlexboxLayout >            
            <FlexboxLayout flexDirection="column" backgroundColor="#FAD7D0">
                <Label class="m-10 h3" :text="context.name" verticalAlignment="top" ></Label>
                <Button text="Añadir A Mis Gustos" @tap="onButtonTap" />
            </FlexboxLayout>
            <FlexboxLayout>
                <ListView for="item in items" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="column">
                            <Label :text="item.id+' -- '+item.name" textWrap="true" ></Label>
                            <Image row="2" :src="urlPhoto+'/' + item.image" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>
                        </FlexboxLayout>
                    </v-template>
            </ListView>
            </FlexboxLayout>
        </FlexboxLayout> 
    </Page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    import ItemSubCategories from "./ItemSubCategories.vue";
    
    export default {
        props: ["context"],
        data() {
            return {
                items : [],
                urlPhoto : this.$store.getters.getServerPhoto,
                AgregarInteres : true
            };
        },
        components : {
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
            onButtonTap (event){
                //Consumo de la Api      
                if (this.AgregarInteres){   
                    var consume = "/auth/interest/add";
                    var message = "No Agrego La Categoria ";
                }else{
                    var consume = "/auth/interest/remove";
                    var message = "Se Quita la Cartegoria ";
                }
                axios
                .post(`${this.$store.getters.getServerPath + consume}`, {
                    id: this.context.id
                },)
                .then(response => {
                    alert({
                        title: "Error en Aplicativo",
                        message: message + this.context.name,
                        okButtonText: "ERROR"
                    });
                })
                .catch(err => {//Respuesta de la Api en Caso De Error
                    var error = true;
                    this.processing = false;
                    alert({
                        title: "Error en Aplicativo",
                        message: "No se Pudo Procesar la Solicitud",
                        okButtonText: "ERROR"
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>