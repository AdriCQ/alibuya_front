<template>
  <div id="main-home">
    <!-- banner Carousel -->
    <section class="mt-0">
      <banner-carousel />
    </section>
    <!-- / banner Carousel -->

    <!-- Departments Slider -->
    <!-- <section>
      <v-container class="section-container">
        <div class="headline text-center mb-1">Departamentos</div>
        <categories-slider />
      </v-container>
    </section> -->
    <!-- / Departments Slider -->
    <!-- <section>
      <v-container>
        <v-row dense>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
            <v-card>
              <v-card-text class="pb-0">
                <p class="title text-center">
                  Inicia sesión para vivir tu mejor experiencia
                </p>
              </v-card-text>
              <v-card-text class="mt-0">
                <v-btn
                  color="primary"
                  large
                  width="100%"
                  @click="openAuthPopup('login')"
                >
                  Iniciar Sesión
                </v-btn>
                <p
                  class="anchor--text pt-2 cursor-pointer"
                  @click="openAuthPopup('register')"
                >
                  Registrar Cuenta
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card height="100%" min-height="8rem" color="orange darken-2">
              <v-card-text class="text-center centered">
                <v-icon x-large color="white">mdi-gift</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section> -->

    <section>
      <v-container class="section-container">
        <div class="text-center headline mb-1">Productos Destacados</div>
        <v-row>
          <v-col sm="12" md="6" v-for="index in 2" :key="index">
            <product-widget
              :product="products[index]"
              horizontal
              badge
              badge-text="-20%"
            />
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
import { PopupStore } from "@/store/Poups";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/HomeAppSlider.vue"),
    // "categories-slider": () =>
    //   import("@/components/sliders/CategoriesSlider.vue"),
    "product-widget": () => import("@/components/widgets/Product.vue"),
  },
})
export default class HomeMainView extends Vue {
  get products() {
    return ProductStore.products;
  }

  openAuthPopup(type: "register" | "login") {
    PopupStore.openAuth(type);
  }
}
</script>