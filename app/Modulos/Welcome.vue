<template lang="html">
    <page>
        <ActionBar class="ActionBar" flat="true">
            <Label text="CLICKET" horizontalAlignment="center" />
        </ActionBar> 
        <BottomNavigation :selectedIndex="pagina" @selectedIndexChanged="indexChange">
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

    export default {
        //Variables
        data() {
            return {
                pagina : this.$store.getters.getPagina
                ? this.$store.getters.getPagina
                : 0,               
                tap0: "~/assets/images/dashboardpurple.png",
                tap1: "~/assets/images/listgrey.png",
                tap2: "~/assets/images/searchgrey.png",
                tap3: "~/assets/images/usergrey.png",
            };
        },
        //LLamado a Componentes
        components : {
            Interests,
            CLabel,
            User,
            Categories,
            Experts
        },//Inicializador
        created() {
        },
        methods: {
            indexChange: function(args) {
                console.log("values-->  "+Object.values(args));
                console.log("keys-->  "+Object.keys(args));
                let newIndex = args.newIndex;
                let oldIndex = args.oldIndex;
                if(oldIndex < 0){
                    this.tap0 = "~/assets/images/dashboardpurple.png";
                } else {
                    switch (newIndex) {
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
                            this.tap0 = "~/assets/images/dashboardpurple.png";
                        break;
                    }
                    console.log("old "+oldIndex);
                    switch (oldIndex) {
                        case 1:
                            this.tap1 = "~/assets/images/listgrey.png";
                        break;
                        case 2:
                            this.tap2 = "~/assets/images/searchgrey.png";
                        break;
                        case 3:
                            this.tap3 = "~/assets/images/usergrey.png";
                        break;
                        default:
                            this.tap0 = "~/assets/images/dashboardgrey.png";
                        break;
                    }
                }
            }
        }      
    }
</script>

<style scoped>

</style>