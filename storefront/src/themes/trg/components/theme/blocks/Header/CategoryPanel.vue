<template>
  <sidebar-menu :categories="categories"/>
</template>

<script>
import SidebarMenu from 'theme/components/core/blocks/SidebarMenu/SidebarMenu'

export default {
  name: 'CategoryPanel',
  components: {
    SidebarMenu
  },
  computed: {
    categories () {
      return this.$store.state.category.list
    }
  },
  created () {
    this.$store.dispatch('category/list', {})
  }
}
</script>

<style lang="scss" scoped>
</style>
