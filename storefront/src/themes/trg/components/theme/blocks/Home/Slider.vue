<template>
  <div class="carousel-container col-xs-12 col-sm-6 col-md-6 px0">
    <no-ssr>
      <carousel :per-page="1" :navigation-enabled="true" :pagination-enabled="false" pagination-active-color="black" pagination-color="#F2F2F2">
        <slide v-for="(slide, index) in slides" :key="index">
          <div class="content w-100 col-md-12" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
            <div class="title fs30 weight-900 lh42">{{ slide.title }}</div>
            <div class="subtitle fs16 weight-900 mb37">{{ slide.subtitle }}</div>
            <div class="description mb45 width-170 fs15 lh20 no-mobile">
              Lorem ipsum has been the industry's standart dummy text ever since the 1500s, when an unknown printer took a galley of type and
            </div>
            <div class="">
              <button-outline :link="slide.link" color="blue" class="fs14 weight-900">
                {{ slide.button_text }}
              </button-outline>
            </div>
          </div>
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script>
import ButtonOutline from '../../ButtonOutline.vue'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Slider',
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR,
    ButtonOutline
  },
  props: {
    slides: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.carousel-container {
  .content {
    height: 400px;
    overflow-x: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 45px;
    padding-left: 77px;
  }
  .VueCarousel-navigation-next {
    right: 30px !important;
  }
  .VueCarousel-navigation-prev {
    left: 30px !important;
  }
}
</style>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
.carousel-container {
  height: 100%;
  color: #48475A;
}

@media (min-width: $screen__m+1) and (max-width: $screen__l) {
  .content {
    background-size: cover;
  }
}

@media (max-width: $screen__m) {
  .content {
    height: 215px;
    padding-left: 25px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .subtitle {
    margin-bottom: 25px;
  }
}
</style>
