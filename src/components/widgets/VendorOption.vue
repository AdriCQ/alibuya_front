<template>
  <v-card class="cursor-pointer" width="12rem" :to="option.to">
    <div class="text-center">
      <v-sheet color="secondaryBetha" class="pa-8">
        <v-icon x-large color="primary">{{ option.icon }}</v-icon>
      </v-sheet>
    </div>
    <v-card-text class="text-center title">{{ option.label }}</v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { ILinkIconLabel } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class VendorOptionWidget extends Vue {
  @Prop(Object) readonly option!: ILinkIconLabel;
}
</script>