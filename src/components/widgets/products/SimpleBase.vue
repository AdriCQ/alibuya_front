<template>
  <v-card v-bind="cardAllProps" class="product-simple-base-widget">
    <v-card-title v-if="title"> {{ title }} </v-card-title>

    <slot />

    <v-card-actions
      v-if="getLink.show"
      class="position-absolute position-bottom-left"
    >
      <v-btn
        :to="goTo(getLink.to)"
        color="blue darken-1"
        :ripple="false"
        text
        class="text-none"
      >
        {{ getLink.title }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { IRouteLink, ITextLink } from "@/types";
import { ProductWidgetsHeight, RouterMixin } from "@/mixins";

@Component
export default class ProductSimpleBaseWidget extends Mixins(
  RouterMixin,
  ProductWidgetsHeight
) {
  @Prop(String) readonly title!: string;
  @Prop(Object) readonly link!: ITextLink;

  /**
   * Getters
   */

  // objects prop with default values
  get getLink(): ITextLink {
    const _defaultLink: ITextLink = {
      show: false,
      to: "",
      title: "Ver más",
    };
    return Object.assign(_defaultLink, this.link);
  }

  // utils
  get cardHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.ProductWidgetsHeight_height.xl;
      case "lg":
        return this.ProductWidgetsHeight_height.lg;
      case "md":
        return this.ProductWidgetsHeight_height.md;
      case "sm":
        return this.ProductWidgetsHeight_height.sm;
      default:
        return this.ProductWidgetsHeight_height.xs;
    }
  }

  // props to children
  get cardAllProps() {
    return {
      height: this.cardHeight,
    };
  }

  /**
   * Methods
   */
  goTo(_to: IRouteLink) {
    this.RouterMixin_goto(_to);
  }
}
</script>