<template>
    <fragment>
        <el-row v-for="(typography, index) in typographyList" :key="index">
            <el-col :span="6">
                <span>{{ typography.size }}</span>
            </el-col>
            <el-col :span="18">
                <Typography
                    :type="'Text'"
                    :size="typography.size"
                    color="#3a3a3a"
                    wrap="span"
                    :text="typography.text"
                ></Typography>
            </el-col>
        </el-row>
    </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'
import Typography from '@/layouts/Typography'
export default {
    components: {
        fragment: Fragment,
        Typography
    },
    data() {
        return {
            typographyList: [
                { size: 'h1', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'h2', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'h3', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'h4', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'h5', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'h6', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                {
                    size: 'subtitle1',
                    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!'
                },
                {
                    size: 'subtitle2',
                    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!'
                },
                { size: 'body1', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                { size: 'body2', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!' },
                {
                    size: 'caption',
                    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!'
                },
                {
                    size: 'overline',
                    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, laborum!'
                }
            ]
        }
    },
    props: {},
    methods: {},
    async mounted() {}
}
</script>
<style scoped></style>
<style lang="scss" scoped>
/* scss import */
</style>
