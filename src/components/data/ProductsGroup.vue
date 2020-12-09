<template>
  <v-card
    class="products-group"
    flat
    :color="single ? 'transparent' : undefined"
  >
    <!-- Title -->
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <!-- Title -->

    <v-row align="start">
      <v-col
        v-for="(product, key) in productsFilter"
        :key="`products-group-${key}`"
        cols="6"
        sm="4"
        md="3"
        xl="2"
      >
        <product-basic
          :product="product"
          :card-props="cardAllProps"
          :image-props="imageProps"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          :show-description="showDescription"
          class="my-1"
          :body-class="!single ? 'px-0' : ''"
        >
        </product-basic>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import ProductBaseClass from "@/mixins/product";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsGroup extends ProductBaseClass {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;

  /**
   *
   */
  @Prop({ type: Boolean, default: false }) readonly single!: boolean;

  /**
   *
   */
  get productsFilter() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return this.products.slice(0, 3);
      case "md":
        return this.products.slice(0, 4);
      case "lg":
        return this.products.slice(0, 4);
      case "xl":
        return this.products.slice(0, 6);
      default:
        return this.products.slice(0, 2);
    }
  }

  get cardAllProps() {
    return {
      flat: !this.single,
      ...this.cardProps,
    };
  }
}
</script>