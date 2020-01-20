<template>
    <page>
        <ActionBar title="Solicitud de Contraseña" >
            <NavigationButton 
                text="Go Back" 
                android.systemIcon="ic_menu_back"
                android.position="left"
                @tap="goBack"
            ></NavigationButton>
            <ActionItem 
                ios.systemIcon="2" 
                android.systemIcon="ic_menu_edit" 
                ios.position="right"
                @tap="goBack"
            ></ActionItem>
        </ActionBar> 
        <label :text="token"></label>
    </page>
</template>

<script>

    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
    //import * as utils from "utils/utils";

    export default {
        data() {
            return {
                token: this.$store.getters.getToken,
                username: this.$store.getters.getLoginUser.name
            };
        },
        created() {
            AuthAxiosToken(axios, this);
        },
        methods: {//Metodos de la Pagina
            goBack() {
                goToSection(this, this.$router.session, {}, "slideRight", true);
            }
        }
    }
</script>

<style scoped>

</style>