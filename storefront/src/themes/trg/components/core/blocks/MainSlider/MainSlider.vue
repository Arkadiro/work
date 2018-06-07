<template>
  <section class="main-slider w-100 bg-transparent">
    <div class="main-slider__wrap">
      <no-ssr>
        <carousel :per-page="1" v-bind="sliderConfig">
          <slide v-for="(slide, index) in slides" :key="index">
            <router-link :to="{ path: slide.link }">
              <div class="container w-100" :style="{ backgroundImage: `url(${slide.image})` }" />
            </router-link>
          </slide>
        </carousel>
      </no-ssr>
    </div>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { coreComponent } from 'core/lib/themes'
import { Carousel, Slide } from 'vue-carousel'
import sliderData from 'theme/resource/main-slider.json'

export default {
  created () {
    this.updateSliderData(sliderData)
  },
  data () {
    return {
      sliderConfig: {
        perPage: 1,
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
  },
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  mixins: [coreComponent('blocks/MainSlider/MainSlider')]
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';
@import '~theme/css/components/slider';
$color-white: color(white);

.main-slider {
  .main-slider__wrap {
    margin: 0 auto;
    max-width: 1500px;
  }
  .container {
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  @media (max-width: $screen__m - 1) {
    .container {
      height: 172px;
    }
  }
}
</style>
