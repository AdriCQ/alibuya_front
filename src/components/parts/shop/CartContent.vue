<template>
  <div>
    <v-card-title> Mi Carrito </v-card-title>
    <!-- Grid -->
    <v-card-text>
      <cart-grid-large v-if="mdAndUp" />
      <cart-grid-mobile v-else />
    </v-card-text>
    <!-- / Grid -->
  </div>
</template>

<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins";

@Component({
  components: {
    "cart-grid-large": () =>
      import("@/components/parts/shop/CartGridLarge.vue"),
    "cart-grid-mobile": () =>
      import("@/components/parts/shop/CartGridMobile.vue"),
  },
})
export default class CartContent extends Mixins(GettersBreakpointsMixin) {}
</script>