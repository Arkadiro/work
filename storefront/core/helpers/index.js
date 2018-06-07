import config from 'config'
import i18n from 'core/lib/i18n'
/**
 * Create slugify -> "create-slugify" permalink  of text
 * @param {String} text
 */
export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}

/**
 * Re-format category path to be suitable for breadcrumb
 * @param {Array} categoryPath
 */
export function breadCrumbRoutes (categoryPath, prefix) {
  prefix = !prefix ? '/c/' : prefix
  const tmpRts = []

  for (let sc of categoryPath) {
    let name = sc.labels ? sc.labels.ru_RU : sc.name
    if (prefix === '/c/' && sc.code === 'master') {
      name = i18n.t('Catalog')
    }
    tmpRts.push({
      name: name,
      route_link: prefix + sc.slug
    })
  }

  return tmpRts
}
export function productThumbnailPath (product, ignoreConfig = false) {
  let thumbnail = product.values && product.values['image-media'] &&
    product.values['image-media']['<all_channels>'] &&
    product.values['image-media']['<all_channels>']['<all_locales>'] &&
    product.values['image-media']['<all_channels>']['<all_locales>']['key']
  if (product.hasOwnProperty('configurable_children') &&
    product.configurable_children.length && (ignoreConfig || !product.is_configured)
  ) {
    thumbnail = product.configurable_children[0].image
  }
  if (process.env.NODE_ENV !== 'production') {
    return thumbnail !== undefined ? `${config.images.baseUrl}/assets/catalog/${thumbnail}` : ''
  }
  return thumbnail !== undefined ? '/assets/catalog/' + thumbnail : ''
}
export function productName (product) {
  let name = product.values['name-text'] &&
    product.values['name-text']['<all_channels>'] &&
    product.values['name-text']['<all_channels>']['<all_locales>']
  return name
}
export function productPriceUSD (product) {
  let price = product.values['price-prices']
    ? product.values['price-prices'] &&
    product.values['price-prices']['<all_channels>'] &&
    product.values['price-prices']['<all_channels>']['<all_locales>'] &&
    product.values['price-prices']['<all_channels>']['<all_locales>']['USD'] : ''
  return price
}
export function categoryName (category) {
  let locale = config.i18n.defaultLocale.split('-').join('_')
  let categoryName = category.labels[locale]
  return categoryName
}
