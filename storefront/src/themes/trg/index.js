import Home from './pages/Home.vue'
import PromoCategory from './pages/PromoCategory.vue'
import Category from './pages/Category.vue'
import Categories from './pages/Categories.vue'
import SearchPage from './pages/SearchPage.vue'
import Product from './pages/Product.vue'
import Static from './pages/Static.vue'
import Checkout from './pages/Checkout.vue'
import Login from 'theme/components/core/blocks/Auth/Login.vue'
import Register from 'theme/components/core/blocks/Auth/Register.vue'
import Compare from './pages/Compare.vue'
import PageNotFound from './pages/PageNotFound.vue'
import MyAccount from './pages/MyAccount.vue'
import UIStore from './store/ui-store'
import CmsPage from './pages/CmsPage.vue'
import Vendor from './pages/Vendor.vue'
import Styleguide from './pages/Styleguide.vue'

const routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'login', path: '/login', component: Login },
  { name: 'сategories', path: '/cat', component: Categories },
  { name: 'search-page', path: '/search/:searchText', component: SearchPage },
  { name: 'register', path: '/register', component: Register },
  { name: 'register-b2b', path: '/register-b2b', component: Register, props: {b2b: true} },
  { name: 'category', path: '/c/:slug', component: Category },
  { name: 'promo-category', path: '/promo-category/:slug', component: PromoCategory },
  // { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  // { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  // { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  // { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product', path: '/p/:slug/:sku', component: Product },
  // { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'}, meta: {title: 'Legal Notice', description: 'Legal Notice - example of description usage'} },
  { name: 'privacy', path: '/privacy', component: Static, props: {page: 'lorem', title: 'Privacy'} },
  { name: 'magazine', path: '/magazine', component: Static, props: {page: 'lorem', title: 'Magazine'} },
  { name: 'sale', path: '/sale', component: Static, props: {page: 'lorem', title: 'Sale'} },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: {page: 'lorem', title: 'Track my Order'} },
  { name: 'my-account', path: '/my-account', component: MyAccount },
  { name: 'vendor', path: '/vendor', component: Vendor },
  { name: 'my-store', path: '/vendor/mystore', component: Vendor, props: {activeBlock: 'MyStore'} },

  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: {activeBlock: 'MyShippingDetails'} },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: {activeBlock: 'MyNewsletter'} },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: {activeBlock: 'MyOrders'} },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: {activeBlock: 'MyOrder'} },
  { name: 'about-us', path: '/about-us', component: Static, props: {page: 'about', title: 'About us'} },
  { name: 'customer-service', path: '/customer-service', component: Static, props: {page: 'lorem', title: 'Customer service'} },
  { name: 'store-locator', path: '/store-locator', component: Static, props: {page: 'lorem', title: 'Store locator'} },
  { name: 'size-guide', path: '/size-guide', component: Static, props: {page: 'lorem', title: 'Size guide'} },
  { name: 'gift-card', path: '/gift-card', component: Static, props: {page: 'lorem', title: 'Gift card'} },
  { name: 'delivery', path: '/delivery', component: Static, props: {page: 'lorem', title: 'Delivery'} },
  { name: 'returns', path: '/returns', component: Static, props: {page: 'lorem', title: 'Returns policy'} },
  { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: {page: 'lorem', title: 'Order from catalog'} },
  { name: 'contact', path: '/contact', component: Static, props: {page: 'contact', title: 'Contact'} },
  { name: 'compare', path: '/compare', component: Compare, props: {title: 'Compare Products'} },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound },
  { name: 'cms-page', path: '/page/:slug', component: CmsPage },
  { name: 'styleguide', path: '/styleguide', component: Styleguide },
  { path: '*', redirect: 'page-not-found' }
]

export default function (app, router, store) {
  router.addRoutes(routes)
  store.registerModule('ui', UIStore)
}
