import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router';
import store from '@/store/store';
import vuetify from './plugins/vuetify';
require('@/assets/scss/main.scss');

// Vue Slick Carousel
import VueSlickCarousel from 'vue-slick-carousel';
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
Vue.component('slick-carousel', VueSlickCarousel)

// App Section
Vue.component('v-section', () => import('@/components/layouts/Section.vue'))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
