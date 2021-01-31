<template>
  <v-card class="products-group">
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-row>
      <v-col
        v-for="(product, key) in productsFilter"
        :key="`products-group-product-${key}`"
        v-bind="colProps"
      >
        <product-base :product="product" v-bind="productProps" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct, TBreakpointsNumber } from "@/types";

@Component({
  components: {
    "product-base": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ProductsGroup extends Vue {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
  @Prop(Object) readonly productsToShow!: TBreakpointsNumber;

  /**
   * Getters
   */
  // objects prop with default values
  get getProductsToShow(): TBreakpointsNumber {
    const _defaultProductsToShow: TBreakpointsNumber = {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6,
    };
    return Object.assign(_defaultProductsToShow, this.productsToShow);
  }

  get productsFilter() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return this.products.slice(0, this.getProductsToShow.sm);
      case "md":
        return this.products.slice(0, this.getProductsToShow.md);
      case "lg":
        return this.products.slice(0, this.getProductsToShow.lg);
      case "xl":
        return this.products.slice(0, this.getProductsToShow.xl);
      default:
        return this.products.slice(0, this.getProductsToShow.xs);
    }
  }

  // props to children components
  get productProps() {
    return {
      cardProps: { flat: true },
      title: { position: "bottom" },
      rating: { show: false },
      ribbon: { show: true },
      showPrice: true,
    };
  }

  get colProps() {
    return {
      cols: 12 / this.getProductsToShow.xs,
      sm: 12 / this.getProductsToShow.sm,
      md: 12 / this.getProductsToShow.md,
      lg: 12 / this.getProductsToShow.lg,
      xl: 12 / this.getProductsToShow.xl,
    };
  }
}
</script>