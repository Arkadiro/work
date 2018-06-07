<template>
  <div class="sidebar brdr-1 brdr-cl-gainsboro flex flex-column">
    <div v-for="(filter, filterIndex) in filters"
         :key="filterIndex" v-if="filter.length"
         class="filter-item">
      <div v-if="filterIndex==='price'" class="brdr-bottom brdr-cl-gainsboro py3 px18">
        <div class="flex start-xs middle-xs py15 title relative" @click="isVisiblePrice = !isVisiblePrice">
          <div class="fs22 lh22 pr10 cl-dark-blue pointer" :class="[ isVisiblePrice ? 'arrow-up pl10 relative' : '' ]"><i class="trg-icons keyboard_arrow_down-ico"/></div>
          <div class="filter-title fs14 weight-900 cl-dark-blue">{{ $t('Filter by price') }}</div>
        </div>
        <price-button
          context="category"
          :attribute_code="price"
          class="price-select pb20 block"
          :class="[ isVisiblePrice ? 'show' : 'hide']"
          code="price"
          v-for="(price, index) in filter"
          :key="index"
          :id="price.id"
          :from="price.from"
          :to="price.to"
          :content="price.label"
          :label="price.label"
        />
      </div>
      <!--<div v-else-if="filterIndex==='color'">-->
      <!--<color-selector-->
      <!--context="category"-->
      <!--:attribute_code="color"-->
      <!--code="color"-->
      <!--v-for="(color, index) in filter"-->
      <!--:key="index"-->
      <!--:id="color.id"-->
      <!--:label="color.label"-->
      <!--/>-->
      <!--</div>-->
      <div v-else-if="filterIndex==='size'" class="brdr-bottom brdr-cl-gainsboro py3 px18">
        <div class="flex start-xs middle-xs py15 title relative" @click="isVisibleSize = !isVisibleSize">
          <div class="fs22 lh22 pr10 cl-dark-blue pointer" :class="[ isVisibleSize ? 'arrow-up pl10 relative' : '' ]"><i class="trg-icons keyboard_arrow_down-ico"/></div>
          <div class="filter-title fs14 weight-900 cl-dark-blue">{{ $t('Filter size') }}</div>
        </div>
        <div :class="[ isVisibleSize ? 'show' : 'hide']">
          <size-selector
            context="category"
            :attribute_code="size"
            code="size"
            class="size-select mr10 mb10"
            v-for="(size, index) in filter"
            :key="index"
            :id="size.id"
            :label="size.label"
          />
        </div>
      </div>
      <!--<div v-else>-->
      <!--<generic-selector-->
      <!--context="category"-->
      <!--:attribute_code="filter.attribute_code"-->
      <!--class="price-select mb10 block"-->
      <!--code="price"-->
      <!--v-for="(option, index) in filter"-->
      <!--:key="index"-->
      <!--:id="option.id"-->
      <!--:label="option.label"-->
      <!--/>-->
      <!--</div>-->
    </div>

    <div class="px18 py3 brdr-bottom brdr-cl-gainsboro filter-item">
      <div class="flex start-xs middle-xs py15 title relative" @click="isVisibleBrands = !isVisibleBrands">
        <div class="fs22 lh22 pr10 cl-dark-blue pointer" :class="[ isVisibleBrands ? 'arrow-up pl10 relative' : '' ]"><i class="trg-icons keyboard_arrow_down-ico"/></div>
        <div class="filter-title fs14 weight-900 cl-dark-blue">{{ $t('Filter') }}</div>
      </div>
      <div class="flex-column pl27 pb10" :class="[ isVisibleBrands ? 'show' : 'hide']">
        <div class="fs15 lh22 mb8 cl-dark-blue" v-for="rows in brands" :key="rows.name" :value="rows.name">
          <checkbox @changed-flag="flag = $event" :is-checked="false" :labeltext="rows.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import ColorSelector from '../../ColorSelector.vue'
import SizeSelector from '../../SizeSelector.vue'
import PriceButton from '../../PriceSelector.vue'
import GenericSelector from 'core/components/GenericSelector.vue'
import Checkbox from '../../../theme/Checkbox'
import Brands from '../../../../../../themes/trg/resource/brands.json'

export default {
  data () {
    return {
      isVisiblePrice: true,
      isVisibleBrands: true,
      isVisibleSize: false,
      brands: Brands
    }
  },
  components: {
    ColorSelector,
    SizeSelector,
    PriceButton,
    GenericSelector,
    Checkbox,
    Brands
  },
  mixins: [coreComponent('blocks/Category/Sidebar')]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
.sidebar {
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .arrow-up {
    transform: rotate(180deg);
    padding-right: 0;
    bottom: 4px;
  }
  .filter-item:last-child {
    border-bottom: none;
  }
}
</style>
