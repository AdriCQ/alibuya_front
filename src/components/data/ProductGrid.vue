<template>
  <v-row justify="center">
    <v-col
      cols="auto"
      v-for="(prod, prodKey) in products"
      :key="`product-${prodKey}`"
    >
      <product :product="prod" />
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { ShopStore } from "@/store";
import { IProduct, TDepartment } from "@/types";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    product: () => import("@/components/widgets/Product.vue"),
  },
})
export default class ProductListGrid extends Vue {
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
}
</script>