<template>
  <v-card flat class="products-collection-slider">
    <v-card-title v-if="title">{{ title }} </v-card-title>
    <slick-carousel
      class="slick pa-0"
      :arrows="!xs"
      :centerMode="false"
      :infinite="false"
      :slidesToShow="slidesToShow"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
    >
      <template #prevArrow>
        <v-btn color="secondary lighten-2" dark fab x-small>
          <v-icon> mdi-arrow-left</v-icon>
        </v-btn>
      </template>

      <template #nextArrow>
        <v-btn color="secondary lighten-2" dark fab x-small>
          <v-icon> mdi-arrow-right</v-icon>
        </v-btn>
      </template>

      <div v-for="(product, key) in products" :key="`slider-item-${key}`">
        <product-basic
          :card-props="cardProps"
          :image-props="imageProps"
          :product="product"
          :link="link"
          class="mx-auto"
        />
      </div>
    </slick-carousel>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
// types
import { IProduct } from "@/types";
import ProductBaseClass from "@/services/mixins";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsCollectionSlider extends ProductBaseClass {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;

  // breakpoints
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return 6;
      case "lg":
        return 5;
      case "md":
        return 4;
      case "sm":
        return 3;
      case "xs":
        return 2;
      default:
        return 2;
    }
  }
}
</script>