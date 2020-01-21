<template>
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
        <StackLayout >
            <label :text="user.name"></label>
            <label :text="user.email"></label>
        </StackLayout >
    </page>
</template>

<script>

    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //import * as utils from "utils/utils";

    export default {
        data() {
            return {
                user : {
                    name : "", 
                    email : ""
                }
            };
        },
        created() {
            AuthAxiosToken(axios, this);
            this.getUser();
        },
        methods: {//Metodos de la Pagina
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
            },
            getUser(){
                axios
                .get(`${this.$store.getters.getServerPath}/auth/user`)
                .then(response => {
                    this.user.name = response.data.name;
                    this.user.email = response.data.email;
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