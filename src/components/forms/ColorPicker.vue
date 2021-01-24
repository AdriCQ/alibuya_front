<template>
  <v-item-group v-model="colorComp">
    <v-input :error-messages="errorMessages">
      <v-container fluid class="px-0">
        <v-row v-for="row in rows" :key="`color-picker-row-${row}`">
          <v-col
            cols="auto"
            md="3"
            lg="2"
            v-for="(color, col) in colors.slice(
              (row - 1) * itemsByRow,
              row * itemsByRow
            )"
            :key="`color-picker-row-${row}-col-${col}`"
          >
            <v-item v-slot="{ active, toggle }" :value="color.value">
              <!-- Circle Button Color -->
              <v-tooltip content-class="rounded-pill" bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :color="color.value"
                    :max-height="sizeCom"
                    :max-width="sizeCom"
                    elevation="4"
                    fab
                    dark
                    @click="toggle"
                    v-on="on"
                  >
                    <v-icon v-if="active" color="primary lighten-1" small>
                      mdi-check
                    </v-icon>
                  </v-btn>
                </template>
                <span class="text-subtitle-2"> {{ color.label }} </span>
              </v-tooltip>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-input>
  </v-item-group>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Mixins } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins";
import { IColor } from "@/types";

@Component
export default class ColorPicker extends Mixins(GettersBreakpointsMixin) {
  @PropSync("color", { type: String }) readonly colorComp!: string;
  @Prop({ type: Array, required: true }) readonly colors!: IColor[];
  // design
  @Prop({ type: [Number, String] }) readonly size!: number | string;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
  // validations
  @Prop({
    type: [String, Array],
    default: function () {
      return [];
    },
  })
  readonly errorMessages!: string | [];

  /**
   * Getters
   */
  get sizeCom() {
    if (!this.size) {
      if (this.small) return 30;
      else return 32;
    } else return this.size;
  }

  get itemsByRow() {
    switch (this.$vuetify.breakpoint.name) {
      case "lg":
        return 6;
      case "md":
        return 4;
      default:
        return Math.max(6, this.colors.length);
    }
  }

  get rows() {
    const length = this.colors.length;
    return (
      Math.trunc(length / this.itemsByRow) + (length % this.itemsByRow ? 1 : 0)
    );
  }
}
</script>