<template>
  <v-card
    flat
    max-width="100%"
    class="product-gallery position-sticky"
    :style="{ top: lgAndUp ? '120px' : '0' }"
  >
    <!-- Image Carousel -->
    <v-carousel
      cycle
      v-model="activeImg"
      :show-arrows="false"
      :hide-delimiters="true"
      interval="3000"
      height="300"
      class="mb-3"
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
      <v-slide-group v-model="activeImg" mandatory center-active show-arrows>
        <v-slide-item
          v-for="(src, key) in imgsSrc"
          :key="`product-gallery-slide-group-${key}`"
          v-slot="{ active, toggle }"
        >
          <v-card :class="{ 'border-primary': active }" outlined>
            <v-card-text class="pa-1">
              <v-img :src="src" contain width="80" @click="toggle" />
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <!-- / Selector Slider -->
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductGallery extends Vue {
  @Prop({ type: Array, required: true })
  readonly imgsSrc!: string[];

  activeImg = 0;

  get xs() {
    return this.$vuetify.breakpoint.xsOnly;
  }

  get mdAndUp() {
    return this.$vuetify.breakpoint.mdAndUp;
  }

  get lgAndUp() {
    return this.$vuetify.breakpoint.lgAndUp;
  }
}
</script>