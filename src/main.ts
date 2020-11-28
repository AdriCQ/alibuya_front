import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router';
import store from '@/store/store';
import vuetify from './plugins/vuetify';
import axios from 'axios'
import { UserStore } from './store/User';
import Vuelidate from 'vuelidate'
// SCSS
require('@/assets/scss/main.scss');

// Vue Slick Carousel
import VueSlickCarousel from 'vue-slick-carousel';
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
Vue.component('slick-carousel', VueSlickCarousel)

// App Section
Vue.component('v-section', () => import('@/components/layouts/Section.vue'))

// Vuelidate
Vue.use(Vuelidate);


// Setup axios
axios.defaults.timeout = 600000;

/**
 * AXIOS interceptor to inject authentication into requests
 */
axios.interceptors.request.use((request) => {
  // request.baseURL = 'http://olympus-apps.com/api/public';
  request.baseURL = 'http://localhost:8000';
  /* Append content type header if its not present */
  if (!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json"
  }

  /* Check if authorization is set */
  if (!request.headers["Authorization"]) {
    /* Check if the user is authenticated to send Bearer token */
    const token = UserStore.api_token;
    if (token && token.length > 0) {
      request.headers.Authorization = "Bearer " + token
    } else {
      /* Send the application authentication as Bearer token */
      request.headers.Authorization = "Bearer ApiToken"
    }
  }
  return request
})
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
