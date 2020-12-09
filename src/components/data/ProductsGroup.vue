<template>
  <v-card
    class="products-group"
    flat
    :color="separated ? 'transparent' : undefined"
  >
    <!-- Title -->
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <!-- Title -->

    <v-row no-gutters>
      <v-col
        v-for="(product, key) in productsFilter"
        :key="`products-group-${key}`"
        cols="6"
        sm="4"
        md="3"
        lg
        :class="{ 'px-1': separated }"
      >
        <product-basic
          :product="product"
          :card-props="{
            maxWidth: '100%',
            flat: !separated,
            ...cardProps,
          }"
          :image-props="{
            maxWidth: 190,
            ...imageProps,
          }"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          :body-class="separated ? '' : 'pa-0 pb-2'"
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
  @Prop({ type: Boolean, default: false }) readonly separated!: boolean;

  /**
   *
   */
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }

  get sm() {
    return this.$vuetify.breakpoint.sm;
  }

  get md() {
    return this.$vuetify.breakpoint.md;
  }

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
        return this.products.slice(0, 5);
      case "xl":
        return this.products.slice(0, 6);
      default:
        return this.products.slice(0, 2);
    }
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 4;
      case "xl":
        return 5;

      default:
        return 1;
    }
  }
}
</script>