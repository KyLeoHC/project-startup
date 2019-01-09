<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'App'
    };
</script>
<style lang="stylus">
    @import "../../lib/css/flexible.styl"
    @import "../../lib/css/mobile.styl"

    #app {
    }
</style>
