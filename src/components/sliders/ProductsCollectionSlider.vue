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
      <!-- Arrows -->
      <template #prevArrow>
        <v-btn color="primary" dark fab x-small>
          <v-icon color="black"> mdi-arrow-left</v-icon>
        </v-btn>
      </template>

      <template #nextArrow>
        <v-btn color="primary" dark fab x-small>
          <v-icon color="black"> mdi-arrow-right</v-icon>
        </v-btn>
      </template>
      <!-- / Arrows -->

      <!-- Products -->
      <div
        v-for="(product, key) in products"
        :key="`products-slider-item-${key}`"
      >
        <product-basic
          :card-props="{ flat: true, ...cardProps }"
          :image-props="imageProps"
          :product="product"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          class="mx-auto"
          body-class="px-0"
        />
      </div>
      <!-- Products -->
    </slick-carousel>

    <!-- Actions -->
    <v-card-actions v-if="to" class="mt-auto">
      <span class="text-link text-body-2" @click="goToRoute">
        {{ textLink }}
      </span>
    </v-card-actions>
    <!-- / Actions -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
// types
import { IProduct, TRouteLink } from "@/types";
import ProductBaseClass from "@/mixins/product";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsCollectionSlider extends ProductBaseClass {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
  @Prop([Object, String]) readonly to!: TRouteLink;
  @Prop({ type: String, default: "Ver más" }) readonly textLink!: string;

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

  /**
   *
   */
  goToRoute() {
    this.$router.push(this.to);
  }
}
</script>