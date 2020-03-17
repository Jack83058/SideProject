<template>
    <component :is="wrap" :style="{ ...customStyle, color: color }" :class="classes">
        <fragment v-if="hasSlot">
            <slot></slot>
        </fragment>
        <fragment v-else>
            {{ text }}
        </fragment>
    </component>
</template>
<script>
import { Fragment } from 'vue-fragment'
export default {
    name: 'Typography-Text',
    components: {
        fragment: Fragment
    },
    data() {
        return {}
    },
    computed: {
        hasSlot() {
            return !!this.$slots['default'] || !!this.$scopedSlots['default']
        },
        classes() {
            return `${this.className} text-${this.size}`
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        wrap: {
            validator: value => ['div', 'span', 'fragment', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(value) !== -1,
            type: String,
            default: 'span'
        },
        size: {
            validator: value =>
                [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'subtitle1',
                    'subtitle2',
                    'body1',
                    'body2',
                    'caption',
                    'overline'
                ].indexOf(value) !== -1,
            default: 'h5'
        },
        color: {
            validator: value => /^#[0-9A-F]{6}$/i.test(value),
            default: '#3a3a3a'
        },
        customStyle: {
            type: Object,
            default: () => ({})
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
