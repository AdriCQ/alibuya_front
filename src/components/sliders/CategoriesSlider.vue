<template>
  <div class="categories-slider">
    <slick-carousel
      class="slick"
      ref="icons-carousel"
      :arrows="true"
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
        v-for="(department, label) in departments"
        :key="label"
      >
        <v-card :to="department.to">
          <v-card-text class="text-center">
            <v-avatar color="secondary" size="6rem">
              <v-icon color="primary" size="5rem">{{ department.icon }}</v-icon>
            </v-avatar>
          </v-card-text>
          <!-- TODO: Fix Electrodomesticos text -->
          <v-card-text class="subtitle">{{
            department.label[lang]
          }}</v-card-text>
        </v-card>
      </div>
    </slick-carousel>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store/App";

@Component
export default class CategoriesSlider extends Vue {
  get departments() {
    return DEPARTMENTS;
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
}
</script>