<template>
  <v-section fluid>
    <!-- Full Rows -->
    <v-row
      v-for="(listItem, listItemKey) in listItems"
      :key="`list-item-${listItemKey}`"
      :justify="justify"
    >
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg
        v-for="(item, key) in listItem"
        :key="`grid-item-${listItemKey * itemsByRow + key}`"
      >
        <slot name="grid-item" :item="item" />
      </v-col>
    </v-row>
    <!-- / Full Rows -->

    <!-- Last Row -->
    <template v-if="lastItems.length">
      <v-row :justify="justify">
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg
          v-for="(item, key) in lastItems"
          :key="`grid-item-${rows * itemsByRow + key}`"
        >
          <slot name="grid-item" :item="item" />
        </v-col>

        <!-- Columns for complete this row -->
        <v-col
          v-for="key in itemsByRow - lastItems.length"
          :key="`grid-item-${rows * itemsByRow + lastItems.length + key}`"
        />
      </v-row>
    </template>
    <!-- / Last Row -->
  </v-section>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";

@Component
export default class Grid extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Array, default: [] }) readonly items!: [];
  @Prop({ type: String }) readonly justify!: string;

  /**
   *
   */
  get itemsByRow() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 3;
      case "md":
        return 4;
      case "lg":
        return 5;
      case "xl":
        return 6;
      default:
        return 2;
    }
  }

  get rows() {
    return Math.trunc(this.items.length / this.itemsByRow);
  }

  // items that fill complete rows
  get listItems() {
    const items = [];

    for (let i = 0; i < this.rows; i++) {
      items[i] = [];
      for (let j = 0; j < this.itemsByRow; j++)
        items[i].push(this.items[i * this.itemsByRow + j]);
    }

    return items;
  }

  // rest items
  get lastItems() {
    const items: Array<unknown> = [],
      numbItems = this.items.length % this.itemsByRow;
    for (let i = 0; i < numbItems; i++)
      items.push(this.items[this.rows * this.itemsByRow + i]);
    return items;
  }
}
</script>