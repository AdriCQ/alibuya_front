<template>
  <v-row>
    <v-col
      cols="6"
      sm="4"
      md="3"
      v-for="(product, key) in products"
      :key="`product-grid-${key}`"
    >
      <basic-product
        :product="product"
        :show-title="showTitleModified"
        :show-price="showPriceModified"
        :show-description="getShowDescription"
        :link="getLink"
        :large="getLarge"
        :small="getSmall"
      />
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { ProductBasicMixin } from "@/mixins/product";
import { IProduct } from "@/types";

@Component({
  components: {
    "basic-product": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductListGrid extends mixins(ProductBasicMixin) {
  @Prop({
    type: Array,
    default: [],
  })
  readonly products!: IProduct[];

  /**
   * Modifed defaults props value
   */
  get showTitleModified() {
    if (this.showTitle) {
      return this.showTitle;
    }
    return true;
  }
  get showPriceModified() {
    if (this.showPrice) {
      return this.showPrice;
    }
    return true;
  }
  /*
    TODO: Create props by controller the number of products to show in each breakpoint and the design.
  */
}
</script>