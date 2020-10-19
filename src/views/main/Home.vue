<template>
  <div id="main-home">
    <!-- banner Carousel -->
    <section class="mt-0">
      <banner-carousel />
    </section>
    <!-- / banner Carousel -->

    <!-- Suggested Products -->
    <v-section>
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

    <!-- Departments -->
    <v-section class="mt-2">
      <v-card>
        <v-card-title>Departamentos</v-card-title>
        <department-slider />
      </v-card>
    </v-section>
    <!-- Departments -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store/Shop";
import { PopupStore } from "@/store/Popups";

@Component({
  components: {
    "banner-carousel": () => import("@/components/sliders/HomeAppSlider.vue"),
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
    "department-slider": () =>
      import("@/components/sliders/CategoriesSlider.vue"),
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