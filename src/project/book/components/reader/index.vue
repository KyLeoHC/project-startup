<template>
  <div class="reader-container"
       @touchstart="onTouchStart"
       @touchmove.prevent="onTouchMove"
       @touchend="onTouchEnd">
    <article :class="{ 'flip-transition': needTransition }"
             :style="{ transform: `translateX(${offsetX}px)` }"
             v-html="content"
             ref="articleEl">
    </article>
  </div>
</template>
<script>
  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        offsetX: 0,
        needTransition: false,
        pageWidth: 0,
        scrollWidth: 0,
        gapWidth: 0,
        currentPage: 1
      };
    },
    watch: {
      content() {
        this.$nextTick(() => {
          this.initPageFlip();
        });
      }
    },
    record: {
      x: 0,
      y: 0,
      offsetX: 0
    },
    methods: {
      initPageFlip() {
        const articleEl = this.$refs.articleEl;
        const containerEl = articleEl.parentElement;
        const parentContainerEl = containerEl.parentElement;
        this.scrollWidth = containerEl.scrollWidth;
        this.pageWidth = articleEl.clientWidth;
        this.gapWidth = (parentContainerEl.clientWidth - this.pageWidth) / 2;
      },
      onTouchStart(event) {
        const record = this.$options.record;
        const touch = event.changedTouches[0];
        record.x = touch.clientX;
        record.y = touch.clientY;
        record.offsetX = this.offsetX;
        this.needTransition = false;
      },
      onTouchMove(event) {
        const record = this.$options.record;
        const touch = event.changedTouches[0];
        this.offsetX = record.offsetX + touch.clientX - record.x;
      },
      onTouchEnd(event) {
        const record = this.$options.record;
        const touch = event.changedTouches[0];
        this.needTransition = true;
        this.$nextTick(() => {
          if (Math.abs(touch.clientX - record.x) > this.pageWidth / 3) {
            const distance = this.pageWidth + this.gapWidth;
            if (touch.clientX > record.x) {
              // 往右滑动，上一页
              if (this.currentPage > 1) {
                --this.currentPage;
                this.offsetX = record.offsetX + distance;
                return;
              }
            } else {
              // 往左滑动，下一页
              if (-record.offsetX < (this.scrollWidth - distance)) {
                ++this.currentPage;
                this.offsetX = record.offsetX - distance;
                return;
              }
            }
          }
          this.offsetX = record.offsetX;
        });
      }
    }
  };
</script>
<style lang="stylus">
  .reader-container {
    height 100%
    font-size 18px
    overflow hidden

    article {
      height 100%
      margin 0 40px; /*rem*/
      column-width (750px - 2 * 40px); /*rem*/
      column-gap 40px; /*rem*/
      overflow visible

      &.flip-transition {
        transition transform .1s linear
      }
    }
  }
</style>
