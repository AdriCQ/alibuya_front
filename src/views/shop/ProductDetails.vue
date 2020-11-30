<template>
  <div id="product-details-view" class="view-container">
    <!-- Add to Cart -->
    <v-section v-if="product">
      <add-to-cart-form :product="product" />
    </v-section>
    <!-- / Add to Cart -->

    <!-- Products Group -->
    <v-section class="mt-2">
      <products-group
        :products="someProducts"
        products-max-width="280"
        :cards-props="{ flat: true }"
        :image-props="{ maxWidth: 200 }"
      />
    </v-section>
    <!-- / Products Group -->

    <!-- Basic Product Widget Test -->
    <v-section class="mt-2">
      <product-basic
        title="Shoes"
        image-src="img/test/comidas/dish-1.png"
        max-width="250"
      />
    </v-section>
    <!-- / Basic Product Widget Test -->

    <v-section class="mt-2">
      <v-card tile>
        <v-tabs v-model="tab" color="primary" style="margin-right: -15px">
          <v-tabs-slider color="primary" />

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
import { IProduct } from "@/types";

@Component({
  components: {
    "add-to-cart-form": () =>
      import("@/components/forms/shop/AddToCartForm.vue"),
    "product-description": () =>
      import("@/components/data/ProductDescription.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
    //test
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  created() {
    if (this.product === null) {
      this.$router.push({
        name: "main.home",
      });
    }
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

  // test
  get someProducts(): IProduct[] {
    return [
      { title: "Pant One", price: 25, images: "img/test/ropas/1.jpg" },
      { title: "Shirt One", price: 12, images: "img/test/ropas/2.jpg" },
      { title: "Purse One", price: 80, images: "img/test/ropas/3.jpg" },
      { title: "Pant One", price: 25, images: "img/test/ropas/1.jpg" },
      { title: "Shirt One", price: 12, images: "img/test/ropas/2.jpg" },
      { title: "Purse One", price: 80, images: "img/test/ropas/3.jpg" },
    ];
  }
}
</script>