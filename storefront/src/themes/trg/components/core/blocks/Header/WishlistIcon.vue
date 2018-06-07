<template>
  <button
    type="button"
    class="inline-flex bg-cl-transparent brdr-none pt7"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <i class="trg-icons heart-ico fs24 weight-900 cl-blue"/>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/WishlistIcon')]
}
</script>
