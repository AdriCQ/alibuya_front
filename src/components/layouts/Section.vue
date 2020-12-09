<template>
  <section :style="sStyle">
    <v-container :fluid="fluid" class="py-0 my-0 px-2 px-md-4 px-lg-6">
      <slot />
    </v-container>
  </section>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AppSection extends Vue {
  @Prop(String) readonly bg?: string;
  @Prop(String) readonly height?: string;
  @Prop(String) readonly minHeight?: string;
  @Prop({ type: Boolean, default: false }) readonly fluid!: boolean;

  get sStyle() {
    let style = "";
    style += this.bg
      ? `background: url(${this.bg}) center no-repeat; background-size: cover;`
      : "";
    style += this.height ? `height:${this.height};` : "";
    style += this.minHeight ? `min-height:${this.minHeight};` : "";
    return style;
  }
}
</script>