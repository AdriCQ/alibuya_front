<template>
  <v-item-group v-model="colorComp" mandatory>
    <v-row no-gutters>
      <v-col
        cols="auto"
        v-for="(color, key) in colors"
        :key="`color-picker-${key}`"
      >
        <v-item v-slot="{ active, toggle }" :value="color.value">
          <div class="text-center mr-4" @click="toggle">
            <v-btn
              :color="color.value"
              :height="sizeCom"
              :width="sizeCom"
              fab
              depressed
            >
              <v-icon v-if="active" color="primary lighten-1" :small="small">
                mdi-check
              </v-icon>
            </v-btn>

            <div
              class="text-subtitle-2 mt-1"
              :class="{ 'primary--text': active }"
            >
              {{ color.label }}
            </div>
          </div>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script lang='ts'>
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import { IColor } from "@/types";

@Component
export default class ColorPicker extends Vue {
  @PropSync("color", { type: String }) readonly colorComp!: string;
  @Prop({ type: Array, required: true }) readonly colors!: IColor[];
  @Prop({ type: [Number, String] }) readonly size!: number | string;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;

  get sizeCom() {
    if (!this.size) {
      if (this.small) return 30;
      else return 32;
    } else return this.size;
  }
}
</script>