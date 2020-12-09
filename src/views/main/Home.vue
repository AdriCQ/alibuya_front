<template>
  <div id="main-home">
    <!-- Banner Carousel -->
    <banner-carousel />
    <!-- / Banner Carousel -->

    <v-section fluid class="mt-3">
      <v-card color="transparent" flat>
        <products-group
          :products="productsTest.slice(0, 5)"
          separated
          show-title
        />
      </v-card>
    </v-section>

    <v-section fluid class="mt-2">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="4" class="px-1">
          <product-offer
            title="Oferta especial"
            :product="productsTest[4]"
            :card-props="{ maxWidth: '100%', height: '100%' }"
            :image-props="{ maxHeight: '100%', maxWidth: '100%' }"
            :to="{ name: 'main.home' }"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" class="px-1 mt-2 mt-sm-0">
          <product-grid
            :products="productsTest.slice(0, 4)"
            title="Últimos modelos"
            :to="{ name: 'main.home' }"
            width="100%"
          />
        </v-col>
        <v-col
          v-if="!$vuetify.breakpoint.smOnly"
          cols="12"
          md="4"
          class="px-1 mt-2 mt-sm-0"
        >
          <product-grid
            :products="productsTest.slice(2, 6)"
            title="Super oferta"
            :to="{ name: 'main.home' }"
            width="100%"
          />
        </v-col>
      </v-row>
    </v-section>

    <v-section fluid class="mt-2">
      <v-card>
        <products-collection-slider
          title="Lo Más Comprado"
          :products="productsTest"
          :to="{ name: 'main.home' }"
          link
        />
      </v-card>
    </v-section>

    <v-section fluid class="mt-2 mb-3">
      <v-card>
        <products-group
          :products="productsTest.slice(1, 6)"
          title="Últimos modelos"
        />
      </v-card>
    </v-section>
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
    return [
      {
        id: 1,
        title: "Suzuki A1800",
        description: "Lorem ipsum dolor sit ame.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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
}
</script>