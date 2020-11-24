<template>
  <div class="categories-slider">
    <slick-carousel
      class="slick"
      :arrows="displayArrows"
      :dots="true"
      :centerMode="true"
      :infinite="true"
      :slidesToShow="slidesToShow"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
      :centerPadding="'20px'"
      :autoplay="true"
      dotsClass="slick-dots"
    >
      <div
        class="categories-slider-item"
        v-for="(category, key) in categories"
        :key="key"
      >
        <v-card :to="category.to">
          <div class="w-100 text-center">
            <v-img
              :src="category.image"
              :alt="`Category-${key}`"
              width="100%"
            />
          </div>
          <v-card-title justify-center>{{
            category.labelLang.es
          }}</v-card-title>
        </v-card>
      </div>
    </slick-carousel>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CATEGORIES } from "@/utils/const";
import { AppStore } from "@/store";

@Component
export default class CategoriesSlider extends Vue {
  get categories() {
    return CATEGORIES;
  }

  get lang() {
    return AppStore.lang;
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return 6;
      case "lg":
        return 6;
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