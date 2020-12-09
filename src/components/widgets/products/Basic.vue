<template>
  <v-card
    :ripple="false"
    v-bind="cardAllProps"
    class="basic-product-widget mx-auto"
  >
    <!-- Header -->
    <slot name="header" />
    <!-- / Header -->

    <!-- Image -->
    <v-card-text :class="bodyClass">
      <v-img
        :src="image.xs"
        :alt="product.title"
        v-bind="imageAllProps"
        :class="imgClass"
        @click="imageClick"
      />
    </v-card-text>
    <!-- / Image -->

    <!-- Title -->
    <v-card-title
      v-if="showTitle"
      :class="[
        'py-2',
        { 'py-0': showDescription || showPrice || !!$slots['footer'] },
        'text-single-line',
        titleClass,
      ]"
    >
      {{ product.title }}
    </v-card-title>
    <!-- / Title -->

    <!-- Description -->
    <v-card-text
      v-if="showDescription"
      class="grey--text text--darken-1 text-single-line py-1"
    >
      {{ product.description }}
    </v-card-text>
    <!-- / Description -->

    <!-- Price -->
    <v-card-title v-if="showPrice" class="text-right py-1">
      $ {{ Number(product.price).toFixed(2) }}
    </v-card-title>
    <!-- / Price -->

    <!-- Footer -->
    <v-card-actions v-if="!!$slots['footer']" class="px-4 py-3 mt-auto">
      <slot name="footer" />
    </v-card-actions>
    <!-- / Footer -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import { ProductImage } from "@/utils";
import ProductBaseClass from "@/mixins/product";

@Component
export default class BasicProductWidget extends ProductBaseClass {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;

  @Prop({ type: String, default: "" }) readonly titleClass!: string;
  @Prop({ type: String, default: "" }) readonly bodyClass!: string;

  get image() {
    return new ProductImage(this.product.image, true);
  }

  get imgClass() {
    return ["mx-auto", { "cursor-pointer": this.link }];
  }

  /**
   * All props to children components
   */
  get cardAllProps() {
    return {
      // defaults
      maxWidth: 400,
      // from parent
      ...this.cardProps,
    };
  }

  get imageAllProps() {
    return {
      // defaults
      maxWidth: 280,
      // from parent
      ...this.imageProps,
    };
  }

  /**
   *
   */

  showProductDetails(id: number) {
    if (id) {
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
          query: {
            productId: id.toString(),
          },
        });
    }
  }

  imageClick() {
    if (this.link) {
      this.showProductDetails(this.product.id);
    }
  }
}
</script>