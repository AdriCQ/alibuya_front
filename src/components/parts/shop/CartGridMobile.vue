<template>
  <v-section fluid>
    <v-row
      v-for="(product, key) in products"
      :key="`cart-grid-mobile-product-${key}`"
      no-gutters
    >
      <v-col cols="12">
        <product :product="product" :props="productProps" />
      </v-col>
    </v-row>
  </v-section>
</template>

<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import { CartStore } from "@/store";
import { GettersBreakpointsMixin } from "@/mixins";

@Component({
  components: {
    product: () => import("@/components/parts/shop/CartProductSimple.vue"),
  },
})
export default class CartGridMobile extends Mixins(GettersBreakpointsMixin) {
  /**
   * Getters
   */
  get products() {
    return CartStore.products;
  }

  get productProps() {
    return {
      showTitle: true,
      titleOneLine: false,
      fluid: true,
      imageProps: {
        maxWidth: this.smOnly ? "100%" : 350,
      },
      horizontal: this.smOnly,
      bodyClass: "pa-0",
      titleClass: "px-1 text-body-1",
    };
  }
}
</script>