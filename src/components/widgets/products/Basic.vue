<template>
  <v-card
    :ripple="false"
    v-bind="cardAllProps"
    elevation="0"
    :class="['basic-product-widget', 'mx-auto', cardClass]"
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
        :max-width="imageMaxWidth"
      />
    </v-card-text>
    <!-- / Image -->

    <!-- Title -->
    <v-card-subtitle v-if="showTitle" :class="['text-single-line', titleClass]">
      {{ product.title }}
    </v-card-subtitle>
    <!-- / Title -->

    <!-- Description -->
    <v-card-text
      v-if="showDescription"
      class="grey--text text--darken-2 text-single-line py-1"
    >
      {{ product.description }}
    </v-card-text>
    <!-- / Description -->

    <!-- Price -->
    <v-card-title v-if="showPrice" class="text-right">
      $ {{ Number(product.price).toFixed(2) }}
    </v-card-title>
    <!-- / Price -->

    <!-- Footer -->
    <v-card-actions v-if="!!$slots['footer']" class="mt-auto">
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
   * Image Max Width
   *
   */

  // TODO: (in the future) Configure manualy the image max width
  get imageMaxWidthLarge() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 320;
      case "md":
        return 350;
      case "lg":
        return 365;
      case "xl":
        return 370;
      default:
        return 300;
    }
  }

  get imageMaxWidthDefault() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 210;
      case "md":
        return 230;
      case "lg":
        return 180;
      case "xl":
        return 250;
      default:
        return 200;
    }
  }

  get imageMaxWidthSmall() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 160;
      case "md":
        return 170;
      case "lg":
        return 180;
      case "xl":
        return 185;
      default:
        return 160;
    }
  }

  get imageMaxWidth() {
    if (this.large) return this.imageMaxWidthLarge;
    if (this.small) return this.imageMaxWidthSmall;
    else return this.imageMaxWidthDefault;
  }

  get cardAllProps() {
    return {
      // defaults
      width: "100%",
      height: "100%",
      // from parent
      ...this.cardProps,
    };
  }

  get imageAllProps() {
    return {
      // defaults
      width: "100%",
      height: "100%",
      // from parent
      ...this.imageProps,
    };
  }

  get cardClass() {
    return [{ large: this.large }, { small: this.small }];
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