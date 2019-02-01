export default {
  name: 'TooltipContent',
  data() {
    return {
      visible: false,
      position: null,
      contentClass: ''
    };
  },
  render(h) {
    return h('div', {
      class: `tooltip-content ${this.contentClass}`,
      style: {
        display: this.visible ? '' : 'none',
        top: `${this.position ? this.position.offsetTop : 0}px`,
        left: `${this.position ? this.position.offsetLeft : 0}px`
      }
    }, this.__slot || []);
  }
};
