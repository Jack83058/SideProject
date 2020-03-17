<template>
    <component :is="'Typography-' + type" v-bind="$attrs">
        <fragment v-if="hasSlot">
            <slot></slot>
        </fragment>
        <fragment v-else>
            {{ $attrs.text }}
        </fragment>
    </component>
</template>
<script>
import { Fragment } from 'vue-fragment'
import Title from './Title'
import Text from './Text'
export default {
    components: {
        fragment: Fragment,
        'Typography-Title': Title,
        'Typography-Text': Text
    },
    data() {
        return {}
    },
    computed: {
        hasSlot() {
            return !!this.$slots['default'] || !!this.$scopedSlots['default']
        }
    },
    props: {
        type: {
            type: String,
            validator: value => ['Title', 'Text'].indexOf(value) !== -1,
            default: 'Text'
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
