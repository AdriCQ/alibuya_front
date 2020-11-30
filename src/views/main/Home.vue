<template>
  <div id="main-home" class="view-container">
    <!-- banner Carousel -->
    <banner-carousel />
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3" v-if="!isLogged">
          <login-card />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="8" xl="9">
          <v-sheet color="primaryBetha" width="100%" height="100%" />
        </v-col>
      </v-row>
      <products-slider
        v-if="suggestedProducts.length"
        :products="suggestedProducts"
        title="Productos sugeridos"
      />
    </v-section>
    <!-- / Suggested Products -->

    <!-- Promotions -->
    <v-section class="mt-1">
      <v-card flat>
        <products-slider
          :products="suggestedProducts"
          title="Lo mejor en celulares y accesorios"
        />
      </v-card>
      <v-card flat>
        <products-slider
          :products="suggestedProducts"
          title="Lo mejor en celulares y accesorios"
        />
      </v-card>
    </v-section>
    <!-- / Promotions -->

    <!-- Categories -->
    <v-section class="mt-1">
      <v-card flat>
        <v-card-title>Categorías</v-card-title>
        <v-card-text>
          <category-slider />
        </v-card-text>
      </v-card>
    </v-section>
    <!-- / Categories -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore, UserStore } from "@/store";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/BannerCarousel.vue"),
    "category-slider": () =>
      import("@/components/sliders/CategoriesSlider.vue"),
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
    "rating-stars": () => import("@/components/widgets/RatingStar.vue"),
  },
})
export default class HomeMainView extends Vue {
  get suggestedProducts() {
    return ShopStore.suggestedProducts;
  }

  get isLogged() {
    return UserStore.isLogged;
  }
}
</script>