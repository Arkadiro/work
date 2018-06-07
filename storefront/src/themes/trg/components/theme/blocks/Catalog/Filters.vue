<template>
  <div class="filter round-select round-select-filter"
       :class="['filter-' + code, opened ? 'active' : '' ]">
    <div class="round-select-content sortselect relative">
      <div class="round-select-title sort-name cursor-pointer flex middle-xs" @click="sortVisible">{{ code }}<i class="lanit-icons arrow-down-ico ml5 fs18 lh22 align-left" /></div>
      <div v-if="opened" class="m0 p0" v-on-click-outside="closeSort" />
      <div class="round-select-drop absolute align-left bg-cl-white"
           v-show="opened"
           @click="closeSort">
        <div
          class="cursor-pointer select-item py3"
          v-for="(filterItem, index) in filter"
          :key="index">
          <color-selector
            v-if="code === 'color'"
            context="category"
            :attribute_code="filterItem"
            code="color"
            :id="filterItem.id"
            :label="filterItem.label"
          />
          <size-selector
            v-else-if="code==='size'"
            context="category"
            :attribute_code="filterItem"
            code="size"
            class="size-select mr10 mb10"
            :id="filterItem.id"
            :label="filterItem.label"
          />
          <price-selector
            v-else-if="code==='price'"
            context="category"
            :attribute_code="filterItem"
            class="price-select mb10 block"
            code="price"
            :id="filterItem.id"
            :from="filterItem.from"
            :to="filterItem.to"
            :content="filterItem.label"
            :label="filterItem.label"
          />
          <generic-selector
            v-else
            context="category"
            :attribute_code="filter.attribute_code"
            class="price-select mb10 mr10 block"
            code="price"
            :id="filterItem.id"
            :label="filterItem.label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import PriceSelector from 'theme/components/core/PriceSelector.vue'
import GenericSelector from 'core/components/GenericSelector.vue'

export default {
  data () {
    return {
      opened: false
    }
  },
  props: {
    sortParams: {
      type: Object,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    },
    filter: {
      type: Array,
      required: true
    },
    code: {
      type: String,
      required: true,
      default: ''
    }
  },
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector
  },
  methods: {
    sortVisible () {
      !this.opened ? this.opened = !this.opened : this.opened = false
    },
    closeSort () {
      this.opened = false
    }
  }
}
</script>
