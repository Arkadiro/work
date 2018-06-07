<template>
  <div class="product-listing row m0 center-xs start-md">
    <template v-if="banners.length && !iscategory">
      <div class="product-listing-items w-100">
        <div class="row">
          <div class="product-listing-wrap mb16 col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(product, index) in products" :key="index">
            <template v-if="banners[counter.value()] && ((index+1)/bannerFirst === 1 || (index+1)/bannerSecond === 1 || ((index+1)%bannerOther === 0 && index > 8))">
              <banner-tile :product="banners[counter.valueAndIncrement()]"/>
            </template>
            <template v-else>
              <product-tile
                class="product-listing-item"
                :product="product"
                :class="{'last-elem': index === products.length-1}"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if="banners.length && iscategory">
      <div class="product-listing-items w-100">
        <div class="row">
          <div class="product-listing-wrap mb16 col-xs-12 col-sm-6 col-md-4" v-for="(product, index) in products" :key="index">
            <template v-if="isDesktop && banners[counter.value()] && ((index+1)/bannerCategory === 1 || (index+1)/(bannerCategory+1) === 1 || (index+1)/(bannerCategory+2) === 1 )">
              <banner-tile :product="banners[counter.valueAndIncrement()]"/>
            </template>
            <template v-else>
              <product-tile
                class="product-listing-item"
                :product="product"
                :class="{'last-elem': index === products.length-1}"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!banners.length">
      <div
        v-for="(product, key) in products"
        :key="product.id"
        class="pb10 col-xs-12 col-sm-6 col-md-4"
      >
        <product-tile :product="product" :instant="key < 6 ? true : false" />
      </div>
    </template>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import ProductTile from './ProductTile.vue'
import BannerTile from 'theme/components/theme/BannerTile.vue'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient.vue'

export default {
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    },
    banners: {
      type: Array,
      default: () => []
    },
    iscategory: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ProductTile,
    BannerTile
  },
  methods: {
    counterBanner () {
      let counter = 0
      function changeBy (val) {
        counter += val
      }
      return {
        increment: function () {
          changeBy(1)
        },
        value: function () {
          return counter
        },
        reset: function () {
          counter = 0
        },
        valueAndIncrement: function () {
          const currentCount = this.value()
          this.increment()
          return currentCount
        }
      }
    }
  },
  data () {
    return {
      bannerFirst: 2,
      bannerSecond: 8,
      bannerOther: 7,
      bannerIndex: 0,
      counter: this.counterBanner(),
      bannerCategory: 13
    }
  },
  watch: {
    'products': function () {
      this.counter.reset()
    }
  },
  mixins: [coreComponent('ProductListing'), AdaptiveWidthClient]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';

.product-listing {
  @media (max-width: $screen__m - 1) {
    .product-listing-wrap {
      margin-bottom: 0;
    }
    .product-listing-item {
      border-bottom: none;
      &.last-elem {
        border-bottom: 1px solid color(lightgray4);
      }
    }
  }
}
</style>
