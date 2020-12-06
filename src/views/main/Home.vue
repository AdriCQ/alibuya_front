<template>
  <div id="main-home">
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
      <v-card flat>
        <products-group
          title="Oferta Especial"
          :show-price="false"
          :products="productsTest.slice(0, 7)"
          :props="{ color: 'transparent' }"
        />
      </v-card>
    </v-section>
    <!-- / Products Group  -->

    <!-- Products Collection Slider -->
    <v-section class="mt-2">
      <products-collection-slider
        v-if="productsTest.length"
        title="Lo Más Comprado"
        link
        :show-title="false"
        :show-price="false"
        :products="productsTest"
        :card-props="{ maxWidth: '100%', flat: true, tile: true }"
        :image-props="{ width: '100%', height: '100%' }"
      />
    </v-section>
    <!-- / Products Collection Slider -->

    <!-- Products Collection Slider -->
    <v-section class="mt-2">
      <products-collection-slider
        v-if="suggestedProducts.length"
        title="Salud y Bienestar"
        link
        :show-title="false"
        :show-price="false"
        :products="suggestedProducts"
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
    return [
      {
        id: 1,
        title: "Suzuki RM 1800",
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
        title: "Sandwichera Milexus",
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
        title: "Samsung Galaxy A3",
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
        title: "Combo x4 Colgate",
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
        title: "Motorina SAM Batería de Litio",
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
        title: "Sartén eléctrico Soyea",
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
        title: "Xiaomi Redmi R1",
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