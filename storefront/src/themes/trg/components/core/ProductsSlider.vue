<template>
  <div class="collection container">
    <div class="collection-title fs24 weight-900 lh33 cl-black2 mb0 mt5" :class="{'fs30 lh42 cl-dark-blue accessories':accessories}">
      <span>{{ title }}</span>
    </div>
    <div class="collection-slider__wrap">
      <template v-if="isDesktop || isTablet || accessories">
        <no-ssr>
          <carousel :per-page="1" v-bind="config" class="row">
            <slide v-for="(product, index) in products" :key="index" class="col-xs-12 col-md col-lg-3">
              <product-tile
                class="collection-product"
                :product="product"
                :labels-active="false"
                :accessories="accessories"
              />
            </slide>
          </carousel>
        </no-ssr>
      </template>
      <template v-if="isMobile && !accessories">
        <div class="row">
          <div v-for="(product, index) in products" :key="index" class="col-xs-12 col-md col-lg-3">
            <product-tile
              class="collection-product"
              :product="product"
              :labels-active="false"
              :accessories="accessories"
              :class="{'last-elem': index === products.length-1}"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import ProductTile from 'theme/components/core/ProductTile.vue'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient.vue'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    accessories: {
      type: Boolean,
      default: false
    }
  },
  mixins: [coreComponent('ProductsSlider'), AdaptiveWidthClient],
  components: {
    Slide,
    Carousel,
    ProductTile,
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';
@import '~theme/css/components/slider';

.collection {
  .collection-slider__wrap {
    top: -10px;
  }
  .collection-product {
    height: 435px;
    @media (max-width: $screen__m) {
      border-left-color: transparent;
      border-right-color: transparent;
      height: 100%;
    }
    @media (max-width: $screen__xs) {
      border-bottom: transparent;
      border-left-color: color(lightgray4);
      border-right-color: color(lightgray4);
      &.last-elem {
        border-bottom: 1px solid color(lightgray4);
      }
    }
  }
  @media (max-width: $screen__m) {
    .collection-title {
      font-size: 20px;
      color: color(dark-blue);
      margin-bottom: 5px;
    }
    .accessories {
      padding-left: 7px;
      margin-bottom: 0;
      line-height: 27px;
    }
  }
}
</style>
