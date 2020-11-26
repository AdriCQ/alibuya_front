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
            <v-btn :color="color.value" :height="size" :width="size" fab />
            <div class="text-subtitle-2" :class="{ 'primary--text': active }">
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
  @Prop({ type: [Number, String], default: 40 }) readonly size!:
    | number
    | string;
}
</script>