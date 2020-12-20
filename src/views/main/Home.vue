<template>
  <div id="main-home">
    <!-- Banner Carousel -->
    <banner-carousel />
    <!-- / Banner Carousel -->

    <v-section fluid>
      <products-group
        :products="productsTest.slice(0, 6)"
        single
        show-title
        show-price
      />
      <products-collection-slider
        title="Productos Más Comprados"
        :products="productsTest"
        link
        show-title
        show-price
      />
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <product-offer
            title="Ahorra hasta el 25%!!!"
            :product="productsTest[4]"
            :to="{ name: 'main.home' }"
            show-price
            large
          />
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.mdOnly" cols="12" sm="6" lg="3">
          <product-basic
            :product="productsTest[2]"
            show-title
            show-price
            large
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <product-grid
            :products="productsTest.slice(0, 4)"
            title="Últimos modelos"
            :to="{ name: 'main.home' }"
            show-price
            large
          />
        </v-col>
        <v-col
          v-if="!$vuetify.breakpoint.xsOnly"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <product-grid
            :products="productsTest.slice(2, 6)"
            title="Autos y Piezas"
            :to="{ name: 'main.home' }"
            large
            show-price
          />
        </v-col>
      </v-row>

      <v-row class="py-0">
        <v-col cols="12">
          <products-collection-slider
            title="Ofertas para Mayoristas"
            :products="productsTest"
            :to="{ name: 'main.home' }"
            :elements-to-show="{ xs: 3, md: 6 }"
            link
            show-title
          />
        </v-col>
        <v-col cols="12">
          <v-card>
            <products-group
              title="Todo en Juguetes"
              :products="productsTest.slice(0, 5)"
              :elements-to-show="{ lg: 5 }"
              show-price
            />
          </v-card>
        </v-col>
      </v-row>
    </v-section>

    <!-- <v-section fluid>
      <v-card flat>
        <v-card-title v-if="$vuetify.breakpoint.smAndUp"
          >Ofertas de Navidad</v-card-title
        >
        <banner img="img/bg/compra-navidad-movil-810x541.jpg">
          <products-group
            :products="productsTest.slice(0, 4)"
            separated
            show-title
            v-if="$vuetify.breakpoint.smAndUp"
          />
          <product-grid
            v-else
            :products="productsTest.slice(0, 4)"
            title="Ofertas de Navidad"
            :to="{ name: 'shop.category', query: { category: 1 } }"
            width="100%"
          />
        </banner>
      </v-card>
    </v-section> -->

    <v-section fluid>
      <v-card>
        <products-collection-slider
          title="Celulares y Accesorios"
          :products="productsTest"
          link
          show-price
        />
      </v-card>
    </v-section>

    <v-section fluid>
      <v-card>
        <products-group
          title="Productos para el hogar"
          :products="productsTest.slice(1, 5)"
          show-price
          show-title
          :to="{ name: 'shop.type', query: { category: 2, type: 6 } }"
        />
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
    banner: () => import("@/components/widgets/Banner.vue"),
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