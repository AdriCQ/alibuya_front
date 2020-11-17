<template>
  <v-list>
    <v-list-item
      v-for="(prod, prodKey) in products"
      :key="prodKey"
      @click="showProductDetails(prod)"
    >
      <v-list-item-avatar tile>
        <v-img :src="prod.img" />
      </v-list-item-avatar>
      <v-list-item-title>
        {{ prod.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        ${{ Number(prod.price).toFixed(2) }}
      </v-list-item-subtitle>

      <v-list-item-action
        @click="goToDetails(prod)"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <v-btn icon color="primary">
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action />
    </v-list-item>
  </v-list>
</template>

<script lang='ts'>
import { ShopStore } from "@/store";
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductList extends Vue {
  @Prop({
    type: Array,
    default: [],
  })
  readonly products!: IProduct[];

  async showProductDetails(product: IProduct) {
    if (product.id) {
      await ShopStore.getProductById(product.id);
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
        });
    }
    // TODO: handle if productID
  }
}
</script>