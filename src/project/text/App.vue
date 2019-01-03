<template>
    <div id="app">
        <div class="text-wrapper">
            <div class="before"></div>
            <div class="content">
                我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'App',
        data() {
            return {};
        },
        mounted() {
            // 这个JS计算不一定需要的
            // 假如你主动设置了before类的元素的高度
            const els = document.querySelectorAll('.text-wrapper');
            els.forEach(el => {
                el.firstElementChild.style.height = `${el.clientHeight}px`;
            });
        },
        methods: {}
    };
</script>
<style lang="stylus">
    @import "../../lib/css/flexible.styl"
    @import "../../lib/css/mobile.styl"

    #app {
        .text-wrapper {
            position relative
            width: 400px;
            max-height: 50px;
            font-size 14px;
            line-height: 25px;
            margin: 20px 20px 50px 30px;
            border: 1px solid #AAA;
            overflow: hidden;

            .before {
                float: left;
                width: 5px;
                background-color red
            }

            .content {
                float: right;
                width: 100%;
                margin-left: -5px;
                word-break: break-all;
            }

            &:after {
                content: "...";
                box-sizing: content-box;
                float: right;
                position: relative;
                width: 50px;
                height: 25px;
                top: -25px;
                left: 100%;
                margin-left: -50px;
                padding-right: 5px;
                font-size: 13px;
                text-align: right;
                background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff 40px);
            }
        }
    }
</style>
