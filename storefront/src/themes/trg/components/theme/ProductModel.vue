<script>
import config from 'config'

export default {
  name: 'ProductModel',
  computed: {
    productName () {
      return this.product.values['name-text']['<all_channels>']['<all_locales>']
    },
    thumbnail () {
      if (process.env.NODE_ENV !== 'production') {
        return config.images.baseUrl + '/assets/catalog/' + this.product.values['image-media']['<all_channels>']['<all_locales>']['key']
      }
      return '/assets/catalog/' + this.product.values['image-media']['<all_channels>']['<all_locales>']['key']
    },
    productThumbnail () {
      return '/assets/catalog/' + this.product.values['image-media']['<all_channels>']['<all_locales>']['key']
    },
    imageSlides () {
      let images = []
      let self = this
      let mediaAttr = ['image-media', 'image1-media', 'image2-media', 'image3-media', 'image4-media']
      mediaAttr.forEach((attribute) => {
        if (this.product.values[attribute] &&
          this.product.values[attribute]['<all_channels>'] &&
          this.product.values[attribute]['<all_channels>']['<all_locales>'] &&
          this.product.values[attribute]['<all_channels>']['<all_locales>']['key']) {
          images.push({
            'thumbnail': self.generateThumbnail(attribute),
            'src': self.generateThumbnail(attribute)
          })
        }
      })
      if (images.length === 0) {
        images.push({
          'thumbnail': '',
          'src': ''
        })
      } else if (images.length === 1) {
        images.push({
          'thumbnail': '/assets/product/one_blade1.jpg',
          'src': '/assets/product/one_blade1_1.jpg'
        },
        {
          'thumbnail': '/assets/product/one_blade2.jpg',
          'src': '/assets/product/one_blade2_1.jpg'
        },
        {
          'thumbnail': '/assets/product/one_blade3.jpg',
          'src': '/assets/product/one_blade3_1.jpg'
        },
        {
          'thumbnail': '/assets/product/one_blade4.jpg',
          'src': '/assets/product/one_blade4_1.jpg'
        },
        {
          'thumbnail': '/assets/product/video.svg',
          'type': 'video'
        },
        {
          'thumbnail': '/assets/product/3d.svg',
          'type': '3d',
          'src': '/assets/product/005.obj'
        })
      }
      return images
    },
    productCode () {
      return this.product.sku
    },
    productDescription () {
      if (this.product.values) {
        return this.product.values['description-textarea'] ? (this.product.values['description-textarea']['ecommerce'] ? this.product.values['description-textarea']['ecommerce']['en_US'] : '') : ''
      } else {
        return ''
      }
    },
    priceProduct () {
      return this.product.values['price-prices'] ? this.product.values['price-prices']['<all_channels>']['<all_locales>']['USD'] : ''
    }
  },
  methods: {
    generateThumbnail (attr = 'image-media') {
      if (process.env.NODE_ENV !== 'production') {
        return config.images.baseUrl + '/assets/catalog/' + this.product.values[attr]['<all_channels>']['<all_locales>']['key']
      }
      return '/assets/catalog/' + this.product.values[attr]['<all_channels>']['<all_locales>']['key']
    }
  }
}
</script>
