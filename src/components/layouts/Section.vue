<template>
  <section class="app-section" :style="sStyle">
    <v-container>
      <slot></slot>
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