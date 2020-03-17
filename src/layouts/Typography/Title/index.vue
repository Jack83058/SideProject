<template>
    <Typography-Text :size="size" :color="color" :wrap="size" :text="text">
        <slot></slot>
    </Typography-Text>
</template>
<script>
import Text from '../Text'
export default {
    name: 'Typography-Title',
    components: {
        'Typography-Text': Text
    },
    data() {
        return {}
    },
    computed: {},
    props: {
        text: {
            type: String,
            default: ''
        },
        size: {
            validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(value) !== -1,
            default: 'h5'
        },
        color: {
            validator: value => /^#[0-9A-F]{6}$/i.test(value),
            default: '#3a3a3a'
        },
        className: {
            type: String,
            default: ''
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
