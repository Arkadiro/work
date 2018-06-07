<template>
  <div/>
</template>

<script>
export default {
  data () {
    return {
      windowWidth: 0
    }
  },
  created () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  computed: {
    isDesktop () {
      return this.windowWidth > 1024
    },
    isTablet () {
      return !this.isMobile && !this.isDesktop
    },
    isMobile () {
      return this.windowWidth < 480
    }
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth)
  }
}
</script>
