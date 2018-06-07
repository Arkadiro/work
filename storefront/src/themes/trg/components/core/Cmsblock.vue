<script>
export default {
  name: 'Cmsblock',
  computed: {
    cmsblocks () {
      return this.$store.state.cmsblocks.list
    }
  },
  created () {
    this.$store.dispatch('cmsblocks/list', {})
  }
}
</script>

<style lang="scss" scoped>
</style>
