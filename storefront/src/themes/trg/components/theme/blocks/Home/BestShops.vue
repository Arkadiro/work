<template>
  <div class="best-shops container mb20">
    <div class="best-shops-title fs30 weight-900 cl-dark-blue lh42 mb20">
      <span>{{ $t('Bestshops') }}</span>
    </div>
    <div class="best-shops-items">
      <template v-if="isTablet || isMobile">
        <no-ssr>
          <carousel :per-page="2" v-bind="sliderConfig" class="row">
            <slide class="best-shops-item mb16 col-xs-6 col-sm-4 col-md-3" v-for="(item, index) in items" :key="index">
              <router-link :to="{path: 'magazine'}" class="no-underline flex best-shops-tile center-xs bg-cl-white brdr-1 brdr-cl-gainsboro py25 middle-xs">
                <img :src="`assets/home/bestshops/${index}.jpg`" :alt="item">
              </router-link>
            </slide>
          </carousel>
        </no-ssr>
      </template>
      <template v-if="isDesktop">
        <div class="row">
          <div class="best-shops-item mb16 col-xs-12 col-sm-4 col-md-3" v-for="(item, index) in items" :key="index">
            <router-link :to="{path: 'magazine'}" class="no-underline flex best-shops-tile center-xs bg-cl-white brdr-1 brdr-cl-gainsboro py25 middle-xs">
              <img :src="`assets/home/bestshops/${index}.jpg`" :alt="item">
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient.vue'

export default {
  name: 'BestShops',
  data () {
    return {
      items: new Array(8),
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
  },
  components: {
    Slide,
    Carousel,
    'no-ssr': NoSSR
  },
  mixins: [AdaptiveWidthClient]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';
@import '~theme/css/components/slider';

.best-shops {

  * {
    box-sizing: border-box;
  }

  .best-shops-items {
    .best-shops-item {
      height: 110px;

      a {
        height: 100%;
        img {
          height: auto;
          width: auto;
          max-width: 145px;
        }
      }
    }
  }
  @media (max-width: $screen__m) {
    .best-shops-item {
      margin-bottom: 0;
      .best-shops-tile {
        border: none;
      }
    }
    .best-shops-title {
      font-size: 20px;
      line-height: 22px;
      color: color(dark-blue);
      margin-bottom: 0;
    }
  }
}
</style>
