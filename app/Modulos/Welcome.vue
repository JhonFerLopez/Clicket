<template lang="html">
    <page>
        <ActionBar title="CLICKET">
        </ActionBar> 
        <BottomNavigation>
            <TabStrip>
                <TabStripItem class="navigation__item">
                    <Label text="Home"></Label>
                    <Image src.decode="font://&#xf015;" class="fas t-36"></Image>
                </TabStripItem>
                <TabStripItem class="navigation__item">
                    <Label text="Browse"></Label>
                    <Image src.decode="font://&#xf1ea;" class="far t-36"></Image>
                </TabStripItem>
                <TabStripItem class="navigation__item">
                    <Label text="Search"></Label>
                    <Image src.decode="font://&#xf002;" class="fas t-36"></Image>
                </TabStripItem>                
                <TabStripItem class="navigation__item">
                    <Label text="Search"></Label>
                    <Image src.decode="font://&#xf002;" class="fas t-36"></Image>
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
        //LLamado a Componentes
        components : {
            Interests,
            CLabel,
            User,
            Categories,
            Experts
        }
    }
</script>

<style scoped>

</style>