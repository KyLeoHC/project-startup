<template>
    <transition name="menu">
        <div class="menu-container"
             @click="$emit('update:visible', false)">
            <div class="wrapper"
                 @click.stop>
                <section>
                    <header>搜索引擎</header>
                    <ul class="list">
                        <li v-for="engine in engineList"
                            :key="engine.id"
                            :class="{
                                'active': engine.id === selectEngine.id
                            }"
                            @click="onClickEngine(engine)">
                            <span>
                                {{ engine.name }}
                            </span>
                            <span class="iconfont icon-check"></span>
                        </li>
                    </ul>
                </section>
                <section>
                    <header>其它</header>
                    <ul class="list">
                        <li>
                            <div class="left">
                                <switch-btn v-model="enableSearchHistory"></switch-btn>
                                <span @click="enableSearchHistory = !enableSearchHistory">
                                    搜索历史
                                </span>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </transition>
</template>
<script>
    import {
        storage,
        isNumber
    } from '@/utils';
    import switchBtn from '@/components/switchBtn';
    import {getEngineList} from '../../services/engine';

    const SEARCH_ENGINE_KEY = 'search_engine_key';
    const ENABLE_SEARCH_HISTORY_KEY = 'enable_search_history_key';
    export default {
        name: 'SearchMenu',
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const engineList = getEngineList();
            const engineId = parseInt(storage.local.get(SEARCH_ENGINE_KEY));
            const selectEngine = engineList.filter(item => item.id === engineId)[0];
            const enableSearchHistory = parseInt(storage.local.get(ENABLE_SEARCH_HISTORY_KEY));
            return {
                enableSearchHistory: isNumber(enableSearchHistory) ? !!enableSearchHistory : false,
                selectEngine: selectEngine || engineList[0],
                engineList
            };
        },
        watch: {
            enableSearchHistory: {
                handler(value) {
                    this.$emit('history', value);
                    storage.local.set(ENABLE_SEARCH_HISTORY_KEY, value ? 1 : 0);
                },
                immediate: true
            }
        },
        components: {
            switchBtn
        },
        mounted() {
            this.$emit('engine', this.selectEngine);
        },
        methods: {
            onClickEngine(engine) {
                this.selectEngine = engine;
                this.$emit('engine', engine);
                this.$emit('update:visible', false);
                storage.local.set(SEARCH_ENGINE_KEY, engine.id);
            }
        }
    };
</script>
<style lang="stylus">
    .menu-container {
        position fixed
        left 0
        top 0
        width 100%
        height 100%
        background-color rgba(255, 255, 255, 0)

        &.menu-enter-active, &.menu-leave-active {
            transition opacity .5s

            .wrapper {
                transition transform .5s
            }
        }

        &.menu-enter, &.menu-leave-to {
            opacity 0

            .wrapper {
                transform scale(0.1)
            }
        }

        .wrapper {
            position absolute
            top 10px
            right 10px
            width 240px; /*rem*/
            padding 16px 0; /*rem*/
            background-color #fff
            transform scale(1)
            transform-origin top right
            box-shadow 0 0 4px #cecece

            > section {
                header {
                    margin 6px 0
                    padding 0 16px; /*rem*/
                    font-size 18px
                    font-weight 600
                    color #2c3e50
                }

                .content, .list {
                    font-size 14px
                    color #34495e
                }

                .list {
                    li {
                        display flex
                        justify-content space-between
                        height 40px
                        line-height @height
                        padding 0 16px; /*rem*/

                        .iconfont {
                            display none
                            font-size 14px
                        }

                        &.active {
                            color #42b983

                            .iconfont {
                                display inline
                                color #42b983
                            }
                        }

                        .left {
                            display flex
                            align-items center

                            .common-switch-btn {
                                margin-right 4px
                            }
                        }
                    }
                }
            }
        }
    }
</style>
