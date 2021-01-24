<template>
  <v-card
    class="products-group"
    flat
    :color="single ? 'transparent' : undefined"
  >
    <!-- Title -->
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <!-- Title -->

    <v-row align="start">
      <v-col
        v-for="(product, key) in productsFilter"
        :key="`products-group-${key}`"
        :cols="cols"
        :sm="sm"
        :md="md"
        :lg="lg"
        :xl="xl"
      >
        <product-basic
          :product="product"
          :card-props="cardAllProps"
          :image-props="imageProps"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          :show-description="showDescription"
          class="my-1"
          :body-class="!single ? 'px-0' : ''"
        >
        </product-basic>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins, Prop } from "vue-property-decorator";
import { TItemsToShow, IProduct } from "@/types";
import { ProductMixin } from "@/mixins/product";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsGroup extends Mixins(ProductMixin) {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;

  /**
   *
   */
  @Prop({ type: Boolean, default: false }) readonly single!: boolean;
  @Prop(Object) readonly elementsToShow!: TItemsToShow;

  defaultElementsToShow: TItemsToShow = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 6,
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

  get productsFilter() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return this.products.slice(0, this.numberElements.sm);
      case "md":
        return this.products.slice(0, this.numberElements.md);
      case "lg":
        return this.products.slice(0, this.numberElements.lg);
      case "xl":
        return this.products.slice(0, this.numberElements.xl);
      default:
        return this.products.slice(0, this.numberElements.xs);
    }
  }

  get cardAllProps() {
    return {
      flat: !this.single,
      ...this.cardProps,
    };
  }

  get cols() {
    return 12 % this.numberElements.xs == 0
      ? 12 / this.numberElements?.xs
      : true;
  }

  get sm() {
    return 12 % this.numberElements.sm == 0
      ? 12 / this.numberElements.sm
      : true;
  }

  get md() {
    return 12 % this.numberElements.md == 0
      ? 12 / this.numberElements.md
      : true;
  }

  get lg() {
    return 12 % this.numberElements.lg == 0
      ? 12 / this.numberElements.lg
      : true;
  }

  get xl() {
    return 12 % this.numberElements.xl == 0
      ? 12 / this.numberElements.xl
      : true;
  }
}
</script>