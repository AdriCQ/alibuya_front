<template>
  <div class="cant-input">
    <v-icon class="cursor-pointer" @click="minus">mdi-minus</v-icon>
    <v-spacer />
    <span>{{ cant }}</span>
    <v-spacer />

    <v-icon class="cursor-pointer" @click="plus">mdi-plus</v-icon>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductCantInput extends Vue {
  @Prop(Number) readonly cant!: number;

  plus() {
    this.$emit("update:cant", this.cant + 1);
  }

  minus() {
    if (this.cant >= 1) this.$emit("update:cant", this.cant + -1);
  }
}
</script>