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
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    import CLabel from './../components/CLabel';

    export default {
        data() {
            return {
                datos : [],
                datosInterests : [],
                info : ""
            };
        },
        components : {
            CLabel
        },
        created() {
            AuthAxiosToken(axios, this);           
            this.getInteres();
            console.log("created");
        },
        methods: {//Metodos de la Pagina
            goBack() {
                goToSection(this, this.$router.welcome, {}, "slideRight", true);
            },
            showOffer(payload) {
                console.log("Item Seleccionado-> " + payload.id + " name: " + payload.name);
                var acction = this.validaInteres(payload.id);
                if(acction[0]){
                    this.datosInterests.push({
                        id : payload.id ,  name : payload.name
                    })
                }else{
                    this.datosInterests.splice(acction[1],1);
                }                
                //goToSection(this, this.$routes.item, properties, "fade", false);
            },
            validaInteres(index) {
                console.log("validaInteres-> " + index);
                let adicionar = [true, 0] ;
                var i = 0 ;
                for(const datos of this.datosInterests){
                    console.log("item Validacion--> "+datos.id);                    
                    if(datos.id == index){
                        adicionar[0] = false;
                        adicionar[1] = i;
                    }
                    i++;
                }
                return adicionar;
            },            
            getInteres(){
                console.log("Hola Interes");
                axios
                .get(`${this.$store.getters.getServerPath}/auth/tags`)
                .then(response => {
                    console.log("Datos-> "+response.data.data);
                    this.datos = response.data.data;    
                })
                .catch(response => {
                    console.log(response.data);
                    console.log(response.data.errors);
                });
            },
            save() {
                var error = false;
                for(const datos of this.datosInterests){                    
                    console.log("Save Categoria--> "+datos.id);
                    axios
                    .post(`${this.$store.getters.getServerPath}/auth/interest/add`, {
                        id: datos.id
                    },)
                    .catch(err => {
                        var error = true;
                        this.processing = false;
                        alert({
                            title: "Error en Aplicativo",
                            message: "No Pudo Guardar La Categoria "+datos.name,
                            okButtonText: "ERROR"
                        });
                    });
                }
                if(!error){
                    alert({
                        title: "Registro Exitoso",
                        message: "Bienvenido A Clicket",
                        okButtonText: "OK"
                    })
                    .then(() => {
                        goToSection(this, this.$router.welcome, {}, "fade", true);
                    });
                }
                console.log("Hola Grabando 1");
            }
        },
        computed : {
            CategoriaSeleccionada(){
                this.info = "";
                for(const datos of this.datosInterests){
                    console.log("Categoria Seleccionada--> "+datos.id);
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