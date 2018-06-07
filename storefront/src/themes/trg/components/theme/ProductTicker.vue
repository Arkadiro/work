<template>
  <div class="product-ticker align-left border-box w-700 pl18 pr27 pt20 pb25 brdr-1 brdr-cl-gray-light bg-cl-white relative w-100" :class="[ isVisibleMore ? 'product-ticker-opened absolute' : '' ]">
    <div class="">
      <div class="no-underline feature-items w-100 relative">
        <div class="weight-400 fs12 product-count absolute">{{ product.id }}</div>
        <div class="row">
          <div class="product-ticker-image relative flex center-xs middle-xs py10 col-md-12 col-xs-12">
            <transition name="fade" appear>
              <img
                class="mw-100"
                v-if="instant"
                :src="thumbnail"
                :key="thumbnail"
                v-img-placeholder="placeholder"
                :alt="productName"
              >
              <img
                class="mw-100 opacity9"
                v-if="!instant"
                v-lazy="thumbnailObj"
                :key="thumbnail"
                :alt="productName"
              >
            </transition>
          </div>
        </div>
        <div class="product-content col-xs-8 pl0 pr0">
          <div class="product-info">
            <div class="feature-row">
              <p class="feature-text product-name cl-black fs14 lh20 weight-500 mt0 mb0">{{ productName | htmlDecode }}</p>
            </div>
            <div class="feature-row product-link mb4">
              <router-link
                :to="{
                  name: 'product-model',
                  params: {
                    sku: product.identifier,
                    slug: product.slug
                  }
                }"
                class="feature-link fs12 weight-400 no-underline cl-button-primary">
                Смотреть предложения
              </router-link>
            </div>
            <div class="feature-row product-id">
              <p class="feature-title opacity5 cl-black fs12 lh14 weight-400 my0">{{ product.identifier }}</p>
            </div>
          </div>
          <div class="product-description mb8">
            <div class="feature-text ellipsis cl-black fs12 lh18 weight-400 mt2 mb5">
              <div class="feature-text ellipsis cl-black fs12 lh18 weight-400 mt2 mb5">
                {{ productDescription | htmlDecode }}
              </div>
            </div>
          </div>
        </div>

        <div class="mr60 product-buy">
          <add-to-cart
            :product="product"
            class="fs14"
          />
        </div>
      </div>
    </div>
    <div class="favorites absolute align-right">
      <add-to-favorite :product="product"/>
      <add-to-compare :product="product"/>
    </div>
  </div>
</template>

<script>
import { themeComponent } from 'core/lib/themes'
import AddToFavorite from './AddToFavorite.vue'
import AddToCompare from './AddToCompare.vue'
import imgPlaceholder from 'theme/components/theme/directives/imgPlaceholder'
import AddToCart from 'theme/components/core/AddToCart.vue'
import { productThumbnailPath } from 'core/helpers'

export default {
  name: 'ProductTicker',
  props: {
    instant: {
      type: Boolean,
      required: false,
      default: () => false
    },
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isVisibleMore: false,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  directives: { imgPlaceholder },
  components: {
    AddToFavorite,
    AddToCompare,
    AddToCart
  },
  computed: {
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder
      }
    },
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, 310, 300)
    }
  },
  mixins: [themeComponent('theme/ProductModel')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/variables/responsive';
  @import '~theme/css/helpers/functions/color';
  $color-shadow: color(gray-shadow);
  $color-green: color(green);

  .product-ticker {
    max-width: 307px;
    min-height: 375px;
    min-width: 225px;
    overflow: hidden;
    height: 485px;

    &-image {
      height: 222px;
      width: 100%;
      img {
        max-height: 100%;
      }
    }

    .product-name {
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 40px;
      height: 40px;
    }

    .product-count {
      margin-top: -7px;
    }

    .product-content {
      display:  flex;
      flex-direction: column;
      max-width: 100%;
    }

    .ellipsis {
      overflow: hidden;
      height: 90px;
      text-overflow: ellipsis;
    }
    .all-offer {
      bottom: 25px;
      max-width: calc(100% - 45px);
      &:hover {
        background-color: $color-green;
      }
    }
    .arrow-down {
      transform: rotate(90deg);
    }
    .arrow-up {
      transform: rotate(-90deg);
    }
    &:hover {
      box-shadow: 0 7px 12px 0 $color-shadow;
    }
    .favorites {
      bottom: 30px;
      right: 8px;
    }

    @media (max-width: ($screen__m - 1)) {

      max-height: 355px;
      max-width: 100%;
      height: auto;
      min-height: auto;
      padding: 6px 8px 6px;
      border: none;
      border-right: none;
      border-top: 1px solid rgba(5, 7, 70, 0.2);

      .product-count {
        align-self: baseline;
        padding-left: 7px;
        padding-top: 20px;
      }

      .feature-items {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .product-ticker-image {
        max-width: 95px;
        max-height: 115px;
        margin-bottom: 0;
      }
      .product-content {
        align-items: unset;
        flex-direction: column;
        & > .feature-row {
          padding-right: 0;
          width: auto;
          max-width: initial;
        }
        .feature-title {
          margin-bottom: 2px;
        }
      }
      .product-description {
        margin-right: 0;
        max-width: 100%;
        margin-bottom: 0;
      }
      .favorites {
        right: 0;
        bottom: 14px;
      }
      .product-info {
        max-width: 215px;
        margin-right: 10px;
      }
      .product-buy {
        margin-left: auto;
        margin-top: 10px;
        margin-right: 60px;
        width: 160px;
      }
    }
  }
  .ticker-list-style .product-ticker .product-name {
    height: auto;
  }
  .product-ticker-opened {
    top: 0;
    width: calc(100% - 16px);
    z-index: 5;
    box-shadow: 0 7px 12px 0 $color-shadow;
  }
  .feature-link {
    text-decoration: underline;
  }
  .feature-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product-count {
    top: -4px;
    left: -6px;
    z-index: 1;
  }

  @media (max-width: ($screen__m - 1)) {
    .ticker-wrapper {
      padding-bottom: 0;
    }
  }

  @media (min-width: ($screen__l)) {
    .ticker-list-style .product-info {
      display: flex;
      flex-wrap: wrap;
      .product-name {
        margin-bottom: 5px;
      }
      .product-link {
        order: 2;
        width: 100%;
      }
      .product-id {
        order: 1;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }

</style>
