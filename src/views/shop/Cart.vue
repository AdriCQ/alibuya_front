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
import { Component, Vue } from "vue-property-decorator";
import { CartStore } from "@/store";

@Component({
  components: {
    "empty-inventary": () => import("@/components/widgets/EmptyInventary.vue"),
    "cart-content": () => import("@/components/parts/shop/CartContent.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  get packCant() {
    return CartStore.cantProducts;
  }
}
</script>