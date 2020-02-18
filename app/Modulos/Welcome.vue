<template lang="html">
    <page>
        <ActionBar class="ActionBar" flat="true">
            <Label text="CLICKET" horizontalAlignment="center" />
        </ActionBar> 
        <BottomNavigation :selectedIndex="pagina" @selectedIndexChange="onSelectedIndexChange">
            <TabStrip>
                <TabStripItem class="navigation__item">
                    <Image :src.decode="tap0" class="fas t-36"></Image>
                </TabStripItem>
                <TabStripItem class="navigation__item">
                    <Image :src.decode="tap1" class="far t-36"></Image>
                </TabStripItem>
                <TabStripItem class="navigation__item">
                    <Image :src.decode="tap2" class="fas t-36"></Image>
                </TabStripItem>                
                <TabStripItem class="navigation__item">
                    <Image :src.decode="tap3" class="fas t-36"></Image>
                </TabStripItem>
            </TabStrip>

            <TabContentItem>
                <!--TapInterests : Recibe Propiedades -->
                <Frame>
                    <Interests/>
                </Frame>
            </TabContentItem>

            <TabContentItem>
                <!--TapCategories : Recibe Propiedades -->
                <Frame>
                    <Categories />
                </Frame>
            </TabContentItem>

            <TabContentItem>
                <!--TapExperts : Recibe Propiedades -->
                <Frame>
                    <Experts />
                </Frame>
            </TabContentItem>
            
            <TabContentItem>
                <!--TapProfiles : Recibe Propiedades -->
                <Frame>
                    <User />
                </Frame>
            </TabContentItem>

        </BottomNavigation>
    </page>
</template>

<script>        
    //Llamado a Modulos
    import Interests from './../Modulos/TapInterests/Interests';    
    import Categories from './../Modulos/TapCategories/Categories';
    import Experts from './../Modulos/TapExperts/Experts';
    import User from './../Modulos/TapProfiles/User';   
    
    //Llamado a componentes
    import CLabel from './../components/CLabel';
    /*switch (this.pagina) {
        case 1:
            this.tap1 = "~/assets/images/listpurple.png";
        break;
        case 2:
            this.tap2 = "~/assets/images/searchpurple.png";
        break;
        case 3:
            this.tap3 = "~/assets/images/userpurple.png";
        break;
        default:
            this.tap0 = ;
        break;
    } */  
    export default {
        //Variables
        data() {
            return {
                pagina : this.$store.getters.getPagina,               
                tap0: this.$store.getters.getPagina
                    ? "~/assets/images/dashboardpurple.png"
                    : "~/assets/images/dashboardgrey.png",
                tap1: "~/assets/images/listgrey.png",
                tap2: "~/assets/images/searchgrey.png",
                tap3: "~/assets/images/usergrey.png",
            };
        },
        created() {
                 
        },
        //LLamado a Componentes
        components : {
            Interests,
            CLabel,
            User,
            Categories,
            Experts
        },
        methods: {
            onSelectedIndexChange(event){
                console.log("hola jhon "+event);
            }
        }      
    }
</script>

<style scoped>

</style>