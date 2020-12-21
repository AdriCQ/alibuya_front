<template>
  <div id="shop-cart-view" class="view-container">
    <v-section>
      <v-card>
        <v-row v-if="packCant">
          <v-col cols="12" md="4" lg="4" xl="4">
            <div class="position-sticky" :style="`top:${topStyle}`">
              <v-card-title
                >Subtotal: ${{ Number(totalPrice).toFixed(2) }}</v-card-title
              >
              <v-card-subtitle>{{ packCant }} paquetes</v-card-subtitle>
              <v-card-actions class="d-block text-center">
                <v-btn
                  class="btn-primary-alpha-gradient w-100 mx-0"
                  color="primaryAlpha"
                  >Tramitar Pedido
                </v-btn>
                <v-btn class="w-100 mx-0 mt-2" :to="{ name: 'shop.home' }"
                  >Seguir Comprando
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
          <v-col cols="12" md="8" lg="8" xl="8">
            <pack-display />
          </v-col>
        </v-row>
        <!-- Empty Inventary -->
        <div class="w-100 max-w-30" v-else>
          <v-card-title>No hay Paquetes</v-card-title>
          <v-img src="img/png/empty-cart.png" />
        </div>
        <!-- Empty Inventary -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PackStore } from "@/store";

@Component({
  components: {
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
    "pack-display": () => import("@/components/data/PackDataCart.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  get packCant() {
    return PackStore.packs.length;
  }

  /**
   *
   */
  get totalPrice() {
    return PackStore.totalPrice;
  }

  get topStyle() {
    if (this.$vuetify.breakpoint.lgAndUp) {
      return "7rem";
    } else {
      return "0";
    }
  }
}
</script>