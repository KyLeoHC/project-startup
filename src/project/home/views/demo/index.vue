<template>
    <div class="home-container">
        <div>
            {{ word }}
        </div>
    </div>
</template>
<script>
    import {fetchWelcomeWord} from '../../services/data';

    export default {
        data() {
            return {
                word: '',
                isLoading: false
            };
        },
        mounted() {
            this.isLoading = true;
            fetchWelcomeWord({
                who: 'my'
            }).then(response => {
                this.word = response.word;
            }).catch(response => {
                this.word = '500 error';
            }).finally(() => {
                this.isLoading = false;
            });
        },
        methods: {
            jump(name) {
                this.$router.push({name});
            }
        }
    };
</script>
<style lang="stylus">
    .home-container {
        font-size 28px
    }
</style>
