<template>
  <div class="special-product w-100">
    <div class="special-product-item w-100 relative" :style="`background-color: ${product.bgcolor}`">
      <div class="product-promotion fs14 absolute bg-cl-blue2 pl13 pr15 py7 brdr-r-top-left-20 brdr-r-bottom-left-20 hidden-xs" v-if="product.promoted">
        <span class="product-promotion-text weight-900 cl-white">Promoted product
          <i class="trg-icons star-full-ico fs14 cl-white"/>
        </span>
      </div>
      <div class="special-product-image middle-xs center-xs absolute col-xs-6 col-sm-12 col-md-12 flex">
        <img :src="product.image">
      </div>
      <div class="special-product-info conditions-item flex between-xs flex-column py50 w-100 relative col-xs-6 col-sm-12 col-md-12">
        <div class="special-product-title fs30 weight-900 lh42 align-center" :style="`color: ${product.textColor}`">
          {{ product.name }}
          <div class="fs16 weight-900 lh30">
            <span v-if="product.price">to {{ product.price }}</span>
            <span v-else-if="product.subname">{{ product.subname }}</span>
          </div>
        </div>
        <div class="btn-shop-now w-100 align-center">
          <button-outline :link="product.link" color="" class="fs14 weight-900 brdr-round4 cl-white" :style="`background-color: ${product.buttonColor}`">
            {{ product.buttonText }}
          </button-outline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline.vue'

export default {
  name: 'BannerTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ButtonOutline
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/variables/responsive';

  .special-product {
    height: 100%;
    max-height: 435px;
    .product-promotion {
      right: 0px;
      top: 20px;
      z-index: 1;
    }
    .special-product-image {
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    .special-product-item {
      height: 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .conditions-item {
      height: 100%;
    }
    @media (max-width: $screen__m) {
      .special-product-image {
        position: static;
        img {
          height: auto;
          max-width: 145px;
        }
      }
      .conditions-item {
        height: auto;
        padding-top: 35px;
        padding-bottom: 35px;
      }
      .special-product-item {
        display: flex;
        border-top: 1px solid color(lightgray4);
        height: 185px;
      }
      .product-promotion {
        right: -1px;
        top: 7px;
        z-index: 1;
      }
    }
    @media (max-width: $screen__xs) {
      .special-product-info {
        padding-right: 15px;
      }
      .special-product-title {
        text-align: left;
        font-size: 20px;
        line-height: 27px;
      }
      .btn-shop-now {
        a {
          display: block;
        }
      }
    }
  }
</style>
