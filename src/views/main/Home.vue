<template>
  <div id="main-home">
    <!-- banner Carousel -->
    <v-section
      bg="img/banners/b3.jpg"
      height="auto"
      class="pa-5"
      min-height="300px"
    >
      <v-row justify="end" align="center">
        <v-col xs="12" sm="8" md="6" lg="4" xl="4">
          <v-card light>
            <v-card-text class="pb-0">
              <p class="title text-center">
                Lorem, ipsum dolor sit amet consectetur
              </p>
            </v-card-text>
            <v-card-text class="mt-0">
              <v-btn color="primary" width="100%">
                <v-icon class="mr-2">mdi-cart</v-icon> lorem
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-section>
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section>
      <v-row justify="center">
        <v-col xs="12" sm="12" md="6" lg="4" xl="3">
          <v-card light>
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
                  <v-sheet width="100%" height="8rem" color="secondary">
                    <div class="text-center pt-10">
                      <v-icon dark x-large>mdi-gift</v-icon>
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
              <v-sheet height="17.7rem" color="primary" class="mt-1" />
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
                color="secondary"
              >
                <div class="text-center pt-10">
                  <v-icon dark x-large>mdi-gift</v-icon>
                </div>
              </v-sheet>
              <div class="subtitle text-center">Lorem ipsum dolor</div>

              <v-row dense class="mt-1">
                <v-col cols="6" v-for="j in 2" :key="j">
                  <v-sheet width="100%" height="8rem" color="secondary">
                    <div class="text-center pt-10">
                      <v-icon dark x-large>mdi-gift</v-icon>
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
import { PopupStore, ShopStore } from "@/store";

@Component({
  components: {
    // "banner-carousel": () => import("@/components/sliders/HomeAppSlider.vue"),
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
    "product-widget": () => import("@/components/widgets/Product.vue"),
  },
})
export default class HomeMainView extends Vue {
  get products() {
    return ShopStore.allProducts;
  }

  openAuthPopup(type: "register" | "login") {
    PopupStore.openAuth(type);
  }
}
</script>