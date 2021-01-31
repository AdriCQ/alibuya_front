<template>
  <v-section fluid>
    <v-row v-for="rowKey in rows" :key="`product-grid-row-${rowKey}`">
      <v-col
        v-bind="colProps"
        v-for="(product, key) in products.slice(
          (rowKey - 1) * cantProductsByRow,
          rowKey * cantProductsByRow
        )"
        :key="`grid-product-${rowKey * cantProductsByRow + key}`"
      >
        <product-base :product="product" v-bind="productProps" />
      </v-col>
    </v-row>
  </v-section>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";
import { IProduct, TBreakpointsNumber } from "@/types";

@Component({
  components: {
    "product-base": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ProductsGrid extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(Object) readonly productsByRow!: TBreakpointsNumber;

  /**
   * Getters
   */
  // props to children components
  get productProps() {
    return {
      cardProps: { flat: true, outlined: true },
      title: { position: "bottom" },
      rating: { show: true },
      ribbon: { show: true },
      showPrice: true,
    };
  }

  // objects prop with default values
  get getProductsByRow(): TBreakpointsNumber {
    const _defaultProductsByRow: TBreakpointsNumber = {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6,
    };
    return Object.assign(_defaultProductsByRow, this.productsByRow);
  }

  get cantProductsByRow() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.getProductsByRow.xl;
      case "lg":
        return this.getProductsByRow.lg;
      case "md":
        return this.getProductsByRow.md;
      case "sm":
        return this.getProductsByRow.sm;
      default:
        return this.getProductsByRow.xs;
    }
  }

  get colProps() {
    return {
      xl: 12 / this.getProductsByRow.xl,
      lg: 12 / this.getProductsByRow.lg,
      md: 12 / this.getProductsByRow.md,
      sm: 12 / this.getProductsByRow.sm,
      xs: 12 / this.getProductsByRow.xs,
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