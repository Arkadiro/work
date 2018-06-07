<template>
  <div class="container pb50 watched-slider" v-if="products.length">
    <div class="slider-name fs30 weight-900 lh42 pb10 pt40 cl-dark-blue">
      You watched
    </div>
    <div class="carousel-container">
      <no-ssr>
        <carousel v-bind="config" class="row">
          <slide v-for="(product, index) in products" :key="index" class="col-xs-4 col-md col-lg-3">
            <router-link
              class="underline"
              :to="{
                name: 'product',
                params: {
                  sku: product.sku,
                  slug: product.slug
                }
              }"
            >
              <div class="content brdr-1 brdr-cl-silver2 relative">
                <div class="row middle-md py22 px22 content-wrap">
                  <div class="product-image col-md-4">
                    <img :src="thumbnail(product)" :alt="getProductName(product)">
                  </div>
                  <div class="product-text col-md-8 pl24">
                    <div class="title fs15 lh18 cl-gray2">{{ getProductName(product) }}</div>
                    <div class="price fs18 lh25 weight-900 cl-dark-blue">from {{ getProductPriceUSD(product) | price }}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </slide>
        </carousel>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { productName, productThumbnailPath, productPriceUSD } from 'core/helpers'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Slider',
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  data () {
    return {
      config: {
        navigationNextLabel: '',
        navigationPrevLabel: '',
        perPage: 4,
        paginationSize: 7,
        paginationPadding: 3,
        navigationEnabled: true,
        paginationEnabled: true,
        perPageCustom: [[320, 3], [768, 3], [1024, 3], [1200, 4], [2560, 4]],
        paginationActiveColor: '#2F2F2F',
        paginationColor: '#9EA19A'
      }
    }
  },
  methods: {
    thumbnail (product) {
      let imagePath = productThumbnailPath(product)
      return imagePath
    },
    getProductName (product) {
      return productName(product)
    },
    getProductPriceUSD (product) {
      return productPriceUSD(product)
    }
  },
  created () {
    this.$store.dispatch('watched/load') // Load 'watched' from the indexedDb
  },
  computed: {
    products () {
      return this.$store.state.watched.itemsWatched
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

  .carousel-container .content {
    height: 100%;
  }
  .product-image img {
    max-width: 100%;
    max-height: 90px;
  }
  @media (max-width: $screen__m) {
    .slider-name {
      font-size: 20px;
      line-height: 22px;
      padding-top: 28px;
      padding-bottom: 2px;
    }
    .price {
      font-size: 16px;
      line-height: 25px;
    }
    .title {
      font-size: 14px;
    }
    .product-image img {
      width: auto;
      max-width: 100%;
      max-height: 75px;
    }
  }
  @media (max-width: $screen__l) {
    .watched-slider {
      padding-bottom: 0;
    }
    .carousel-container {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      padding-top: 8px;
    }
    .carousel-container .content {
      margin-right: 0;
      padding-left: 0;
      padding-top: 0;
      border-right: none;
    }
    .content-wrap {
      padding: 8px 9px 0 9px;
    }
    .product-image {
      margin-left: auto;
      margin-right: auto;
    }
    .product-text {
      padding-top: 5px;
      padding-left: 9px;
      padding-right: 4px;
      flex-basis: 100%;
    }
    .product-image, .product-text {
      max-width: 100%;
    }
  }
</style>
