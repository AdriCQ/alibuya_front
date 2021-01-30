<template>
  <div :class="wrapClass">
    <div :class="ribbonClass">
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Ribbon extends Vue {
  @Prop({ type: String, default: "primary" }) readonly color!: string;
  @Prop(Boolean) readonly dark!: boolean;
  @Prop(Boolean) readonly light!: boolean;
  @Prop(Boolean) readonly large!: boolean;
  @Prop(Boolean) readonly xLarge!: boolean;

  get wrapClass() {
    return [
      "ribbon-wrapper",
      { "ribbon-lg": this.large },
      { "ribbon-xl": this.xLarge },
    ];
  }

  get ribbonClass() {
    let theme = "text-color-body";
    if (this.dark && !this.light) theme = "white--text";
    return ["ribbon", this.color, theme];
  }
}
</script>