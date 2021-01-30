<template>
  <v-section fluid>
    <div
      v-for="(product, key) in products"
      :key="`cart-grid-mobile-product-cart-${key}`"
      class="mb-2"
    >
      <product-cart-widget :product="product" />
    </div>
  </v-section>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CartStore } from "@/store";

@Component({
  components: {
    "product-cart-widget": () =>
      import("@/components/widgets/products/Cart.vue"),
  },
})
export default class CartGridMobile extends Vue {
  /**
   * Getters
   */
  get products() {
    return CartStore.products;
  }
}
</script>