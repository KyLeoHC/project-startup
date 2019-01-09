<template>
    <div class="home-wrapper">
        <button type="button"
                @click="showToast">
            toast
        </button>
    </div>
</template>
<script>
    export default {
        name: 'Home',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            showToast() {
                this.$toast('提示文案');
            }
        }
    };
</script>
<style lang="stylus">
    @import "../../../../lib/css/mobile.styl"

    .home-wrapper {
        button {
            font-size 24px; /*rem*/
        }
    }
</style>
