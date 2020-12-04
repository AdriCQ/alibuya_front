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
        <v-btn color="white" class="black--text" fab x-small>
          <v-icon> mdi-arrow-left</v-icon>
        </v-btn>
      </template>

      <template #nextArrow>
        <v-btn color="white" class="black--text" fab x-small>
          <v-icon> mdi-arrow-right</v-icon>
        </v-btn>
      </template>

      <div v-for="(product, key) in products" :key="`slider-item-${key}`">
        <product-basic
          :card-props="cardsProps"
          :image-props="imagesProps"
          :product="product"
          :link="link"
          class="mx-auto"
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
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "200" };
    },
  })
  readonly cardsProps!: object;
  @Prop(Object) readonly imagesProps!: object;

  @Prop(String) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;

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