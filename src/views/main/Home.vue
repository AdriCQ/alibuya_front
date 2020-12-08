<template>
  <div id="main-home">
    <!-- Banner Carousel -->
    <banner-carousel />
    <!-- / Banner Carousel -->

    <!-- Product Basic Widget (Test) -->
    <v-section class="mt-2">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(product, key) in productsTest.slice(0, 6)"
          :key="`product-basic-widget-${key}`"
        >
          <product-basic
            :product="product"
            :card-props="{ height: 450 }"
            show-title
            show-price
            show-description
          />
        </v-col>
      </v-row>
    </v-section>
    <!-- / Product Basic Widget (Test) -->

    <!-- Product Offer Widget (Test) -->
    <v-section class="mt-2">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(product, key) in productsTest.slice(0, 6)"
          :key="`product-basic-widget-${key}`"
        >
          <product-offer
            title="Mejor Oferta"
            :product="product"
            :card-props="{ height: 500 }"
          >
            <template #actions> Visita todos los {{ product.title }} </template>
          </product-offer>
        </v-col>
      </v-row>
    </v-section>
    <!-- / Product Offer Widget (Test) -->

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
        title: "Suzuki A1800",
        description:
          "Lorem ipsum dolor sit ame.Lorem ipsum dolor sit ame.Lorem ipsum dolor sit ame.Lorem ipsum dolor sit ame.",
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
      {
        id: 7,
        title: "Xiaomi Redmi R1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
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