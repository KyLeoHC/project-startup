<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App'
  };
</script>
<style lang="stylus">
    @import "~styles/flexible.styl"
    @import "~styles/mobile.styl"
    #app {
        height 100%
    }
</style>
