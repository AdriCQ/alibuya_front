<template>
  <v-card :ripple="false" v-bind="cardProps" class="basic-product-widget">
    <!-- Header -->
    <slot name="header" />
    <!-- / Header -->

    <!-- Body -->
    <v-card-text :class="bodyClass">
      <v-img
        :src="image.xs"
        :alt="product.title"
        v-bind="imageProps"
        :class="imgClass"
        @click="imageClick"
      />

      <slot />
    </v-card-text>
    <!-- / Body -->

    <!-- Title -->
    <v-card-title
      v-if="
        !!$slots['title'] || showTitle || !!$slots['title-right'] || showPrice
      "
      :class="['py-2', titleClass]"
    >
      <template v-if="!!$slots['title'] || showTitle">
        <slot name="title">
          <span>
            {{ product.title }}
          </span>
        </slot>
      </template>

      <template v-if="!!$slots['title-right'] || showPrice">
        <v-spacer />
        <slot name="title-right">
          <span> $ {{ Number(product.price).toFixed(2) }} </span>
        </slot>
      </template>
    </v-card-title>
    <!-- / Title -->

    <!-- Footer -->
    <v-card-actions
      v-if="!!$slots['footer']"
      :class="['px-4 py-4', footerClass]"
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