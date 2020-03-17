<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            class="el-menu-side-bar"
            :default-active="$route.path"
            :collapse="collapse"
            :collapse-transition="true"
            :unique-opened="true"
            :router="true"
        >
            <el-menu-item>
                <i :class="collapseIcon" @click="onCollapse"></i>
                <span slot="title">收合</span>
            </el-menu-item>
            <MenuList :itemList="itemList"></MenuList>
        </el-menu>
    </el-scrollbar>
</template>
<script>
import MenuList from '@/components/MenuList'
export default {
    components: {
        MenuList: MenuList
    },
    computed: {
        collapseIcon() {
            if (this.collapse === true) {
                return 'el-icon-s-unfold'
            } else {
                return 'el-icon-s-fold'
            }
        }
    },
    data() {
        return {
            itemList: [
                // {
                //     name: '首頁',
                //     path: '/',
                //     icon: 'el-icon-menu'
                // },
                {
                    name: '關於',
                    path: '/about',
                    icon: 'el-icon-user'
                },
                {
                    name: '字型',
                    path: '/typography',
                    icon: 'el-icon-tickets'
                },
                // {
                //     name: '模組',
                //     path: '/components',
                //     icon: 'el-icon-collection'
                // },
                {
                    name: '口罩地圖',
                    path: '/map',
                    icon: 'el-icon-map-location'
                },
                {
                    name: 'video',
                    path: '/video',
                    icon: 'el-icon-video-camera'
                },
                {
                    name: 'image',
                    path: '/image',
                    icon: 'el-icon-picture-outline'
                }
            ],
            collapse: false
        }
    },
    props: {},
    methods: {
        onCollapse() {
            this.collapse = !this.collapse

            this.$emit('onCollapse', this.collapse)
        }
    },
    async mounted() {}
}
</script>
<style scoped></style>
<style lang="scss" scoped>
/* scss import */
.el-menu-side-bar {
    height: 100vh;
    width: auto;
    // width: 60px;
    background: antiquewhite;
    // position: fixed;
    // left: 0px;
}
// .el-menu-side-bar:not(.el-menu--collapse) {
//     width: 240px;
// }
.el-menu-item [class^='icon-'] {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}
// .scrollbar-wrapper {
//     transition: width, height all 0.6s ease-in-out;
// }
</style>
