<template>
  <category-slider
    :config="sliderConfig"
    :title="title"
  />
</template>
<script>
import CategorySlider from 'theme/components/theme/CategorySlider.vue'

export default {
  name: 'CollectionCategory',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sliderConfig: {
        perPage: 4,
        perPageCustom: [[768, 8]],
        paginationEnabled: true,
        navigationEnabled: true,
        navigationNextLabel: '',
        navigationPrevLabel: '',
        paginationActiveColor: '#2F2F2F',
        paginationColor: '#9EA19A',
        paginationSize: 7,
        paginationPadding: 4,
        loop: true
      }
    }
  },
  computed: {
    currentIndex: {
      cache: false,
      get () {
        return this.$refs.carousel ? this.$refs.carousel.currentPage : 0
      }
    }
  },
  components: {
    CategorySlider
  }
}
</script>
