<template>
    <div id="app">
        <page>
            <router-view />
        </page>
    </div>
</template>

<script>
import page from '@/layouts/Page'
export default {
    components: {
        page
    }
}
</script>
<style lang="scss">
body,
html {
    font-family: 'Noto Sans TC', 'Helvetica', 'Arial', 'sans-serif';
    min-width: 100px;
    min-height: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    font-size: 14px;
    margin: 0px;
}
</style>
