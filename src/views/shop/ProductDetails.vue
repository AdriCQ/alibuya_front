<template>
  <div id="product-details-virew" class="view-container">
    <!-- Add to Cart -->
    <v-section v-if="product">
      <add-to-cart-form :product="product" />
    </v-section>
    <!-- / Add to Cart -->

    <v-section class="mt-2">
      <v-card tile>
        <v-tabs v-model="tab" color="primary" style="margin-right: -15px">
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab v-for="item in tabItems" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-card-text>
          <v-tabs-items v-model="tab" class="py-1 px-2">
            <v-tab-item v-for="item in tabItems" :key="item">
              <product-description />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store";

@Component({
  components: {
    "add-to-cart-form": () =>
      import("@/components/forms/shop/AddToCartForm.vue"),
    "product-description": () =>
      import("@/components/data/ProductDescription.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  created() {
    this.loadProduct();
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

  get suggestProducts() {
    return ShopStore.suggestedProducts;
  }

  get productId() {
    if (this.$route.query.productId) return Number(this.$route.query.productId);
    else return null;
  }

  async loadProduct() {
    if (this.productId) {
      await ShopStore.getProductById(this.productId);
    } else {
      if (this.product === null) {
        this.$router.push({
          name: "main.home",
        });
      }
    }
  }
}
</script>