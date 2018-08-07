<template>
    <div id="app">
        <div class="logo">
            <img v-bind="{src: '/static/images/search_logo_1.png'}">
        </div>
        <div class="search-box">
            <input class="search-input"
                   type="text"
                   v-model="content">
            <button class="btn"
                    type="button"
                    @click="onClickSearchBtn">
                search
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                content: ''
            };
        },
        methods: {
            onClickSearchBtn() {
                location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(this.content)}`;
            }
        }
    };
</script>
<style lang="stylus">
    @import "../../lib/css/flexible.styl"

    #app {
        display flex
        flex-direction column
        align-items center
        justify-content center

        .logo {
            display inline-block
            margin 72px 0 36px; /*rem*/

            img {
                width 40px
                height 40px
            }
        }

        .search-box {
            display flex
            align-items center
            justify-content center
            font-size 14px

            PADDING = 10px 8px

            .search-input {
                width 400px; /*rem*/
                padding PADDING
                border 1px solid #d9d9d9; /*hair*/
                border-right 0
                border-top-left-radius 8px
                border-bottom-left-radius 8px
            }

            .btn {
                color #fff
                padding PADDING
                background-color #3b78e7
                border 1px solid #3b78e7; /*hair*/
                border-top-right-radius 8px
                border-bottom-right-radius 8px
            }
        }
    }
</style>
