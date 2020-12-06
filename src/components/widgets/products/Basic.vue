<template>
  <v-card :ripple="false" v-bind="cardProps" :class="cardClass">
    <v-card-title v-if="product.title || !!$slots['title']" class="py-2">
      <slot name="title">
        <span>
          {{ product.title }}
        </span>
      </slot>

      <slot name="title-right" />
    </v-card-title>

    <v-card-text>
      <v-img
        :src="image"
        :alt="product.title"
        v-bind="imageProps"
        :class="imgClass"
        @click="imageClick"
      />
    </v-card-text>

    <v-card-actions v-if="!!$slots['actions']" class="px-4 py-4">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import ProductBaseClass from "@/services/mixins";
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
  get image() {
    return new ProductImage(this.product.image);
  }

  get imgClass() {
    return ["mx-auto", { "cursor-pointer": this.link }];
  }

  get cardClass() {
    return ["basic-product-widget"];
  }

  imageClick() {
    if (this.link) {
      this.showProductDetails(this.product.id);
    }
  }
}
</script>