<template>
  <product-simple-base v-bind="getSimpleBaseProps">
    <v-section>
      <v-row v-for="row in 2" :key="`product-family-widget-row-${row}`">
        <v-col
          v-for="col in 2"
          cols="6"
          :key="`product-family-widget-row-${row}-${col}`"
        >
          <product-base
            :product="products[(row - 1) * 2 + col - 1]"
            v-bind="getProductProps"
          />
        </v-col>
      </v-row>
    </v-section>
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
export default class ProductFamilyWidget extends Mixins(ProductWidgetsHeight) {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];

  @Prop(String) readonly title!: string;
  @Prop(Object) readonly link!: ITextLink;

  created() {
    if (this.products.length != 4)
      console.log(
        "Error in ProductFamilyWidget the number of products pass like prop is diferent of 4."
      );
  }

  /**
   * Getters
   */
  // utils
  get imageHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.ProductWidgetsHeight_height.xl / 2 - 110;
      case "lg":
        return this.ProductWidgetsHeight_height.lg / 2 - 110;
      case "md":
        return this.ProductWidgetsHeight_height.md / 2 - 110;
      case "sm":
        return this.ProductWidgetsHeight_height.sm / 2 - 110;
      default:
        return this.ProductWidgetsHeight_height.xs / 2 - 110;
    }
  }

  // props to children
  get getProductProps(): object {
    return {
      cardProps: { tile: true },
      imageProps: {
        height: this.imageHeight,
        gradient:
          "to top right, rgb(128, 179, 255, .2), rgba(128, 179, 255, .3)",
      },
      title: { show: true, position: "bottom" },
      rating: { show: false },
      ribbon: { show: false },
      small: true,
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