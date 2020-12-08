<template>
  <v-card
    :ripple="false"
    v-bind="{ maxWidth: 400, ...cardProps }"
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
        v-bind="{ maxWidth: 300, ...imageProps }"
        :class="imgClass"
        @click="imageClick"
      />
    </v-card-text>
    <!-- / Image -->

    <!-- Title -->
    <v-card-title
      v-if="!!$slots['title'] || showTitle"
      :class="['py-2', titleClass]"
    >
      <template v-if="!!$slots['title'] || showTitle">
        <slot name="title">
          <span>
            {{ product.title }}
          </span>
        </slot>
      </template>
    </v-card-title>
    <!-- / Title -->

    <slot />

    <!-- Description -->
    <v-card-text v-if="showDescription" class="py-0">
      {{ product.description }}
    </v-card-text>
    <!-- / Description -->

    <!-- Price -->
    <v-card-title v-if="showPrice" class="mt-auto ml-auto py-2">
      <b> $ {{ Number(product.price).toFixed(2) }}</b>
    </v-card-title>
    <!-- / Price -->

    <v-card-actions
      v-if="!!$slots['footer']"
      :class="['px-4 py-3 mt-auto', footerClass]"
    >
      <slot name="footer" />
    </v-card-actions>
    <!-- / Footer -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import ProductBaseClass from "@/utils/mixins";
import { IProduct } from "@/types";
import { ProductImage } from "@/utils";

/**
 * TODO:
 * En caso de que el title del producto sea muy largo los productos varian la altura en la que se muestan
 */

@Component
export default class BasicProductWidget extends ProductBaseClass {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;

  /**
   *
   */
  get image() {
    return new ProductImage(this.product.image, true);
  }

  get imgClass() {
    return ["mx-auto", { "cursor-pointer": this.link }];
  }
  /**
   *
   */
  imageClick() {
    if (this.link) {
      this.showProductDetails(this.product.id);
    }
  }
}
</script>