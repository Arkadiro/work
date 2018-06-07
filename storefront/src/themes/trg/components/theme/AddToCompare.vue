<template>
  <span>
    <span class="compare-ico lanit-icons fs20 cl-gray2 compare no-underline relative inline-block cursor-pointer opacity5" :class="compare.isCompare ? 'active' : ''" @click="addToCompare(product)"/>
    <span class="compare-title fs12 lh20 cl-black weight-400 ml12 compare-title">{{ title }}</span>
  </span>
</template>

<script>
export default {
  name: 'AddToCompare',
  props: {
    product: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      compare: {
        isCompare: false
      }
    }
  },
  methods: {
    addToCompare (product) {
      let self = this
      if (!self.compare.isCompare) {
        this.$store.dispatch('compare/addItem', self.product).then(res => {
          self.compare.isCompare = true
        })
      } else {
        this.$store.dispatch('compare/removeItem', self.product).then(res => {
          self.compare.isCompare = false
        })
      }
    },
    checkIsOnCompare () {
      let item = this.$store.state.compare.itemsCompare.find(p => p.id === this.product.id)
      if (item !== undefined) {
        this.compare.isCompare = true
      } else {
        this.compare.isCompare = false
      }
    }
  },
  created () {
    this.$bus.$on('compare-has-loaded', this.checkIsOnCompare)
  },
  beforeMount () {
    this.checkIsOnCompare()
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
$color-green: map-get($colors,green);

.compare {
  &.active,
  &:hover {
    opacity: 1;
    &:before {
      content: '\e901';
      color: $color-green;
    }
  }
}
</style>
