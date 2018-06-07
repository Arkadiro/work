<template>
  <div class="product brdr-1 brdr-cl-lightgray4 relative" @click.prevent="addToWatched(product)">
    <router-link
      class="no-underline block"
      :to="{
        name: 'product',
        params: {
          sku: product.sku,
          slug: product.slug
        }
      }"
    >
      <div class="product-promotion fs14 absolute bg-cl-blue2 pl13 pr15 py7 brdr-r-top-right-20 brdr-r-bottom-right-20" v-if="product.promoted">
        <span class="product-promotion-text weight-900 cl-white">{{ $t('Promoted product') }}
          <i class="trg-icons star-full-ico fs14 cl-white"/>
        </span>
      </div>
      <add-to-favorite :product="product" :class="'hidden'"/>
      <div class="product-wrap flex flex-column between-xs p20 pb15 relative">
        <div class="product-img-wrap align-center col-xs-6 col-sm col-md">
          <transition name="fade" appear>
            <img
              v-if="instant"
              :src="thumbnail"
              :key="thumbnail"
              v-img-placeholder="placeholder"
              :alt="productName"
            >
            <img
              v-if="!instant"
              v-lazy="thumbnailObj"
              :key="thumbnail"
              :alt="product.name"
            >
          </transition>
        </div>
        <div class="product-info col-xs-6 col-sm col-md relative flex">
          <div class="product-info-top top-xs hidden-md">
            <span class="product-price-amount-sales-top bg-cl-lightgray4 cl-red1 px8 py4 brdr-round4 fs12 weight-500 lh13 hidden-desktop" v-if="isOnSale">-50%</span>
          </div>
          <div class="product-info-bottom bottom-self align-left">
            <div class="product-name fs15 cl-dark-blue lh20" :class="{'pb14': accessories}">
              <span :title="productName">{{ productName }}</span>
            </div>
            <div class="product-shop cl-lightblue fs12 lh16 weight-900 my5 flex middle-xs" v-if="!accessories">
              <i class="material-icons fs14">shopping_cart</i><span>NAME VENDER</span>
            </div>
            <no-ssr>
              <vue-stars
                :name="`productId_${product.id}`"
                :active-color="'#FFDB5E'"
                :inactive-color="'#E1E1E1'"
                :max="5"
                :value="3"
                :readonly="true"
              >
                <svg width="15px" height="16px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg width="15px" height="16px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </vue-stars>
            </no-ssr>
            <div class="product-price flex bottom-xs">
              <div class="product-price-main cl-red3 weight-900 lh33 fs15 mr10">
                <span v-show="priceProduct !== ''" v-html="this.$options.filters.price(priceProduct)"/>
                <span class="product-price-sales fs15 weight-400 ml10" v-if="isOnSale">
                  <span class="product-price-before relative mr10 cl-gray"><i>$</i>219.00</span>
                  <span class="product-price-amount-sales bg-cl-lightgray4 cl-red1 px8 py4 brdr-round4 fs12 weight-500 lh13 hidden-xs">-50%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { coreComponent, themeComponent } from 'core/lib/themes'
import imgPlaceholder from 'theme/components/theme/directives/imgPlaceholder'
import AddToFavorite from 'theme/components/theme/blocks/Product/AddToFavorite'
import VueStars from 'vue-stars'
import NoSSR from 'vue-no-ssr'

export default {
  props: {
    instant: {
      type: Boolean,
      required: false,
      default: () => false
    },
    labelsActive: {
      type: Boolean,
      requred: false,
      default: true
    },
    product: {
      type: Object,
      required: true
    },
    accessories: {
      type: Boolean,
      default: false
    }
  },
  mixins: [coreComponent('ProductTile'), themeComponent('theme/ProductModel')],
  directives: { imgPlaceholder },
  created () {
    this.$bus.$on('product-after-priceupdate', (product) => {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    })
    this.$bus.$on('product-after-configured', (config) => {
      this.$store.dispatch('product/configure', { product: this.product, configuration: config.configuration, selectDefaultVariant: false }).then((selectedVariant) => {
        if (selectedVariant) {
          this.product.parentSku = this.product.sku
          Object.assign(this.product, selectedVariant)
          this.$store.dispatch('product/doPlatformPricesSync', { products: [this.product] }, { root: true }).then((syncResult) => { // TODO: queue all these tasks to one
          })
        }
      })
    })
  },
  data () {
    return {
      clicks: 0,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  computed: {
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder
      }
    },
    isOnSale () {
      return this.product.sale === '1' ? 'sale' : ''
    },
    isNew () {
      return this.product.new === '1' ? 'new' : ''
    }
  },
  components: {
    AddToFavorite,
    VueStars,
    'no-ssr': NoSSR
  },
  methods: {
    addToWatched (product) {
      this.$store.dispatch('watched/addItem', product)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);

.product {
  width: 100%;
  height: 435px;
  * {
    box-sizing: border-box;
  }
  a {
    height: 100%;
    z-index: 2;
  }
  &:hover {
    .favorite {
      display: block;
    }
    &:after {
      opacity: 1;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 35px 0px #b7b7b7;
    opacity: 0;
    transition: 0.2s;
    z-index: 1;
  }
  .product-img-wrap {
    img {
      max-width: 100%;
      max-height: 270px;
    }
  }
  .product-wrap {
    height: 100%;
  }
  .product-promotion {
    left: -1px;
    top: 20px;
    z-index: 1;
  }
  .product-name {
    max-height: 40px;
    overflow: hidden;
  }
  .product-price-before {
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 100%;
      height: 1px;
      background-color: color(gray);
    }
  }
  .favorite {
    &.active {
      display: block;
    }
  }
  .product-info-top {
    padding: 5px 0;
    height: 35px;
  }
  .product-price-amount-sales-top {
    top: -8px;
    left: 8px;
  }
  @media (max-width: $screen__m - 1) {
    height: auto;
    &:after {
      box-shadow: none;
    }
    .product-info {
      flex-direction: column;
      align-self: stretch;
    }
    .product-wrap {
      align-items: center;
      flex-direction: row;
      padding: 12px 5px;
      min-height: 185px;
    }
    .product-info-bottom {
      align-self: stretch;
    }
    .promotion {
      left: 0;
    }
    .favorite {
      display: block;
      svg {
        top: 15px;
        right: 15px;
      }
    }
    .product-name {
      height: 40px;
      padding-right: 40px;
      overflow: hidden;
    }
    .product-img-wrap {
      img {
        max-width: 100%;
        max-height: 150px;
      }
    }
    .product-price-sales {
      font-size: 14px;
    }
  }
  @media (max-width: $screen__xxs - 1) {
    .product-price-main {
      font-size: 20px;
    }
    .product-price-before {
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';

.product {
  .vue-stars {
    position: relative;
    left: -2px;
    svg {
      polygon {
        stroke: color(gray5);
        stroke-width: 0.5px;
      }
    }
    label {
      width: 1.1em;
    }
  }
  @media (max-width: $screen__xs - 1) {
    .vue-stars {
      label {
        width: 0.8em;
      }
      svg {
        height: 12px;
        width: 12px;
      }
    }
  }
}
</style>
