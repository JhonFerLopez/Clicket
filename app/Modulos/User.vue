<template>
    <page actionBarHidden="true">
        <AbsoluteLayout width="100%" height="100%" backgroundColor="lightgray">
            <GridLayout
                columns="*"
                rows="*, 50"
                width="100%"
                height="100%"
                backgroundColor="lightgray"
                top="0"
                left="0"
            >
                <Image src="~/assets/images/profile-icon.png"></Image> 
                
            </GridLayout>
        </AbsoluteLayout>
        <Button
            text="Cerrar Sesión"
            @tap="logout"
            id="show_bottom_drawer"
            row="1"
            col="0"
        ></Button> 
    </page>
</template>

<script>
    //LLamado a Axios: Conexion API a BD.
    import axios from "axios";
    import { AuthAxiosToken, goToSection } from "~/../app/helpers/index.js";
export default {
    methos :{
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