<template>
  <v-card
    flat
    class="products-collection-slider"
    elevation="0"
    color="tranparent"
  >
    <v-card-title v-if="title">{{ title }} </v-card-title>

    <slick-carousel
      class="slick pa-0"
      :arrows="!xs"
      :centerMode="false"
      infinite
      :slidesToShow="slidesToShow"
      swip
      swipeToSlide
      :slidesToScroll="1"
      autoplay
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
import { mixins } from "vue-class-component";

// types
import { TItemsToShow, IProduct, TRouteLink } from "@/types";
import { ProductMixin } from "@/mixins/product";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsCollectionSlider extends mixins(ProductMixin) {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
  @Prop([Object, String]) readonly to!: TRouteLink;
  @Prop({ type: String, default: "Ver más" }) readonly textLink!: string;
  // Cofigure slides to show in each breakpoint
  @Prop(Object) readonly elementsToShow!: TItemsToShow;

  /* Defaults values */
  defaultElementsToShow: TItemsToShow = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };

  /**
   *
   */
  get numberElements(): TItemsToShow {
    const _numberElements: TItemsToShow = {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
    };
    Object.assign(
      _numberElements,
      this.defaultElementsToShow,
      this.elementsToShow
    );
    return _numberElements;
  }

  /**
   *
   */
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return this.numberElements.sm;
      case "md":
        return this.numberElements.md;
      case "lg":
        return this.numberElements.lg;
      case "xl":
        return this.numberElements.xl;
      default:
        return this.numberElements.xs;
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