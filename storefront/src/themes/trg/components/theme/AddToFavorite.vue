<template>
  <span>
    <span class="favorite wishlist-ico lanit-icons fs20 cl-gray2 no-underline relative inline-block mr12 cursor-pointer opacity5" :class="favorite.isFavorite ? 'active' : ''" @click="addToFavorite(product)"/>
    <span class="fs12 lh20 cl-black weight-400">{{ title }}</span>
  </span>
</template>

<script>
export default {
  name: 'AddToFavorite',
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
      favorite: {
        isFavorite: false
      }
    }
  },
  methods: {
    addToFavorite (product) {
      let self = this
      if (!self.favorite.isFavorite) {
        this.$store.dispatch('wishlist/addItem', product).then(res => {
          self.favorite.isFavorite = true
        })
      } else {
        this.$store.dispatch('wishlist/removeItem', product).then(res => {
          self.favorite.isFavorite = false
        })
      }
    },
    checkIsOnWishlist () {
      let item = this.$store.state.wishlist.itemsWishlist.find(p => p.id === this.product.id)
      if (item !== undefined) {
        this.favorite.isFavorite = true
      }
    }
  },
  created () {
    this.$bus.$on('wishlist-has-loaded', this.checkIsOnWishlist)
  },
  beforeMount () {
    this.checkIsOnWishlist()
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
$color-green: map-get($colors,green);

.favorite {
  &.active,
  &:hover {
    opacity: 1;
    &:before {
      content: '\e900';
      color: $color-green;
    }
  }
}
</style>
