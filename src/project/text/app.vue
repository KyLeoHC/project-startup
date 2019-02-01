<template>
  <div id="app">
    <div class="text-wrapper">
      <div class="before"></div>
      <div class="content">
        我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本我是长文本
      </div>
    </div>
    <div @click="linkToHome">link to home</div>
    <div @click="linkToIntroduction">link to introduction</div>
  </div>
</template>
<script>
  import router from '@/common/router';

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
    methods: {
      linkToHome() {
        router.push({
          project: 'home',
          path: '/',
          query: {
            word: 'hello'
          }
        });
      },
      linkToIntroduction() {
        router.push({
          history: true,
          project: 'introduction',
          path: '/detail',
          query: {
            word: 'hello'
          }
        });
      }
    }
  };
</script>
<style lang="stylus">
  @import "~styles/flexible.styl"
  @import "~styles/mobile.styl"

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
