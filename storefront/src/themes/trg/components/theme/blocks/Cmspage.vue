<template>
  <div class="page"/>
</template>

<script>
export default {
  name: 'Cmspage',
  computed: {
    cmspages () {
      return this.$store.state.cmspages.list
    }
  },
  asyncData ({ route, store }) {
    return store.dispatch('cmspages/list', {})
  }
}
</script>
