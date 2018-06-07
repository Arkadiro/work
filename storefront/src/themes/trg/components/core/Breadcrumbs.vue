<template>
  <div class="breadcrumbs h5 cl-accent hidden-xs fs14 lh17 cl-gray3">
    <router-link :to="{ name: 'home'}" class="no-underline">
      {{ $t('Home') }}
    </router-link> -
    <template v-if="routes.length">
      <span v-for="link in routes" :key="link.route_link">
        <router-link :to="link.route_link" class="no-underline">
          {{ link.name | htmlDecode }}
        </router-link> -
      </span>
    </template>
    <span class="cl-silver3">
      {{ activeRoute | htmlDecode }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: false,
      default: () => []
    },
    activeRoute: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    font-family: Helvetica;
  }
</style>
