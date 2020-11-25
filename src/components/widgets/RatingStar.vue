<template>
  <div class="rating-stars">
    <div v-for="(star, i) in stars" :key="i" :class="starContainerClass">
      <v-img :src="star" :alt="`Star rating_${i}`" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class RatingStarWidget extends Vue {
  @Prop(Number) readonly rating!: number;
  @Prop(Boolean) readonly sm!: boolean;
  @Prop(Boolean) readonly xs!: boolean;

  get stars() {
    const number = Number(Math.ceil(this.rating));
    let breakpoint = 0;
    if (number !== this.rating) {
      breakpoint = number;
    }
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (breakpoint && breakpoint - 1 === i) stars.push(this.halfStarSrc);
      else if (i < this.rating) stars.push(this.fullStarSrc);
      else stars.push(this.emptyStarSrc);
    }
    return stars;
  }

  get halfStarSrc() {
    return "img/stars/half_star.png";
  }

  get fullStarSrc() {
    return "img/stars/full_star.png";
  }
  get emptyStarSrc() {
    return "img/stars/empty_star.png";
  }

  get starContainerClass() {
    if (this.xs) return "star-container-xs";
    else if (this.sm) return "star-container-sm";
    else return "star-container";
  }
}
</script>