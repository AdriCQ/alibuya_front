<template>
  <v-input :error-messages="errorMessages">
    <v-item-group v-model="colorComp">
      <v-row no-gutters>
        <v-col
          cols="auto"
          v-for="(color, key) in colors"
          :key="`color-picker-item-group-${key}`"
        >
          <v-item v-slot="{ active, toggle }" :value="color.value">
            <div class="text-center mr-4">
              <!-- Circle Button Color -->
              <v-btn
                :color="color.value"
                :max-height="sizeCom"
                :max-width="sizeCom"
                elevation="4"
                fab
                @click="toggle"
              >
                <v-icon v-if="active" color="primary lighten-1" :small="small">
                  mdi-check
                </v-icon>
              </v-btn>

              <!-- Color Label -->
              <div
                class="text-color-body text-subtitle-2 mt-1"
                :class="{ 'primary--text': active }"
              >
                {{ color.label }}
              </div>
            </div>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-input>
</template>

<script lang='ts'>
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import { IColor } from "@/types";

@Component
export default class ColorPicker extends Vue {
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
   *
   */
  get sizeCom() {
    if (!this.size) {
      if (this.small) return 30;
      else return 32;
    } else return this.size;
  }
}
</script>