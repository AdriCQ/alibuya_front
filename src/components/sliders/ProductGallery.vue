<template>
  <v-card
    flat
    max-width="100%"
    class="product-gallery position-sticky pb-lg-5 pt-3"
    :style="{ top: lgAndUp ? '119px' : '0' }"
  >
    <!-- Image Carousel -->
    <v-carousel
      cycle
      v-model="activeImg"
      :show-arrows="false"
      :hide-delimiters="true"
      interval="3000"
      :height="imageCarouselHeight"
      class="mb-4 mb-lg-5"
    >
      <v-carousel-item
        v-for="(src, key) in imgsSrc"
        :key="`product-gallery-carousel-${key}`"
      >
        <v-img :src="src" contain height="100%" />
      </v-carousel-item>
    </v-carousel>
    <!-- / Image Carousel -->

    <!-- Selector Slider -->
    <v-sheet max-width="fit-content" class="mx-auto">
      <v-slide-group v-model="activeImg" mandatory center-active>
        <!-- Prev Slot -->
        <template #prev>
          <v-btn color="primary" dark text fab small>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <!-- Next Slot -->
        <template #next>
          <v-btn color="primary" dark text fab small>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>

        <!-- Items -->
        <v-slide-item
          v-for="(src, key) in imgsSrc"
          :key="`product-gallery-slide-group-${key}`"
          v-slot="{ toggle, active }"
        >
          <v-card
            flat
            tile
            outlined
            :class="active ? 'border-primary' : 'border-transparent'"
          >
            <v-card-text class="pa-1">
              <v-img
                :src="src"
                contain
                :width="selectorImageWidth"
                @click="toggle"
              />
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <!-- / Selector Slider -->
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";
import { mixins } from "vue-class-component";

@Component
export default class ProductGallery extends mixins(GettersBreakpointsMixin) {
  @Prop({ type: Array, required: true })
  readonly imgsSrc!: string[];

  activeImg = 0;

  /**
   *
   */
  get imageCarouselHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 240;
      case "md":
        return 290;
      case "lg":
        return 320;
      case "xl":
        return 340;
      default:
        return 200;
    }
  }

  get selectorImageWidth() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 85;
      case "md":
        return 60;
      case "lg":
        return 75;
      case "xl":
        return 80;
      default:
        return 80;
    }
  }
}
</script>