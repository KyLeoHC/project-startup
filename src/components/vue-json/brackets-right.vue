<template>
  <div>
    <span class="vjs__tree__node"
          v-if="dataVisible"
          @click.stop="dataVisible = !dataVisible">
      {{ bracketsFormatter(Array.isArray(data) ? ']' : '}') }}
    </span>
  </div>
</template>

<script>
  import bracketsMixin from './mixins/brackets-mixin';

  export default {
    mixins: [bracketsMixin]
  };
</script>
