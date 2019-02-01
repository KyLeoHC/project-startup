export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    data: {
      required: true
    },
    notLastKey: Boolean
  },
  computed: {
    dataVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    bracketsFormatter(brackets) {
      return this.notLastKey ? `${brackets},` : brackets;
    }
  }
};
