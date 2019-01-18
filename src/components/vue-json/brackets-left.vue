<template>
    <div>
        <slot></slot>
        <span v-if="dataVisible"
              class="vjs__tree__node"
              @click.stop="dataVisible = !dataVisible">
          {{ Array.isArray(data) ? '[' : '{' }}
        </span>
        <span v-if="!dataVisible"
              class="vjs__tree__node"
              @click.stop="dataVisible = !dataVisible">
          {{ bracketsFormatter(Array.isArray(data) ? '[...]' : '{...}') }}
        </span>
    </div>
</template>

<script>
    import bracketsMixin from './mixins/brackets-mixin';

    export default {
        mixins: [bracketsMixin]
    };
</script>
