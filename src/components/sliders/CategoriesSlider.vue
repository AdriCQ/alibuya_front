<template>
  <div class="categories-slider">
    <slick-carousel
      class="slick"
      ref="icons-carousel"
      :arrows="true"
      :dots="true"
      :centerMode="true"
      :infinite="true"
      :slidesToShow="5"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
      :centerPadding="'20px'"
      :autoplay="true"
      dotsClass="slick-dots"
    >
      <div class="categories-slider-item" v-for="(department, label) in departments" :key="label">
        <v-card>
          <v-card-text class="text-center">
            <v-avatar color="primary" size="6rem">
              <v-icon color="secondary" size="4rem">{{ department.icon }}</v-icon>
            </v-avatar>
          </v-card-text>
          <v-card-text>{{ department.label[lang] }}</v-card-text>
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
}
</script>