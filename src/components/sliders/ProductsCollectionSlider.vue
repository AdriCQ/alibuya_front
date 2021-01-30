<template>
  <v-card class="products-container">
    <v-card-title v-if="title">{{ title }} </v-card-title>

    <slick-carousel
      class="slick pa-0"
      :arrows="!xs"
      :center-mode="false"
      :slides-to-show="slidesToShow"
      infinite
      swipe-to-slide
      :slides-to-scroll="1"
      autoplay
    >
      <!-- Left/Right Arrows -->
      <template #prevArrow>
        <v-btn color="primary" depressed dark fab x-small>
          <v-icon> mdi-arrow-left</v-icon>
        </v-btn>
      </template>

      <template #nextArrow>
        <v-btn color="primary" depressed dark fab x-small>
          <v-icon> mdi-arrow-right</v-icon>
        </v-btn>
      </template>
      <!-- / Left/Right Arrows -->

      <!-- Products -->
      <div
        v-for="(product, key) in products"
        :key="`products-slider-product-${key}`"
      >
        <product-base :product="product" v-bind="getProductsOptions" />
      </div>
      <!-- Products -->
    </slick-carousel>
  </v-card>
</template>

<script lang='ts'>
/**
 * TODO: Create Product prop to config options in parent scope
 */

import { Component, Mixins, Prop } from "vue-property-decorator";
import { IProduct, TBreakpointsNumber } from "@/types";
import { GettersBreakpointsMixin } from "@/mixins";

@Component({
  components: {
    "product-base": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ProductsCollectionSlider extends Mixins(
  GettersBreakpointsMixin
) {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
  // Cofigure slides to show in each breakpoint
  @Prop(Object) readonly productsToShow!: TBreakpointsNumber;
  @Prop(Object) readonly productsOptions!: object;

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

  get getProductsOptions(): object {
    const _defaultProductsOptions = {
      cardProps: { flat: true },
      title: { position: "bottom" },
      rating: { show: false },
      ribbon: { show: true },
      showPrice: true,
    };
    return Object.assign(_defaultProductsOptions, this.productsOptions);
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.getProductsToShow.xl;
      case "lg":
        return this.getProductsToShow.lg;
      case "md":
        return this.getProductsToShow.md;
      case "sm":
        return this.getProductsToShow.sm;
      default:
        return this.getProductsToShow.xs;
    }
  }
}
</script>