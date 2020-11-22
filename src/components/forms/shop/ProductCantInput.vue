<template>
  <!-- <div class="cant-input">
    <v-icon class="ci-button ci-button-minus" v-if="canMinus" @click="minus">
      mdi-minus
    </v-icon>
    <div class="ci-button ci-button-minus" v-else />
    <v-spacer />
    <span class="cant">{{ cant }}</span>
    <v-spacer />

    <v-icon class="ci-button ci-button-plus" v-if="canPlus" @click="plus">
      mdi-plus
    </v-icon>
  </div> -->
  <div>
    <v-select
      @change="update"
      label="Cantidad"
      class="w-20"
      outlined
      dense
      :items="items"
    />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductCantInput extends Vue {
  @Prop(Number) readonly cant!: number;
  @Prop({ type: Boolean, default: true }) readonly canPlus!: boolean;
  @Prop({ type: Boolean, default: true }) readonly canMinus!: boolean;

  get items() {
    const items: number[] = [];
    for (let i = 1; i <= this.cant; i++) {
      items.push(i);
    }
    return items;
  }

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

  update(_value: number) {
    this.$emit("update:cant", _value);
  }
}
</script>