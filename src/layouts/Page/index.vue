<template>
    <fragment>
        <el-container class="container-wrapper">
            <el-aside :width="menuWidth" class="transition-wrapper">
                <SideMenu @onCollapse="onCollapse"></SideMenu>
            </el-aside>
            <el-main class="main-wrapper">
                <el-scrollbar
                    wrapClass="test-container"
                    viewClass="test-content"
                    :native="false"
                    :noresize="false"
                    tag="div"
                >
                    <el-backtop target=".test-container" ref="backtop"></el-backtop>
                    <div class="pl-2 pr-2 content-area">
                        <slot></slot>
                    </div>
                </el-scrollbar>
            </el-main>
        </el-container>
    </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'
import SideMenu from '@/components/SideMenu'
export default {
    components: {
        fragment: Fragment,
        SideMenu
    },
    data() {
        return {
            menuWidth: '240px'
        }
    },
    watch: {
        $route(to, from) {
            console.log(to)
            console.log(from)
            document.querySelector('.test-container').scrollTop = 0
            // react to route changes...
        }
    },
    props: {},
    methods: {
        onCollapse(val) {
            if (val === true) {
                this.menuWidth = '60px'
            } else {
                this.menuWidth = '240px'
            }
        }
    },

    // beforeRouteUpdate(to, from, next) {
    //     // react to route changes...
    //     // don't forget to call next()
    // },
    async mounted() {}
}
</script>
<style>
.test-container {
    min-height: 100vh;
    max-height: 100vh;

    /* overflow-y: auto; */
    /* overflow: hidden !important; */
}
</style>
<style lang="scss" scoped>
/* scss import */
.main-wrapper {
    width: 100%;
    overflow: hidden !important;
    padding: 0px;
}
.transition-wrapper {
    transition: all 0.6s ease-in-out;
}

.test-content > .content-area {
    min-height: 100vh;
    height: fit-content;
    width: auto;
}
.container-wrapper {
    height: 100vh;
    // overflow: hidden;
}
</style>
