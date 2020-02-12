<template>
    <page>      
        <ActionBar title="Categorias" flat="true">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" 
                android.position="left" @tap="goBack">
            </NavigationButton>
        </ActionBar>

        <StackLayout width="90%" height="100%">
            <StackLayout height="7%">  
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <CLabel :PText="'Mis Intereses: ' + CategoriaSeleccionada" />
                </Frame>
            </StackLayout>
            <StackLayout height="83%">
                <ListView for="item in items" @itemTap="onItemTap">
                    <v-template>
                        <FlexboxLayout flexDirection="column" width="100%"
                            height="300">
                            <Image class="btn-image" src="~/assets/images/offer/automoviles.png">
                            </Image>
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
            <StackLayout class="btn-button" height="10%">
                <Button text="Continuar" @tap="save" class="btn btn-primary"></Button>
            </StackLayout>
        </StackLayout> 
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";//Utilidades
    //Llamado a componentes
    import CLabel from './../../components/CLabel';

    export default {
        //Variables
        data() {
            return {
                items : [],
                datosInterests : [],
                info : ""
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
            goBack() {
                goToSection(this, this.$router.welcome, {}, "slideRight", true);
            },
            onItemTap(event) {//Metodo para Agregar o quitar Valores de un Array Object
                const view = event.view;
                const page = view.page;
                const tappedItem = view.bindingContext;
                var acction = this.validaInteres(tappedItem.id);
                if(acction[0]){
                    this.datosInterests.push({
                        id : tappedItem.id ,  name : tappedItem.name
                    })
                }else{
                    this.datosInterests.splice(acction[1],1);
                }                
            },
            validaInteres(index) {//Validacion de Selecciones Repetidas.
                let adicionar = [true, 0] ;
                var i = 0 ;
                for(const datos of this.datosInterests){
                    if(datos.id == index){
                        adicionar[0] = false;
                        adicionar[1] = i;
                    }
                    i++;
                }
                return adicionar;
            },            
            getInteres(){//Metodo que Consulta de Todas las Categorias
                axios
                .get(`${this.$store.getters.getServerPath}/auth/tags`)
                .then(response => {
                    this.items = response.data.data;    
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            save() {//Metodo para Registrar Categoria a mi interes
                var error = false;
                for(const datos of this.datosInterests){ 
                    //Consumo de la Api                   
                    axios
                    .post(`${this.$store.getters.getServerPath}/auth/interest/add`, {
                        id: datos.id
                    },)
                    .catch(err => {//Respuesta de la Api en Caso De Error
                        var error = true;
                        this.processing = false;
                        alert({
                            title: "Error en Aplicativo",
                            message: "No Pudo Guardar La Categoria "+datos.name,
                            okButtonText: "ERROR"
                        });
                    });
                }
                if(!error){//Confirmacion de Registros.
                    alert({
                        title: "Registro Exitoso",
                        message: "Bienvenido A Clicket",
                        okButtonText: "OK"
                    })
                    .then(() => {
                        goToSection(this, this.$router.welcome, {}, "fade", true);
                    });
                }
            }
        },
        //Metodos de Ejecuciones Automaticas y Constante.
        computed : {
            CategoriaSeleccionada(){
                this.info = "";
                for(const datos of this.datosInterests){
                    if(this.info == ""){
                        this.info = datos.name;
                    }
                    else{
                        this.info = this.info + ", " + datos.name;
                    }
                }
                return this.info;
            }
        }
    }
</script>

<style scoped>

</style>