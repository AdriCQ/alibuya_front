<template>
  <div>
    <v-btn
      v-for="(color, key) in colors"
      :key="`color-${key}`"
      :color="color.value"
      :ripple="false"
      tag="div"
      small
      fab
      class="mr-2"
    >
    </v-btn>
  </div>
</template>

<script lang='ts'>
import { IColor } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Colors extends Vue {
  @Prop({ type: Array, required: true }) readonly colors!: IColor[];
}
</script>