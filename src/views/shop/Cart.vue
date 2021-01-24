<template>
  <div id="shop-cart-view" class="view-container">
    <v-section fluid>
      <v-card>
        <cart-content v-if="packCant" />
        <empty-inventary v-else />
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin, RouterMixin } from "@/mixins";
import { CartStore } from "@/store";

@Component({
  components: {
    "pack-display": () => import("@/components/parts/PackDataCart.vue"),
    "empty-inventary": () => import("@/components/widgets/EmptyInventary.vue"),
    "cart-content": () => import("@/components/parts/shop/CartContent.vue"),
  },
})
export default class ShoppingCartView extends Mixins(
  RouterMixin,
  GettersBreakpointsMixin
) {
  get packCant() {
    return CartStore.cantProducts;
  }

  get totalPrice() {
    return CartStore.totalPrice;
  }

  get topStyle() {
    if (this.lgAndUp) {
      return "7rem";
    } else {
      return "0";
    }
  }
}
</script>