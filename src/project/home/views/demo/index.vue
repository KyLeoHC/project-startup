<template>
    <div class="home-container">
        <div class="word">
            {{ word }}
        </div>
        <div class="link">
            <a href="javascript:;"
               @click="linkToIntroduction">
                link to introduction
            </a>
        </div>
    </div>
</template>
<script>
    import router from '@/common/router';
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
                this.word = 'Hello, this is project startup.';
            }).finally(() => {
                this.isLoading = false;
            });
        },
        methods: {
            linkToIntroduction() {
                router.push({
                    module: 'introduction',
                    query: {
                        word: this.word
                    }
                });
            }
        }
    };
</script>
<style lang="stylus">
    .home-container {
        font-size 30px; /*px*/

        .word {
            display flex
            align-items center
            width 400px; /*rem*/
            height 60px; /*rem*/
            padding-left 20px
            border-left 1px solid #e0e0e0; /*hair*/
        }
    }
</style>
