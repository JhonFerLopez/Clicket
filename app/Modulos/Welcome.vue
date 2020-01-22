<template lang="html">
    <page>
        <ActionBar title="Usuario" >
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
            <ActionItem 
                ios.systemIcon="1" 
                android.systemIcon="ic_menu_close_clear_cancel" 
                ios.position="right"
                @tap="logout"
            ></ActionItem>
        </ActionBar> 
        <TabView 
            androidTabsPosition="bottom"
            tabTextFontSize="16"
            tabBackgroundColor="rgba(232,232,232,1)"
            selectedTabTextColor="rgb(0,0, 0)"
            :selectedIndex="selectedIndex" 
            @selectedIndexChange="indexChange">

            <TabViewItem title="Tab 1" iconSource="">
                <Frame>
                    <CInterests/>
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <Frame>
                    <CLabel :PText="'Texto Tab 2'" />
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <Frame>
                    <CLabel :PText="'Texto Tab 3'" />
                </Frame>
            </TabViewItem>
            <TabViewItem title="Tab 4">
                <Frame>
                    <CLabel :PText="'Texto Tab 4'" />
                </Frame>
            </TabViewItem>
        </TabView>
    </page>
</template>

<script>
    import {goToSection } from "~/../app/helpers/index.js";
    //Llamado a componentes
    import CInterests from './../components/CInterests';
    import CLabel from './../components/CLabel';

    export default {
        data() {
            return {
                user : {
                    name : "", 
                    email : ""
                }
            };
        },
        components : {
            CInterests,
            CLabel
        },
        methods: {//Metodos de la Pagina
            indexChange: function(args) {
                let newIndex = args.value
                console.log('Current tab index: ' + newIndex)
            },
            goBack() {
                goToSection(this, this.$router.session, {}, "slideRight", true);
            },
            logout() {
                console.log("Cierre de Session");
                axios
                .post(`${this.$store.getters.getServerPath}/auth/logout`)
                .then(response => {
                    console.log("Session Terminada");
                    this.$store.dispatch("logOut");
                    goToSection(this, this.$router.login, {}, "slideRight", true);
                })
                .catch(response => {
                    console.log(response.data.errors);
                });
            }
        }
    }
</script>

<style scoped>

</style>