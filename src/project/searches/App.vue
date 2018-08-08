<template>
    <div id="app">
        <div class="header">
            <div class="left"></div>
            <div class="right">
                <span class="iconfont icon-menu"></span>
            </div>
        </div>
        <div class="logo">
            <img v-bind="{src: `${staticPath}/images/search_logo_3.png`}">
        </div>
        <div class="search-box">
            <input class="search-input"
                   type="search"
                   autocomplete="off"
                   v-model="content"
                   @search="onClickSearchBtn">
            <button class="btn"
                    type="button"
                    @click="onClickSearchBtn">
                <span class="iconfont icon-search"></span>
            </button>
        </div>
        <search-menu v-show="showMenu"></search-menu>
    </div>
</template>
<script>
    import {staticPath} from '@/common/env';
    import searchMenu from './components/searchMenu';

    export default {
        name: 'App',
        data() {
            return {
                staticPath,
                content: '',
                showMenu: false
            };
        },
        components: {
            searchMenu
        },
        methods: {
            onClickSearchBtn() {
                if (!this.content) return;
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
        height 100%
        background-color #fff

        .header {
            display flex
            justify-content space-between
            width 100%

            > div {
                display flex
                align-items center
                height 40px
                padding 0 10px

                .iconfont {
                    font-size 20px
                    color #757575
                }
            }
        }

        .logo {
            display inline-block
            margin 72px 0 36px; /*rem*/

            img {
                width 80px
                height 80px
            }
        }

        .search-box {
            display flex
            align-items center
            justify-content center
            width 100%

            HEIGHT = 40px

            .search-input {
                width 80%
                font-size 14px
                height HEIGHT
                line-height @height
                padding 0 8px
                border 1px solid #d9d9d9; /*hair*/
                border-right 0
                border-top-left-radius 8px
                border-bottom-left-radius 8px
            }

            .btn {
                display flex
                align-items center
                justify-content center
                width 40px;
                height HEIGHT
                color #fff
                background-color #3b78e7
                border 1px solid #3b78e7; /*hair*/
                border-top-right-radius 8px
                border-bottom-right-radius 8px
            }
        }
    }
</style>
