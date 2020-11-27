<template>
  <v-row no-gutters class="ma-1">
    <v-col v-for="(product, key) in products" :key="key">
      <v-card width="128px">
        <v-img :src="product.image" :alt="product.title" />
      </v-card>
      <!-- Title -->
      <v-card-subtitle v-if="title">{{ title }}</v-card-subtitle>
      <!-- / Title -->
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class GridProducWidget extends Vue {
  @Prop(Array) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
}
</script>