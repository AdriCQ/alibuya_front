<template>
  <div id="main-home">
    <!-- Banner Carousel -->
    <banner-carousel />
    <!-- / Banner Carousel -->

    <v-section fluid class="mt-3">
      <products-group :products="productsTest.slice(0, 6)" single show-title />
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <product-offer
            title="Oferta especial"
            :product="productsTest[4]"
            :to="{ name: 'main.home' }"
            show-price
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <product-grid
            :products="productsTest.slice(0, 4)"
            title="Últimos modelos"
            :to="{ name: 'main.home' }"
          />
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.smOnly" cols="12" md="4">
          <product-grid
            :products="productsTest.slice(2, 6)"
            title="Super oferta"
            :to="{ name: 'main.home' }"
          />
        </v-col> </v-row
    ></v-section>

    <v-section fluid>
      <v-card>
        <products-collection-slider
          title="Lo Más Comprado"
          :products="productsTest"
          :to="{ name: 'main.home' }"
          link
        />
      </v-card>
    </v-section>

    <v-section fluid>
      <v-card>
        <products-group :products="productsTest.slice(2, 6)" show-price />
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore, UserStore } from "@/store";
import { IProduct } from "@/types";
import { productsTest } from "@/utils";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/BannerCarousel.vue"),
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
    "products-collection-slider": () =>
      import("@/components/sliders/ProductsCollectionSlider.vue"),
    // test
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
    "product-offer": () => import("@/components/widgets/products/Offer.vue"),
    "product-grid": () =>
      import("@/components/widgets/products/ProductGrid.vue"),
  },
})
export default class HomeMainView extends Vue {
  created() {
    ShopStore.getSuggestedProducts({
      tags: ["health"],
    });
  }
  get suggestedProducts() {
    return ShopStore.suggestedProducts;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  /**
   * Test
   */
  get productsTest(): IProduct[] {
    return productsTest;
  }
}
</script>