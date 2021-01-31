<template>
  <div id="product-details-view" class="view-container">
    <template v-if="product">
      <!-- Product Content -->
      <v-section fluid>
        <product-content :product="product" />
      </v-section>
      <!-- / Product Content -->

      <v-section fluid>
        <products-group
          v-if="suggestedProducts.length"
          title="Sugerencias"
          link
          :products="suggestedProducts"
          advanced
          with-rating
          with-price
          with-title
          :max="8"
        />
      </v-section>
    </template>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store";

@Component({
  components: {
    "product-content": () =>
      import("@/components/parts/shop/ProductDetailsContent.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  beforeMount() {
    if (this.$route.query.productId)
      this.loadProduct(Number(this.$route.query.productId));
    else this.$router.back();
  }

  get product() {
    return ShopStore.productDetails;
  }

  get suggestedProducts() {
    return ShopStore.suggestedProducts;
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