<template>
  <div class="cant-input">
    <v-icon class="cursor-pointer" v-if="canMinus" @click="minus"
      >mdi-minus</v-icon
    >
    <v-spacer />
    <span>{{ cant }}</span>
    <v-spacer />

    <v-icon class="cursor-pointer" v-if="canPlus" @click="plus"
      >mdi-plus</v-icon
    >
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductCantInput extends Vue {
  @Prop(Number) readonly cant!: number;
  @Prop({ type: Boolean, default: true }) readonly canPlus!: boolean;
  @Prop({ type: Boolean, default: true }) readonly canMinus!: boolean;

  plus() {
    if (this.canPlus) this.$emit("update:cant", this.cant + 1);
  }

  minus() {
    if (this.canMinus) {
      if (this.cant > 1) this.$emit("update:cant", this.cant + -1);
      else {
        this.$emit("zero");
      }
    }
  }
}
</script>