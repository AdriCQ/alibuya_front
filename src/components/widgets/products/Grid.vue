<template>
  <v-section fluid>
    <!-- Full Rows -->
    <v-row
      v-for="(list, listKey) in productsFilledByRow"
      :key="`list-item-${listKey}`"
    >
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(product, key) in list"
        :key="`grid-product-${listKey * productsByRow + key}`"
      >
        <product-basic v-bind="productProps" :product="product" />
      </v-col>
    </v-row>
    <!-- / Full Rows -->

    <!-- Last Row -->
    <template v-if="productsInLastRow.length">
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          v-for="(product, key) in productsInLastRow"
          :key="`grid-product-${rows * productsByRow + key}`"
        >
          <product-basic v-bind="productProps" :product="product" />
        </v-col>
      </v-row>
    </template>
    <!-- / Last Row -->
  </v-section>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";
// types
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class Grid extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Array, default: [] }) readonly products!: IProduct[];
  @Prop(Object) readonly productProps!: object;
  /**
   *
   */
  get productsByRow() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 3;
      case "md":
        return 4;
      case "lg":
        return 6;
      case "xl":
        return 6;
      default:
        return 2;
    }
  }

  get rows() {
    return Math.trunc(this.products.length / this.productsByRow);
  }

  // products that fill complete rows
  get productsFilledByRow() {
    const items: Array<IProduct[]> = [];

    for (let i = 0; i < this.rows; i++) {
      items[i] = [];
      for (let j = 0; j < this.productsByRow; j++)
        items[i].push(this.products[i * this.productsByRow + j]);
    }

    return items;
  }

  // rest products
  get productsInLastRow() {
    const items: IProduct[] = [],
      numbProducts = this.products.length % this.productsByRow;
    for (let i = 0; i < numbProducts; i++)
      items.push(this.products[this.rows * this.productsByRow + i]);
    return items;
  }
}
</script>