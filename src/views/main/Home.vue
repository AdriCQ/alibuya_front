<template>
  <div id="main-home" class="view-container">
    <!-- banner Carousel -->
    <banner-carousel />
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" xl="3" v-if="!isLogged">
          <login-card />
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="8" xl="9">
          <v-sheet color="primaryBetha" width="100%" height="100%" />
        </v-col>
      </v-row>

      <products-collection-slider
        v-if="suggestedProducts.length"
        title="Productos Sugeridos"
        :products="suggestedProducts"
        link
      />
    </v-section>
    <!-- / Suggested Products -->

    <!-- Products Group -->
    <v-section class="mt-2">
      <products-group
        v-if="suggestedProducts.length"
        :max="4"
        title="Lo mejor de Celulares"
        :products="suggestedProducts"
        :cardsProps="{ maxWidth: 200 }"
        :colsProps="{ cols: 6, md: 4, lg: true }"
        link
        advanced
      />
    </v-section>
    <!-- / Products Group -->

    <!-- Products Collection Slider -->
    <v-section class="mt-2">
      <products-collection-slider
        v-if="suggestedProducts.length"
        title="Herramientas"
        link
        :products="suggestedProducts"
        :cards-props="{ maxWidth: '100%', flat: true, tile: true }"
        :images-props="{ width: '100%', height: '100%' }"
      />
    </v-section>
    <!-- / Products Collection Slider -->

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
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
    "products-collection-slider": () =>
      import("@/components/sliders/ProductsCollectionSlider.vue"),
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