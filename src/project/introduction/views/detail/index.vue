<template>
  <div class="detail-container">
    <ul>
      <li v-for="i in 20"
          :key="i">
        <span>detail - {{ i }}</span>
        <span class="iconfont icon-fac0601"/>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  };
</script>
<style lang="stylus">
  .detail-container {
    font-size 28px; /*px*/
  }
</style>
