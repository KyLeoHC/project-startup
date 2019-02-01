<template>
  <span :class="{
          'common-switch-btn': 1,
          'off': !value
        }"
        @click="onClickBtn">
  </span>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClickBtn() {
        this.$emit('input', !this.value);
      }
    }
  };
</script>
<style lang="stylus">
  HEIGHT = 16px

  .common-switch-btn {
    position relative
    display inline-block
    width 30px
    height HEIGHT
    border-radius (@height / 2) px
    background-color rgb(19, 206, 102)
    transition background-color .3s
    vertical-align center

    &:after {
      content: "";
      position absolute
      top 50%
      left 2px
      transform translateY(-50%)
      border-radius 100%
      transition all .3s
      width (HEIGHT - 4)
      height (HEIGHT - 4)
      background-color #fff
    }

    &.off {
      background-color #dcdfe6

      &:after {
        left 16px
      }
    }
  }
</style>
