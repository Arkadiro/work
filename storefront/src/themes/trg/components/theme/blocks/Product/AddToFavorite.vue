<template>
  <div class="favorite relative" @click.prevent="addToFavorite(product)" :class="{'active': favorite}">
    <i class="absolute trg-icons fs22 " :class="[ favorite ? 'heart_fill-ico cl-red' : 'heart-ico cl-silver2']"/>
  </div>
</template>

<script>
export default {
  name: 'AddToFavorite',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      favorite: false
    }
  },
  methods: {
    addToFavorite (product) {
      const usersCollection = global.db.usersCollection
      usersCollection.getItem('current-token', (err, token) => {
        if (err) {
          console.error(err)
        }
        if (token) {
          return true
        }
        return false
      }).then(result => {
        if (!this.favorite) {
          this.$store.dispatch('wishlist/addItem', product).then(res => {
            this.favorite = true
          })
        } else {
          this.$store.dispatch('wishlist/removeItem', product).then(res => {
            this.favorite = false
          })
        }
      })
    },
    checkIsOnWishlist () {
      let item = this.$store.state.wishlist.itemsWishlist.find(p => p.sku === this.product.sku)
      if (item !== undefined) {
        this.favorite = true
      } else {
        this.favorite = false
      }
    }
  },
  created () {
    this.$bus.$on('wishlist-has-loaded', this.checkIsOnWishlist)
  },
  beforeMount () {
    this.checkIsOnWishlist()
  },
  beforeDestroy () {
    this.$bus.$off('wishlist-has-loaded')
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-red: color(red);

.favorite {
  z-index: 5;

  .heart-ico,
  .heart_fill-ico {
    right: 23px;
    top: 23px;
    width: 22px;
    height: 23px;
  }
  .heart-ico:hover {
    color: $color-red;
  }
  @media (max-width: $screen__m - 1) {
    svg {
      right: 15px;
      top: 15px;
    }
  }
}
</style>
