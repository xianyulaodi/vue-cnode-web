<template>
  <div v-show="show" class="loading-mask">
      <div class="loading">
        <i class="iconfont icon-loading"></i>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .loading {
      text-align: center;
      .icon-loading {
        color: #fff;
        animation: loading 1s infinite linear;
      }
      @keyframes loading {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>
