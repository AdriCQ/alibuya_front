<template>
  <div id="shop-cart-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-cart</v-icon>
          Mis Paquetes
        </v-card-title>
        <v-card-subtitle>
          Tienes {{ packCant }} paquetes pendientes
        </v-card-subtitle>
        <product-display />
        <pack-display />
      </v-card>
    </v-section>

    <!-- Total Price -->
    <v-section class="mt-0">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="4" xl="4">
          <v-card>
            <v-card-title>Pago</v-card-title>
            <v-card-text
              >Total: ${{ Number(totalPrice).toFixed(2) }}</v-card-text
            >
            <v-card-actions class="d-block text-center">
              <v-btn color="primary"> Proceder a Pagar </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
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
import { ShopStore } from "@/store";

@Component({
  components: {
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
    "pack-display": () => import("@/components/data/PackDataCart.vue"),
    "product-display": () => import("@/components/data/ProductDataCart.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  get packCant() {
    return (
      ShopStore.shoppingCartProducts.length + ShopStore.shoppingCartPacks.length
    );
  }

  get suggestedProducts() {
    return ShopStore.allProducts;
  }

  /**
   *
   */
  get totalPrice() {
    return ShopStore.totalPrice;
  }
}
</script>