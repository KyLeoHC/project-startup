<template>
    <div id="app">
        <div class="header">
            <div class="left"></div>
            <div class="right">
                <span class="iconfont icon-menu"
                      @click.stop="showMenu = !showMenu">
                </span>
            </div>
        </div>
        <div class="logo">
            <img v-bind="{src: `${staticPath}/images/search_logo_3.png`}">
        </div>
        <div class="search-box">
            <form class="form-wrapper"
                  action=""
                  @submit.prevent>
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
            </form>
        </div>
        <div class="search-history">
            <header>
                <div class="left">
                    搜索历史
                </div>
                <div class="right">
                    清除
                </div>
            </header>
            <ul>
                <li>123</li>
            </ul>
        </div>
        <search-menu v-show="showMenu"
                     :visible.sync="showMenu"
                     @engine="onSelectEngine"
                     @history="onHistoryStateChange">
        </search-menu>
        <footer>
            <div>
                当前搜索引擎: {{ engine ? engine.name : '' }}
            </div>
        </footer>
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
                showMenu: false,
                engine: null,
                enableSearchHistory: false
            };
        },
        components: {
            searchMenu
        },
        methods: {
            onSelectEngine(engine) {
                this.engine = engine;
            },
            onClickSearchBtn() {
                if (!this.content || !this.engine) return;
                this.engine.search(this.content);
            },
            onHistoryStateChange(enableSearchHistory) {
                this.enableSearchHistory = enableSearchHistory;
            }
        }
    };
</script>
<style lang="stylus">
    @import "~styles/flexible.styl"
    @import "~styles/mobile.styl"

    #app {
        position relative
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
            width 100%

            HEIGHT = 40px

            .form-wrapper {
                display flex
                align-items center
                justify-content center
                width 100%

                .search-input {
                    width 80%
                    font-size 14px
                    height HEIGHT
                    padding 0 8px
                    border 1px solid #d9d9d9; /*hair*/
                    border-right 0
                    border-top-left-radius 8px; /*rem*/
                    border-bottom-left-radius 8px; /*rem*/
                    border-top-right-radius 0
                    border-bottom-right-radius 0
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

        .search-history {
            display none
            width 90%
            margin 40px auto 0 auto; /*rem*/

            header {
                display flex
                justify-content space-between
                font-size 14px
                color #2c3e50
            }

            ul {
                display flex
                flex-wrap wrap
                margin-top 10px

                li {
                    font-size 12px
                    color #34495e
                }
            }
        }

        footer {
            position absolute
            bottom 30px; /*rem*/
            width 100%
            font-size 14px
            color #34495e
            text-align center
        }
    }
</style>
