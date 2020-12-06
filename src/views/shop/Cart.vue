<template>
  <div id="shop-cart-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title> Mis Paquetes </v-card-title>
        <v-card-subtitle>
          Tienes {{ packCant }} paquetes pendientes
        </v-card-subtitle>
        <!-- Empty Inventary -->
        <div class="w-100 max-w-30" v-if="!packCant">
          <v-img src="img/png/empty-cart.png" />
        </div>
        <!-- Empty Inventary -->
        <pack-display />
      </v-card>
    </v-section>

    <!-- Total Price -->
    <v-section class="mt-0" v-if="packCant">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="4" xl="4">
          <v-card>
            <v-card-title
              >Total: ${{ Number(totalPrice).toFixed(2) }}</v-card-title
            >
            <v-card-actions class="d-block text-center">
              <v-btn class="btn-primary-alpha-gradient" color="primaryAlpha"
                >Pagar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="suggestedProducts.lenght">
          <v-card>
            <v-card-title>Sugerencias</v-card-title>
            <products-slider :products="suggestedProducts" />
          </v-card>
        </v-col>
      </v-row>
    </v-section>
    <!-- / Total Price -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PackStore, ShopStore } from "@/store";

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

  get suggestedProducts() {
    return ShopStore.suggestedProducts;
  }

  /**
   *
   */
  get totalPrice() {
    return PackStore.totalPrice;
  }
}
</script>