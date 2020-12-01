<template>
  <v-card flat class="products-collection-slider">
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <slick-carousel
      class="slick pa-0"
      ref="icons-carousel"
      :arrows="true"
      :centerMode="false"
      :infinite="false"
      :slidesToShow="slidesToShow"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
      :autoplay="false"
    >
      <div v-for="(product, key) in products" :key="`slider-item-${key}`">
        <product-basic
          :card-props="cardsProps"
          class="mx-auto"
          :product="product"
          :link="link"
        />
      </div>
    </slick-carousel>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
// types
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsCollectionSlider extends Vue {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  // props to children
  @Prop(Object) readonly cardsProps!: object;
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "400" };
    },
  })
  readonly imagesProps!: object;

  @Prop(String) readonly title!: string;
  @Prop(Boolean) readonly link!: boolean;

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