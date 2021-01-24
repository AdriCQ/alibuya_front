<template>
  <div>
    <v-card-title> Mi Carrito </v-card-title>
    <v-card-text>
      <grid
        name="cart"
        :products="productsCart"
        :products-by-row="{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }"
      />
    </v-card-text>
  </div>
</template>

<script lang='ts'>
import { CartStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    grid: () => import("@/components/widgets/products/Grid.vue"),
  },
})
export default class CartContent extends Vue {
  /**
   * Getters
   */
  get productsCart() {
    return CartStore.cartProducts;
  }
}
</script>