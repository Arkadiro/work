<template>
  <div class="sorting round-select active">
    <div class="round-select-content sortselect relative">
      <div class="round-select-title sort-name cursor-pointer flex middle-xs" @click="sortVisible">{{ sortParams.sortName }}<i class="lanit-icons arrow-down-ico ml5 fs18 lh22 align-left" /></div>
      <div class="round-select-drop absolute align-left bg-cl-white"
           v-if="sortParams.sortVisible"
           @click="closeSort"
           v-on-click-outside="closeSort">
        <div class="cursor-pointer select-item py3" @click="$emit('newSort', ['', $event])" v-show="currentSort !== ''">По умолчанию</div>
        <div class="cursor-pointer select-item py3" @click="$emit('newSort', ['id:desc', $event])" v-show="currentSort !== 'id:desc'">По новинкам</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sortParams: {
      type: Object,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    }
  },
  methods: {
    sortVisible () {
      !this.sortParams.sortVisible ? this.sortParams.sortVisible = !this.sortParams.sortVisible : ''
    },
    closeSort () {
      this.sortParams.sortVisible = false
    }
  }
}
</script>
