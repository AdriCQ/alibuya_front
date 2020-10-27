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
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { PopupStore, ShopStore } from "@/store";
import { IProduct, TDepartment } from "@/types";

@Component
export default class ProductList extends Vue {
  created() {
    this.products = ShopStore.allProducts;
  }

  @Prop({
    type: String,
    default: "cell",
  })
  readonly productTag!: TDepartment;

  products: IProduct[] = [];

  @Watch("productTag")
  onProductTagChange(_tagTo: TDepartment) {
    console.log("Tag", _tagTo);
    this.products = ShopStore.allProducts;
  }

  showProductDetails(product: IProduct) {
    PopupStore.showProduct(product);
  }

  goToDetails(_product: IProduct) {
    if (this.$route.name !== "shop.details")
      ShopStore.productDetails = _product;
    this.$router.push({
      name: "shop.details",
    });
  }
}
</script>