<template>
  <div id="main-home" class="view-container">
    <!-- banner Carousel -->
    <banner-carousel />
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section class="mt-2">
      <products-collection-slider
        v-if="productsTest.length"
        title="Productos Sugeridos"
        :products="productsTest"
        :card-props="{ flat: true, tile: true }"
        :show-title="false"
        :show-price="false"
        link
      />
    </v-section>
    <!-- / Suggested Products -->

    <!-- Products Group -->
    <v-section class="mt-2">
      <products-group
        :show-price="false"
        :products="productsTest.slice(0, 7)"
        :props="{ color: 'transparent' }"
      />
    </v-section>
    <!-- / Products Group  -->

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
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
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
      {
        id: 7,
        title: "Xiaomi R1",
        image: {
          id: 1,
          paths: {
            xs: "img/test/offers/3.png",
          },
        },
        price: 128,
      },
    ];
  }
}
</script>