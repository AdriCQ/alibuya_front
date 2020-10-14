<template>
  <div
    :style="`background-image: url(${img}); height: ${height}`"
    class="banner-widget"
  >
    <div
      class="banner-overlay"
      :style="`background-color: rgba(0,0,0,${opacity});`"
    >
      <div class="banner-content">
        <slot>
          <h3 class="text-center white--text">Some Text</h3>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BannerWidget extends Vue {
  @Prop({
    type: String,
    default: "images/banners/b1.jpg",
  })
  readonly img!: string;

  @Prop({
    type: String,
    default: "auto",
  })
  readonly height!: string;

  @Prop({
    type: Number,
    default: 0.6,
  })
  readonly opacity!: number;
}
</script>