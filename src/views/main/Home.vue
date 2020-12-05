<template>
  <div id="main-home" class="view-container">
    <!-- banner Carousel -->
    <banner-carousel />
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section class="mt-3">
      <v-row>
        <v-col cols="12" sm="6" lg="4" xl="3" v-if="!isLogged">
          <login-card />
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="8" xl="9">
          <v-sheet color="primaryBetha" width="100%" height="100%" />
        </v-col>
      </v-row>

      <products-collection-slider
        v-if="productsTest.length"
        title="Productos Sugeridos"
        :products="productsTest"
        :card-props="{ flat: true, tile: true }"
        link
      />
    </v-section>
    <!-- / Suggested Products -->

    <!-- TODO: Create component like this test -->
    <!-- (Test) Product Basic -->
    <v-section class="mt-2">
      <v-row justify="center" justify-sm="start" no-gutters>
        <v-col
          v-for="(product, key) in productsOffersTest"
          :key="`product-first-offer-${key}`"
          cols="auto"
          sm="6"
          md="4"
        >
          <product-offer
            :product="product"
            :card-props="{ maxWidth: 450, flat: true }"
            class="mx-1 mb-2"
          >
            <template #actions> Leer más </template>
          </product-offer>
        </v-col>
      </v-row>
    </v-section>
    <!-- / (Test) Product Basic -->

    <!-- Products Collection Slider -->
    <v-section class="mt-2">
      <products-collection-slider
        v-if="productsTest.length"
        title="Herramientas"
        link
        :products="productsTest"
        :card-props="{ maxWidth: '100%', flat: true, tile: true }"
        :image-props="{ width: '100%', height: '100%' }"
      />
    </v-section>
    <!-- / Products Collection Slider -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore, UserStore } from "@/store";
import { IProduct } from "@/types";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/BannerCarousel.vue"),
    "category-slider": () =>
      import("@/components/sliders/CategoriesSlider.vue"),
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
    "products-collection-slider": () =>
      import("@/components/sliders/ProductsCollectionSlider.vue"),
    // test
    "product-offer": () => import("@/components/widgets/products/Offer.vue"),
  },
})
export default class HomeMainView extends Vue {
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
    return [
      {
        id: 1,
        title: "Suzuki",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/1.png",
          },
        },
        price: 420,
      },

      {
        id: 2,
        title: "Sandwichera",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/2.png",
          },
        },
        price: 80,
      },

      {
        id: 3,
        title: "Samsung A3",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/3.png",
          },
        },
        price: 180,
      },
      {
        id: 4,
        title: "Pasta colgate",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/4.jpg",
          },
        },
        price: 3,
      },

      {
        id: 5,
        title: "Motorina SAM",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/5.png",
          },
        },
        price: 340,
      },

      {
        id: 6,
        title: "Sartén eléctrico",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/6.png",
          },
        },
        price: 75,
      },
    ];
  }

  get productsOffersTest() {
    return this.productsTest.slice(0, 3);
  }
}
</script>