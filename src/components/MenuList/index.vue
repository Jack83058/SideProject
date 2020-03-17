<template>
    <fragment>
        <fragment v-for="(item, index) in itemList" :key="index">
            <el-submenu v-if="item.children" :index="index + ''" :hide-timeout="0" slot="SubMenu">
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                    <MenuList :itemList="item.children"></MenuList>
                </template>
            </el-submenu>
            <router-link :to="item.path" v-else>
                <el-menu-item :index="item.path">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </router-link>
        </fragment>
    </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'
export default {
    name: 'MenuList',
    components: { fragment: Fragment },
    data() {
        return {}
    },
    props: {
        itemList: {
            type: Array,
            default: () => []
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    methods: {},
    async mounted() {}
}
</script>
<style scoped></style>
<style lang="scss" scoped>
/* scss import */
</style>
