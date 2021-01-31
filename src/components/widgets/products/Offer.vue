<template>
  <product-simple-base v-bind="getSimpleBaseProps">
    <product-base :product="product" v-bind="getProductProps" />
  </product-simple-base>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { IProduct, ITextLink, IProductSimpleBaseWidget_props } from "@/types";
import { ProductWidgetsHeight } from "@/mixins";

@Component({
  components: {
    "product-simple-base": () =>
      import("@/components/widgets/products/SimpleBase.vue"),
    "product-base": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ProductOfferWidget extends Mixins(ProductWidgetsHeight) {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;

  @Prop(String) readonly title!: string;
  @Prop(Object) readonly link!: ITextLink;

  /**
   * Getters
   */
  // utils
  get imageHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.ProductWidgetsHeight_height.xl - 105;
      case "lg":
        return this.ProductWidgetsHeight_height.lg - 105;
      case "md":
        return this.ProductWidgetsHeight_height.md - 105;
      case "sm":
        return this.ProductWidgetsHeight_height.sm - 100;
      default:
        return this.ProductWidgetsHeight_height.xs - 100;
    }
  }

  // props to children
  get getProductProps(): object {
    return {
      imageProps: { height: this.imageHeight, contain: true },
      title: { show: false },
      rating: { show: false },
      ribbon: { show: false },
      link: false,
    };
  }

  get getSimpleBaseProps(): IProductSimpleBaseWidget_props {
    return {
      title: this.title,
      link: this.link,
    };
  }
}
</script>