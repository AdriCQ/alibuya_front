<template>
  <v-card
    v-bind="cardAllProps"
    :class="cardAllClass"
    @click="showProductDetails"
  >
    <!-- Suggested ribbon -->
    <v-ribbon
      v-if="product.suggested && getRibbon.show"
      :color="getRibbon.color"
      :dark="getRibbon.dark"
    >
      <span class="text-none"> Sugerido </span>
    </v-ribbon>
    <!-- / Suggested ribbon -->

    <!-- Title on top -->
    <v-card-title
      v-if="product.title && getTitle.show && getTitle.position == 'top'"
      :class="titleAllClass"
    >
      {{ product.title }}
    </v-card-title>
    <!-- / Title on top -->

    <v-img :src="imageSrc" v-bind="imageAllProps" />

    <!-- Title on bottom -->
    <v-card-title
      v-if="product.title && getTitle.show && getTitle.position == 'bottom'"
      :class="titleAllClass"
    >
      {{ product.title }}
    </v-card-title>
    <!-- / Title on bottom -->

    <!-- Rating -->
    <v-card-title v-if="product.rating && getRating.show">
      <v-rating
        :color="getRating.color"
        :value="Number(product.rating)"
        :background-color="getRating.bgColor"
        half-increments
        readonly
        small
        dense
      />
    </v-card-title>
    <!-- / Rating -->

    <!-- Price -->
    <v-card-title v-if="product.price && showPrice" :class="priceAllClass">
      ${{ Number(product.price).toFixed(2) }}
    </v-card-title>
    <!-- / Price -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import { ProductImage } from "@/utils";
import { ProductBaseMixin } from "@/mixins";

@Component({
  components: {
    "v-ribbon": () => import("@/components/widgets/Ribbon.vue"),
  },
})
export default class ProductBaseWidget extends Mixins(ProductBaseMixin) {
  /**
   * Getters
   */
  // image
  get image() {
    // return new ProductImage(this.product.image, true);
    return new ProductImage(this.product.image);
  }

  get imageSrc() {
    return this.image.xs;
  }

  // utils for class
  get textClass() {
    return [
      {
        "text-caption text-sm-subtitle-2 text-md-body-2": this.small,
      },
      { "text-h6 text-sm-h5 text-md-h4 text-lg-h4": this.large },
      {
        "text-subtitle-2 text-sm-subtitle-1  text-md-body-1":
          !this.small && !this.large,
      },
    ];
  }

  // class
  get cardAllClass() {
    return ["product-base-widget", { "v-card-link-none": !this.link }];
  }

  get titleAllClass() {
    return [this.textClass, { "text-single-line": this.getTitle.singleLine }];
  }

  get priceAllClass() {
    return [this.textClass];
  }

  // utils for props
  get cardRipple() {
    return this.link ? { class: "grey--text text--darken-2" } : false;
  }

  // props
  get cardAllProps() {
    return {
      flat: true,
      ripple: this.cardRipple,
      link: this.link,
      ...this.cardProps,
    };
  }

  get imageAllProps() {
    return { ...this.imageProps };
  }

  /**
   * Methods
   */
  showProductDetails() {
    if (this.link) {
      this.goToProductDetails(this.product.id);
    }
  }
}
</script>
