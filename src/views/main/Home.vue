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
          <v-sheet color="primary" width="100%" height="100%" />
        </v-col>
      </v-row>
      <products-slider :products="products" title="Productos sugeridos" />
    </v-section>
    <!-- / Suggested Products -->

    <!-- Suggested -->
    <v-section class="mt-2">
      <v-card flat class="px-4">
        <v-row justify="space-between">
          <!-- Col 1 -->
          <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
            <v-card flat>
              <v-card-title> Ofertas por menos de $25 </v-card-title>
              <v-row v-for="i in 2" :key="i" dense>
                <v-col cols="6" v-for="j in 2" :key="j">
                  <v-sheet
                    width="100%"
                    height="8rem"
                    color="secondaryBetha"
                    light
                  >
                    <div class="text-center pt-10">
                      <v-icon x-large>mdi-gift</v-icon>
                    </div>
                  </v-sheet>
                  <div class="subtitle text-center">Lorem ipsum dolor</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <!-- / Col 1 -->

          <!-- Col 2 -->
          <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
            <v-card flat>
              <v-card-title>Producto más comprado </v-card-title>
              <v-sheet
                height="17.7rem"
                color="secondaryBetha"
                class="mt-1"
                light
              />
              <div class="subtitle text-center">Lorem ipsum dolor</div>
            </v-card>
          </v-col>
          <!-- / Col 2 -->

          <!-- Col 3 -->
          <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="4">
            <v-card flat>
              <v-card-title
                ><label>Departamentos sobresalientes</label></v-card-title
              >
              <v-sheet
                width="100%"
                class="mt-1"
                height="8rem"
                color="secondaryBetha"
                light
              >
                <div class="text-center pt-10">
                  <v-icon x-large>mdi-gift</v-icon>
                </div>
              </v-sheet>
              <div class="subtitle text-center">Lorem ipsum dolor</div>

              <v-row dense class="mt-1">
                <v-col cols="6" v-for="j in 2" :key="j">
                  <v-sheet width="100%" height="8rem" color="secondaryBetha">
                    <div class="text-center pt-10">
                      <v-icon x-large>mdi-gift</v-icon>
                    </div>
                  </v-sheet>
                  <div class="subtitle text-center">Lorem ipsum dolor</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <!-- / Col 3 -->
        </v-row>
      </v-card>
    </v-section>
    <!-- Suggested -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore, UserStore } from "@/store";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/BannerCarousel.vue"),
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
  },
})
export default class HomeMainView extends Vue {
  get products() {
    return ShopStore.allProducts;
  }

  get isLogged() {
    return UserStore.isLogged;
  }
}
</script>