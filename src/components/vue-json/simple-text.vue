<template>
  <div>
    <span v-if="parentDataType === 'object'">{{ currentKey }}:</span>
    <span :class="`vjs__value__${dataType}`">
      {{ textFormatter(text) }}
    </span>
  </div>
</template>
<script>
  export default {
    props: {
      // 父级数据类型
      parentDataType: {
        type: String,
        default: ''
      },
      // 当前 text 数据类型
      dataType: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      notLastKey: {
        type: Boolean,
        default: false
      },
      currentKey: {
        type: [Number, String],
        default: ''
      }
    },
    methods: {
      textFormatter(text) {
        let output = text;
        if (this.dataType === 'string') output = `"${output}"`;
        if (this.notLastKey) output += ',';
        return output;
      }
    }
  };
</script>
