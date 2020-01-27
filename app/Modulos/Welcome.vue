<template lang="html">
    <page>
        <ActionBar title="CLICKET">
        </ActionBar> 
        <TabView 
            androidTabsPosition="bottom"
            tabTextFontSize="16"
            tabBackgroundColor="rgba(232,232,232,1)"
            selectedTabTextColor="rgb(0,0, 0)"
            :selectedIndex="selectedIndex" 
            @selectedIndexChange="indexChange">            

            <TabViewItem title="Tab 1" iconSource="">
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <CInterests/>
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <Categories />
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <CLabel :PText="'Texto Tab 3'" />
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 4">
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <User />
                </Frame>
            </TabViewItem>
        </TabView>
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import {AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CInterests from './../components/CInterests';
    import CLabel from './../components/CLabel';
    import User from './../Modulos/User';
    import Categories from './../Modulos/Categories';

    export default {
        //Variables
        data() {
            return {
                buscador : "",
                user : {
                    name : "", 
                    email : ""
                }
            };
        },
        //Inicializador
        created() {
            AuthAxiosToken(axios, this); 
        },
        //LLamado a Componentes
        components : {
            CInterests,
            CLabel,
            User,
            Categories
        },
        //Metodos de la Pagina
        methods: {
            indexChange: function(args) {
                let newIndex = args.value
                console.log('Current tab index: ' + newIndex)
            }            
        }
    }
</script>

<style scoped>

</style>