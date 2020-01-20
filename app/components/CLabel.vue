<template>
    <Page actionBarHidden="true">
        <Label :text="PText"
            textWrap="true"
            class="text text-center"
        ></Label>
    </Page>
</template>

<script>
    export default {
        /* Propiedades
            text : PText
        */
        props: ["PText"],
        data() {//Variables
            return {
                msg : " hola " 
            }
        }
    }
</script>

<style scoped>
  .text{
      font-size: 16%;
      color : black;
      padding: 20px;
      margin: 10px;
      margin-bottom: 10%;
      font-weight: bold;
  }
</style>