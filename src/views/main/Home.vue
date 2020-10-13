<template>
  <div id="main-home">
    <!-- banner Carousel -->
    <section class="mt-0">
      <banner-carousel />
    </section>
    <!-- / banner Carousel -->

    <!-- Departments Slider -->
    <section>
      <v-container class="section-container">
        <div class="headline text-center mb-1">Departamentos</div>
        <categories-slider />
      </v-container>
    </section>
    <!-- / Departments Slider -->

    <section>
      <v-container class="section-container">
        <div class="text-center headline mb-1">Productos Destacados</div>
        <v-row>
          <v-col sm="12" md="6" v-for="index in 2" :key="index">
            <product-widget :product="products[index]" horizontal />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            sm="6"
            md="4"
            lg="3"
            v-for="(product, index) in products"
            :key="index"
          >
            <product-widget :product="product" />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ProductStore } from "@/store/Products";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/BannerCarousel.vue"),
    "categories-slider": () =>
      import("@/components/sliders/CategoriesSlider.vue"),
    "product-widget": () => import("@/components/widgets/Product.vue"),
  },
})
export default class HomeMainView extends Vue {
  get products() {
    return ProductStore.products;
  }
}
</script>