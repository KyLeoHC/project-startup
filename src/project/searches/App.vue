<template>
    <div id="app">
        <div class="box">
            1234
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App'
    };
</script>
<style lang="stylus">
    @import "../../lib/css/flexible.styl"

    #app {
        padding 20px; /*rpx*/
        font-size 36px; /*rem*/

        .box {
            width 100px; /*rem*/
            height @width; /*rem*/
        }
    }
</style>
