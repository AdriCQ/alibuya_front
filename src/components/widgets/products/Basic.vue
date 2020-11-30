<!-- TODO:
    props flat in v-card is fixed until I learn to pass props from parent in high level 
 -->
<template>
  <v-card class="basic-product-widget" :max-width="maxWidth" v-bind="cardProps">
    <v-card-title class="py-2">
      <slot name="title">
        {{ title }}
      </slot>
    </v-card-title>

    <v-card-text>
      <v-img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt"
        v-bind="imageProps"
        class="mx-auto"
      />
      <slot />
    </v-card-text>

    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BasicProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: [Number, String], default: 300 }) readonly maxWidth!:
    | number
    | string;
  @Prop(Object) readonly cardProps!: boolean;

  @Prop({ type: String }) readonly imageSrc!: string;
  @Prop({ type: String, default: "Image" }) readonly imageAlt!: string;
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "400" };
    },
  })
  readonly imageProps!: object;
}
</script>