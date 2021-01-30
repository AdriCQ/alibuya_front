<template>
  <div id="shop-cart-view" class="view-container">
    <v-section fluid>
      <v-card>
        <!--
        <cart-content v-if="packCant" />
        <empty-inventary v-else />
        -->

        <v-sheet max-height="400" max-width="350">
          <product-basic
            :product="product"
            :title="{ position: 'bottom', show: true }"
            :rating="{ show: true }"
            :ribbon="{ show: true }"
            show-price
          />
        </v-sheet>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { CartStore, ShopStore } from "@/store";

@Component({
  components: {
    "empty-inventary": () => import("@/components/widgets/EmptyInventary.vue"),
    "cart-content": () => import("@/components/parts/shop/CartContent.vue"),
    "product-basic": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  beforeMount() {
    this.loadProduct(1);
  }

  get packCant() {
    return CartStore.productsLength;
  }

  get product() {
    return ShopStore.productDetails;
  }

  async loadProduct(_productId: number) {
    try {
      await ShopStore.getProductById(_productId);
    } catch (err) {
      this.$router.back();
    }
  }
}
</script>