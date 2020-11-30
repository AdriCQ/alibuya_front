<template>
  <v-card flat>
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <slick-carousel
      v-if="products.lenght"
      class="slick"
      ref="icons-carousel"
      :arrows="$vuetify.breakpoint.mdAndUp"
      :dots="true"
      :centerMode="false"
      :infinite="true"
      :slidesToShow="slidesToShow"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
      :centerPadding="'20px'"
      :autoplay="true"
      dotsClass="slick-dots"
    >
      <div v-for="(v, i) in products" :key="i" class="mx-2">
        <product-card :product="v" badge="Nuevo" />
      </div>
    </slick-carousel>
  </v-card>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "product-card": () => import("@/components/widgets/Product.vue"),
  },
})
export default class ProductMultipleSlider extends Vue {
  @Prop(Array) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;

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
        return 1;
      default:
        return 1;
    }
  }

  get displayArrows() {
    return this.$vuetify.breakpoint.mdAndUp;
  }
}
</script>