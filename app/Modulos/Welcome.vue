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
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <CInterests/>
                </Frame>
            </TabContentItem>

            <TabContentItem>
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <Categories />
                </Frame>
            </TabContentItem>

            <TabContentItem>
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <CLabel :PText="'Texto Tab 3'" />
                </Frame>
            </TabContentItem>
            
            <TabContentItem>
                <!--componente : Recibe Propiedades -->
                <Frame>
                    <User />
                </Frame>
            </TabContentItem>

        </BottomNavigation>
    </page>
</template>

<script>
    //Llamado a componentes
    import CInterests from './../components/CInterests';
    import CLabel from './../components/CLabel';
    import User from './../Modulos/User';
    import Categories from './../Modulos/Categories';

    export default {
        //LLamado a Componentes
        components : {
            CInterests,
            CLabel,
            User,
            Categories
        }
    }
</script>

<style scoped>

</style>