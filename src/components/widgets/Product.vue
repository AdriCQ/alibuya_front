<template>
  <v-card class="mx-auto" :max-width="width">
    <div :style="`width:${width}`">
      <v-img width="100%" :src="product.img" />
    </div>

    <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
    <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" small>
        <v-icon class="mr-1">mdi-eye</v-icon>Detalles
      </v-btn>

      <v-btn color="primary" small>
        <v-icon>mdi-cart-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component
export default class ProductWidget extends Vue {
  @Prop({
    type: Object,
    default: {
      title: "",
      price: "",
      img: "",
      description: "",
    },
  })
  readonly product!: IProduct;

  get width() {
    return "15rem";
  }
}
</script>