<template>
  <div>
    <div slot-scope="list">
      
    </div>
    <div v-if="isEnd">没有更多数据了~</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    isEnd: {
      type: Bollean,
      default: false
    }
  },
  methods: {
    bindUi() {

    },
    unBindUi() {

    }
  },
  destoryed() {
    this.unBindUi();
  }
}
</script>

<vue-scroll
  @loadMore = xxx
  :isEnd = false,
  :isStart = false
>

</vuu-scroll>