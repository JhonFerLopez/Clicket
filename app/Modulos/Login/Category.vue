<template>
    <page>      
        <ActionBar title="Categoria" >
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
            <ActionItem 
                ios.systemIcon="3" 
                android.systemIcon="ic_menu_save" 
                ios.position="right"
                @tap="save"
            ></ActionItem>
        </ActionBar> 

        <FlexboxLayout 
            flexDirection="column" 
            width="100%"             
        > 
            <FlexboxLayout
                flexDirection="column"
                height="100"
            >
                <StackLayout>  
                    <!--componente : Recibe Propiedades -->
                    <Frame>
                        <CLabel :PText="'Mis Intereses: ' + CategoriaSeleccionada" />
                    </Frame>  
                </StackLayout>
            </FlexboxLayout>
            <ScrollView orientation="vertical" class="scroll-height full-width">
                <FlexboxLayout
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    class="full-width"
                >                            
                    <StackLayout v-if="datos.length > 0">
                        <StackLayout v-for="detalle in datos" :key="detalle.id">
                            <FlexboxLayout flexDirection="column" @tap="showOffer(detalle)">
                                <Label :text="detalle.name"></Label>
                                <Image src="~/assets/images/offer/automoviles.png"></Image> 
                            </FlexboxLayout>
                        </StackLayout>
                    </StackLayout>
                </FlexboxLayout>
            </ScrollView>
        </FlexboxLayout>
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
                datos : [],
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
            showOffer(payload) {//Metodo para Agregar o quitar Valores de un Array Object
                var acction = this.validaInteres(payload.id);
                if(acction[0]){
                    this.datosInterests.push({
                        id : payload.id ,  name : payload.name
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
                    this.datos = response.data.data;    
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