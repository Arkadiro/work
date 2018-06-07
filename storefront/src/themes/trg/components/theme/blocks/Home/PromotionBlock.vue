<template>
  <div class="promotion-block container flex flex-column">
    <div class="products w-100 flex around-xs">
      <slider :slides="slides.filter((e) => e.tag !== 'banner')"/>
      <div class="advertising height-400 pt45 mx20 col-xs-12 col-sm-3 col-md-3"
           :style="setBackground(product.image)"
           v-for="(product, index) in bannerProductsDesktop.filter((e) => e.tag === 'homepod')" :key="index"
      >
        <div class="fs30 weight-900 lh42 align-center">
          {{ product.name }}
          <div class="fs16 weight-900 lh30 align-center mb200">{{ product.subtitle }}</div>
        </div>
        <div class="flex center-xs">
          <button-outline link="/" color="yellow" class="fs14 weight-900">
            {{ product.button_text }}
          </button-outline>
        </div>
      </div>
      <div class="item-promo flex flex-column height-400 col-xs-12 col-sm-3 col-md-3 relative"
           v-for="(product, index) in products.filter((e) => e.tag === 'samsung')" :key="index"
           :style="setBackground(product.image)"
      >
        <div class="sticker-sale width-63 height-22 mt14 bg-cl-red cl-white weight-900 fs12 flex center-xs middle-xs">
          SALE 55%
        </div>
        <div class="wishlist-icon">
          <svg width="23px" height="22px" viewBox="0 0 23 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
            <desc>Created with Sketch.</desc>
            <defs/>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="mini_product_hover" transform="translate(-249.000000, -23.000000)" fill="#E64C3C">
                <g id="hurt" transform="translate(248.000000, 23.000000)">
                  <g id="hearts" transform="translate(1.000000, 0.000000)">
                    <path d="M11.4894818,22 C17.7150611,17.491313 20.8296368,13.3672457 22.2942455,10.22152 C24.0053372,6.54604246 22.5169137,1.98977774 18.7835507,0.460894252 C14.3952814,-1.33546389 11.4894818,2.80899382 11.4894818,2.80899382 C11.4894818,2.80899382 8.60432173,-1.34625883 4.21644931,0.450898936 C0.483086306,1.97978243 -1.00533718,6.53604715 0.705754459,10.2115246 C2.17036316,13.3568506 5.26390253,17.4917128 11.4894818,22 Z" id="Shape" fill-rule="nonzero"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="item-content start-xs col-md-12 col-sm-12 col-xs-6">
          <div class="item-name flex middle-xs fs15 lh20">
            {{ product.name }}
          </div>
          <div class="item-shop flex name-shop">
            <div class="">
              <i class="material-icons fs14">shopping_cart</i>
            </div>
            <div class="uppercase fs12 weight-900 lh16 ml5">
              {{ product.shop_name }}
            </div>
          </div>
          <div class="item-rating">
            <rating-stars/>
          </div>
          <div class="flex middle-xs">
            <div class="item-special-price fs24">
              {{ product.special_price }}
            </div>
            <div class="item-price fs15 ml15">
              {{ product.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <conditions/>
    <div class="products w-100 flex around-xs">
      <div class="advertising height-400 pt45 col-xs-12 col-sm-3 col-md-3 mr20"
           v-for="product in bannerProductsDesktop.filter((e) => e.tag === 'macbook' || e.tag === 'homepod2')" :key="product.id"
           :style="setBackground(product.image)"
      >
        <div class="fs30 weight-900 lh42 align-center" :class="{ 'cl-black': product.color === 'black', 'cl-white': product.color === 'white' }">
          {{ product.name }}
          <div class="fs16 weight-900 lh30 align-center mb200">{{ product.subtitle }}</div>
        </div>
        <div class="flex center-xs">
          <button-outline link="/" :color="product.button_bg" class="fs14 weight-900">
            {{ product.button_text }}
          </button-outline>
        </div>
      </div>
      <div class="banner-products no-desktop height-400 pt45 col-xs-12 col-sm-3 col-md-3 mr20"
           v-for="item in bannerProductsMobile" :key="item.id"
           :style="setBackground(item.image)"
      >
        <div class="fs30 weight-900 lh42 align-center" :class="{ 'cl-black': item.color === 'black', 'cl-white': item.color === 'white' }">
          {{ item.name }}
          <div class="fs16 weight-900 lh30 align-center">{{ item.subtitle }}</div>
        </div>
        <div class="flex start-xs">
          <button-outline link="/" :color="item.button_bg" class="fs14 weight-900 mt10">
            {{ item.button_text }}
          </button-outline>
        </div>
      </div>
      <slider :slides="slides.filter((e) => e.tag === 'banner')" class="no-mobile" />
    </div>
  </div>
</template>

<script>
// import { coreComponent } from 'core/lib/themes'
import ButtonOutline from '../../ButtonOutline.vue'
import sliderData from 'theme/resource/slider.json'
import Conditions from './Conditions.vue'
import Slider from './Slider.vue'
// import RatingStars from './RatingStars.vue'
import ProductsData from 'theme/resource/products.json'
import BannerProducts from 'theme/resource/banner_products.json'
export default {
  name: 'PromotionBlock',
  data () {
    return {
      slides: [],
      products: [],
      bannerProductsDesktop: [],
      bannerProductsMobile: []
    }
  },
  created () {
    this.slides = sliderData.slides
    this.products = ProductsData.data
    this.bannerProductsDesktop = BannerProducts.desktop
    this.bannerProductsMobile = BannerProducts.mobile
  },
  components: {
    ButtonOutline,
    // RatingStars,
    Conditions,
    Slider
  },
  methods: {
    setBackground (image) {
      return `background-image: url(${image})`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
div {
  box-sizing: border-box;
}

.VueCarousel {
  height: 100%;
}
.VueCarousel-wrapper {
  height: 100%;
}
.item-promo {
  background-repeat: no-repeat;
  background-position: center 10%;
  border: 1px solid #E1E1E1;
}
.products {
  height: 400px;
  flex-wrap: nowrap;
}

.description {
  font-family: Avenir;
}
.name-shop {
  color: #3399FF;
}
.advertising, .banner-products {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.sticker-sale {
  margin-left: -0.5rem;
}
.item-content {
  position: absolute;
  bottom: 11px;
}
.item-price {
  text-decoration: line-through;
  color: rgba(72,71,90,0.5);
}
.wishlist-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}

@media (min-width: $screen__m+1) and (max-width: $screen__l) {
  .promotion-block {
    width: 100vw;
  }
  .advertising {
    margin-right: 5px;
    margin-left: 5px;
  }
}

@media (max-width: $screen__m) {
  .advertising, .description {
    display: none;
  }
  .banner-products {
    height: 215px;
    margin-right: 0;
    margin-bottom: 10px;
    div {
      text-align: left;
    }
  }
  .products {
    height: auto;
    flex-wrap: wrap;
  }
  .item-promo {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 185px;
    width: 100%;
    background-position: 18% center;
    background-size: contain;
    background-origin: content-box;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .item-content {
    right: 0;
  }
  .item-shop {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .item-rating {
    margin-bottom: 5px;
  }
  .wishlist-icon {
    top: 10px;
    right: 10px;
  }
}
</style>
