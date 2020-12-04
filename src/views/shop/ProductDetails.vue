<template>
  <div id="product-details-view" class="view-container">
    <template v-if="product">
      <!-- Add to Cart -->
      <v-section>
        <add-to-cart-form :product="product" />
      </v-section>
      <!-- / Add to Cart -->

      <v-section class="mt-2">
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
    "add-to-cart-form": () =>
      import("@/components/forms/shop/AddToCartForm.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  beforeMount() {
    if (this.$route.query.productId)
      this.loadProduct(Number(this.$route.query.productId));
    else this.$router.back();
  }

  tab = 0;
  tabItems = [
    "Descripción",
    "Información adicional",
    "Valoraciones (0)",
    "Información del vendedor",
  ];

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