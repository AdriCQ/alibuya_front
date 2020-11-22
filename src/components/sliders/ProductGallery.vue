<template>
  <v-card
    :max-width="mdAndUp ? undefined : '100%'"
    flat
    class="product-gallery mx-auto position-sticky"
    :style="{ top: lgAndUp ? '100px' : '0' }"
  >
    <v-card-text>
      <!-- Image Carousel -->
      <v-carousel
        cycle
        v-model="activeImg"
        :show-arrows="!mdAndUp"
        :show-arrows-on-hover="!mdAndUp && !xs"
        :hide-delimiters="true"
        interval="3000"
        height="250"
        class="mb-2 mb-md-4"
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
      <v-sheet v-if="mdAndUp" max-width="fit-content" class="mx-auto">
        <v-slide-group v-model="activeImg" mandatory show-arrows>
          <v-slide-item
            v-for="(src, key) in imgsSrc"
            :key="`product-gallery-slide-group-${key}`"
            v-slot="{ active, toggle }"
          >
            <v-card :class="{ 'grey lighten-2': active }" outlined>
              <v-card-text class="pa-1">
                <v-img :src="src" contain width="80" @click="toggle" />
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <!-- / Selector Slider -->
    </v-card-text>
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