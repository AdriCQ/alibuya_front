<!-- TODO:
    props flat in v-card is fixed until I learn to pass props from parent in high level 
 -->
<template>
  <v-card class="basic-product-widget" v-bind="cardProps">
    <v-card-title v-if="title || !!$slots['title']" class="py-2">
      <slot name="title">
        {{ title }}
      </slot>
    </v-card-title>

    <v-img
      v-if="product.images"
      :src="product.images"
      :alt="product.title"
      v-bind="imageProps"
      class="mx-auto"
      width="100%"
    />
    <slot />

    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BasicProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop(Object) readonly cardProps!: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {
        title: "",
        images: "",
      };
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  readonly imageProps!: object;
}
</script>