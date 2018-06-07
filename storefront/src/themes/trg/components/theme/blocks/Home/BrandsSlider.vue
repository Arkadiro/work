<template>
  <div class="brands-slider container mt10 mb75">
    <div class="brands-slider__wrap">
      <no-ssr>
        <carousel v-bind="sliderConfig">
          <slide v-for="(slide, index) in brands" :key="index">
            <div class="container w-100" :style="{ backgroundImage: `url(${slide.image})` }" />
          </slide>
        </carousel>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import sliderData from 'theme/resource/brand-carousel.json'

export default {
  name: 'BrandsSlider',
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  data () {
    return {
      brands: sliderData.slides,
      sliderConfig: {
        perPage: 6,
        perPageCustom: [[320, 2], [480, 2], [768, 3], [1200, 4], [1280, 6]],
        paginationEnabled: true,
        navigationEnabled: true,
        loop: true,
        navigationNextLabel: '',
        navigationPrevLabel: '',
        paginationActiveColor: '#2F2F2F',
        paginationColor: '#9EA19A',
        paginationSize: 7,
        paginationPadding: 4
      }
    }
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';

.brands-slider {
  .brands-slider__wrap {
    max-width: 1060px;
    margin: 0 auto;
  }
  .container {
    height: 100px;
    max-width: 125px;
    max-height: 60px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  @media (max-width: $screen__m - 1) {
    margin-bottom: 30px;
    margin-top: 0;
  }
}
</style>
