<template>
  <div class="add-panel brdr-1 brdr-cl-silver pl25 pr27 py25 brdr-round7">
    <div class="mb11 price flex fs12 weight-700" v-if="isTicker">
      <span class="cl-black mr6 weight-400 lh22">Минимальная цена:</span>
      <div class="weight-700 ticker-price lh24" v-html="this.$options.filters.price(priceProduct * qty)"/>
    </div>
    <div class="product-price cl-black" v-if="!isTicker">
      <div class="fs24 lh32 weight-700 price-product" v-html="this.$options.filters.price(priceProduct * qty)"/>
      <p class="fs10 opacity5 m0">В том числе доставка ( 90 )</p>
      <p class="fs10 opacity5 mt2 mb18">В том числе НДС 18%</p>
    </div>
    <qty-box @changed-qty="qty = $event" />
    <div class="flex mb14 delivery-time-container">
      <label for="delivery-time" class="fs12 lh28 cl-black weight-400 mr24">Срок поставки</label>
      <div class="input-row relative">
        <input type="text" name="delivery-time" class="delivery-time-input border-box brdr-none brdr-1 brdr-cl-white-smoke2 bg-cl-transparent cl-black py5 align-center fs12 lh18 pr52" value="15     -     20">
        <select name="delivery-time-select" class="dropdown absolute brdr-none bg-cl-transparent cl-black fs10 lh14 opacity5">
          <option v-for="row in deliveryTimes" :key="row.name" class="pb5 fs12 cl-black opacity5">{{ row.name }}</option>
        </select>
        <i class="lanit-icons arrow-down-ico absolute fs18 cl-black opacity5" />
      </div>
    </div>
    <div class="flex mb20 delivery-point-container">
      <label for="delivery-point" class="fs12 lh24 cl-black weight-400 mr22">Место поставки</label>
      <div class="input-delivery-point pt3 relative lh19">
        <select name="delivery-point" class="delivery-point brdr-none bg-cl-transparent cl-black fs12 sans-serif">
          <option v-for="rows in deliveryPoints" :key="rows.point" :value="rows.point" class="pb5 fs12 cl-black opacity5" selected>{{ rows.point }}</option>
        </select>
        <i class="lanit-icons arrow-down-ico absolute fs18 cl-black" />
      </div>
    </div>
    <div class="row m0">
      <add-to-cart
        :product="product"
        :qty="qty"
        class="fs14 weight-500 sans-serif"
      />
    </div>
    <div class="pt20 add-to-buttons">
      <div class="w-100 mb10">
        <add-to-favorite :product="product" class="flex middle-xs" title="Добавить в избранное"/>
      </div>
      <div class="w-100">
        <add-to-compare :product="product" class="flex middle-xs" title="Добавить в список сравнения"/>
      </div>
    </div>
  </div>
</template>
<script>
import { themeComponent } from 'core/lib/themes'
import AddToCart from 'theme/components/core/AddToCart.vue'
import AddToFavorite from '../../AddToFavorite.vue'
import AddToCompare from '../../AddToCompare.vue'
// import QtyBox from '../../QtyBox.vue'
// import DeliveryTimes from 'src/themes/lanit/resource/delivery-time.json'
// import DeliveryPoints from 'src/themes/lanit/resource/delivery-points.json'

export default {
  name: 'AddPanel',
  data () {
    return {
      // deliveryTimes: DeliveryTimes,
      deliveryTimes: null,
      deliveryPoints: null,
      // deliveryPoints: DeliveryPoints,
      qty: 1
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    isTicker: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    AddToCart,
    AddToFavorite,
    AddToCompare
    // ,
    // AddToCompare,
    // QtyBox
  },
  mixins: [themeComponent('theme/ProductModel')]
}
</script>
<style lang="scss">
@import '~theme/css/variables/responsive';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-silver: color(silver);
$color-gainsboro: color(gainsboro);
$color-black: map-get($colors,black);

.add-panel {
  max-width: 255px;
  .ticker-price {
    i {
      display: none;
    }
  }
  .delivery-time-input {
    max-width: 140px;
    height: 26px;
  }
  .sort {
    top: 0;
    left: 85px;
  }
  .sortselect {
    width: 18px;
    height: 18px;
  }
  .dropdown {
    top: 6px;
    left: 96px;
    z-index: 1;
    width: 50px;
  }
  .dropdown + i {
    top: 3px;
    right: 2px;
  }
  .delivery-point,
  .dropdown {
    -webkit-appearance: none;
    outline: none;
  }
  .delivery-point {
    max-width: 110px;
    text-overflow: ellipsis;
  }
  .input-row::before {
    position: absolute;
    content: '';
    width: 0.8px;
    top: 1px;
    height: 24px;
    right: 53px;
    background-color: $color-gainsboro;
  }
  .ticker-price i {
    font-size: 8px;
  }
  .product-price i {
    font-size: 18px;
  }
}

  @media (max-width: ($screen__xl - 1)) {
    .price,
    .delivery-time-container,
    .delivery-point-container {
      flex-wrap: wrap;
    }
  }
  @media (max-width: ($screen__xs - 1)) {
    .add-panel {
      padding: 10px;
    }
  }
</style>
