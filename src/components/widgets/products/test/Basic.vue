<template>
  <v-card v-bind="cardAllProps" :class="cardClass">
    <!-- Header -->
    <slot name="header" />
    <!-- / Header -->

    <!-- Body -->
    <v-row no-gutters align="center">
      <v-col v-bind="col1Props">
        <v-card-text :class="['position-relative', bodyClass]">
          <!-- Suggested -->
          <v-ribbon v-if="product.suggested && showRibbon" color="primary" dark>
            <span class="text-transform-none"> Sugerido </span>
          </v-ribbon>
          <!-- / Suggested -->

          <!-- Image -->
          <v-img
            v-if="image"
            v-bind="imageAllProps"
            :class="imageAllClass"
            @click="imageClick"
          />
        </v-card-text>
      </v-col>

      <v-col v-bind="col2Props">
        <!-- Title -->
        <v-card-title v-if="showTitle" :class="titleAllClass">
          {{ product.title }}
        </v-card-title>
        <!-- / Title -->

        <!-- Rating -->
        <v-card-title v-if="showRating && product.rating">
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
          v-if="showDescription && product.description"
          class="text-color-body text-single-line py-1"
        >
          <div v-html="product.description" />
        </v-card-text>
        <!-- / Description -->

        <!-- Price -->
        <v-card-title v-if="showPrice" class="text-right">
          $ {{ Number(product.price).toFixed(2) }}
        </v-card-title>
        <!-- / Price -->
      </v-col>
    </v-row>
    <!-- / Body -->

    <!-- Footer -->
    <v-card-actions v-if="!!$slots['footer']" class="mt-auto">
      <slot name="footer" />
    </v-card-actions>
    <!-- / Footer -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins, Prop } from "vue-property-decorator";
import { ProductBaseMixin } from "@/mixins";
// types
import { IProduct } from "@/types";
import { ProductImage } from "@/utils";

@Component({
  components: {
    "v-ribbon": () => import("@/components/widgets/Ribbon.vue"),
  },
})
export default class BasicProductWidget extends Mixins(ProductBaseMixin) {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;

  // Class Props
  @Prop({ type: String, default: "" }) readonly titleClass!: string;
  @Prop({ type: String, default: "" }) readonly bodyClass!: string;

  /**
   * Getters
   */

  // Class
  get imageAllClass() {
    return ["mx-auto", { "cursor-pointer": this.link }];
  }

  get cardClass() {
    return [
      // defaults
      "basic-product-widget",
      "mx-auto",
      // configs
      { large: this.large },
      { small: this.small },
    ];
  }

  get titleAllClass() {
    return [{ "text-single-line": this.titleOneLine }, this.titleClass];
  }

  /**
   *
   */
  get image() {
    // return new ProductImage(this.product.image, true);
    return new ProductImage(this.product.image);
  }

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
   * Geters for Props to chld components
   */
  get cardAllProps() {
    return {
      // defaults
      width: "100%",
      height: "100%",
      maxHeight: "100%",
      ripple: false,
      elevation: 0,
      maxWidth: this.maxWidth,
      // from parent
      ...this.cardProps,
    };
  }

  get imageAllProps() {
    return {
      // defaults
      width: "100%",
      height: "100%",
      src: this.image.xs,
      alt: this.product.title,
      // from parent
      ...this.imageProps,
    };
  }

  get col1Props() {
    if (this.horizontal) {
      return { cols: 6 };
    } else return { cols: 12 };
  }

  get col2Props() {
    if (this.horizontal) {
      return { cols: 6 };
    } else return { cols: 12 };
  }

  /**
   * Mehthods
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