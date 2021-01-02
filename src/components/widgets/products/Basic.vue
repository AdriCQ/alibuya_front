<template>
  <v-card
    :ripple="false"
    v-bind="cardAllProps"
    :elevation="0"
    :class="['basic-product-widget', 'mx-auto', cardClass]"
    width="100%"
    :max-width="maxWidth"
    max-height="100%"
  >
    <!-- Header -->
    <slot name="header" />
    <!-- / Header -->

    <!-- Body -->
    <v-card-text :class="['position-relative', bodyClass]">
      <!-- Suggested -->
      <v-ribbon v-if="product.suggested && getShowRibbon" color="primary" dark>
        <span class="text-transform-none"> Sugerido </span>
      </v-ribbon>

      <!-- Image -->
      <v-img
        v-if="image"
        :src="image.xs"
        :alt="product.title"
        v-bind="imageAllProps"
        :class="imageClass"
        @click="imageClick"
      />
    </v-card-text>
    <!-- / Body -->

    <!-- Title -->
    <v-card-title v-if="getShowTitle" :class="['text-single-line', titleClass]">
      {{ product.title }}
    </v-card-title>
    <!-- / Title -->

    <!-- Rating -->
    <v-card-title v-if="getShowRating && product.rating">
      <v-rating
        color="primary accent-4"
        :value="Number(product.rating)"
        background-color="primary"
        half-increments
        readonly
        small
        dense
      />
    </v-card-title>
    <!-- / Rating -->

    <!-- Description -->
    <v-card-text
      v-if="getShowDescription && product.description"
      class="text-color-body text-single-line py-1"
    >
      {{ product.description }}
    </v-card-text>
    <!-- / Description -->

    <!-- Price -->
    <v-card-title v-if="getShowPrice" class="text-right">
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
import { mixins } from "vue-class-component";
import { ProductBasicMixin } from "@/mixins/product";
// types
import { IProduct } from "@/types";
import { ProductImage } from "@/utils";

@Component({
  components: {
    "v-ribbon": () => import("@/components/widgets/Ribbon.vue"),
  },
})
export default class BasicProductWidget extends mixins(ProductBasicMixin) {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;

  // class
  @Prop({ type: String, default: "" }) readonly titleClass!: string;
  @Prop({ type: String, default: "" }) readonly bodyClass!: string;

  get image() {
    // return new ProductImage(this.product.image, true);
    return new ProductImage(this.product.image);
  }

  get imageClass() {
    return ["mx-auto", { "cursor-pointer": this.getLink }];
  }

  get cardClass() {
    return [{ large: this.getLarge }, { small: this.getSmall }];
  }

  /**
   * Image Max Width
   */
  get maxWidthLarge() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 280;
      case "md":
        return 310;
      case "lg":
        return 330;
      case "xl":
        return 350;
      default:
        return 260;
    }
  }

  get maxWidthDefault() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 260;
      case "md":
        return 290;
      case "lg":
        return 300;
      case "xl":
        return 320;
      default:
        return 250;
    }
  }

  get maxWidthSmall() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 210;
      case "md":
        return 230;
      case "lg":
        return 230;
      case "xl":
        return 250;
      default:
        return 180;
    }
  }

  get maxWidth() {
    if (this.large) return this.maxWidthLarge;
    if (this.small) return this.maxWidthSmall;
    if (this.fluid) return "100%";
    else return this.maxWidthDefault;
  }

  /**
   * Props
   */
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
    if (this.getLink) {
      this.showProductDetails(this.product.id);
    }
  }
}
</script>