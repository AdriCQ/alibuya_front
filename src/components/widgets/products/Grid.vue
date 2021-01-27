<template>
  <v-section fluid>
    <v-row v-for="rowKey in rows" :key="`product-grid-row-${rowKey}`">
      <v-col
        v-bind="colsConfig"
        v-for="(product, key) in products.slice(
          (rowKey - 1) * cantProductsByRow,
          rowKey * cantProductsByRow
        )"
        :key="`grid-product-${rowKey * cantProductsByRow + key}`"
      >
        <basic :product="product" v-bind="productProps" />
      </v-col>
    </v-row>
  </v-section>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";
// types
import { IProduct, IProductCart, TItemsToShow } from "@/types";

@Component({
  components: {
    basic: () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class Grid extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Array, default: [] }) readonly products!:
    | IProduct[]
    | IProductCart[];
  @Prop(Object) readonly productProps!: object;
  // configure number of product by row
  @Prop({
    type: Object,
    default: function () {
      return { xs: 2, sm: 3, md: 4, lg: 6, xl: 6 };
    },
  })
  readonly productsByRow!: TItemsToShow;
  /**
   * Getters
   */
  get cantProductsByRow() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.productsByRow.xl;
      case "lg":
        return this.productsByRow.lg;
      case "md":
        return this.productsByRow.md;
      case "sm":
        return this.productsByRow.sm;
      default:
        return this.productsByRow.xs;
    }
  }

  get colsConfig() {
    return {
      xl: 12 / this.productsByRow.xl,
      lg: 12 / this.productsByRow.lg,
      md: 12 / this.productsByRow.md,
      sm: 12 / this.productsByRow.sm,
      xs: 12 / this.productsByRow.xs,
    };
  }

  get rows() {
    return (
      Math.trunc(this.products.length / this.cantProductsByRow) +
      (this.products.length % this.cantProductsByRow ? 1 : 0)
    );
  }
}
</script>