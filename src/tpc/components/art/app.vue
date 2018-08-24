<template>
    <div class="art-container">
        {{ msg }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'This is art container from tpc!'
            };
        }
    };
</script>
<style lang="stylus">
    .art-container {
        margin-top 10px
        font-size 24px
        color #777
    }
</style>
