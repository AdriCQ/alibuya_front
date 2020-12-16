<template>
  <v-carousel
    class="pb-3"
    v-model="model"
    height="auto"
    hide-delimiters
    light
    cycle
    interval="2500"
  >
    <v-carousel-item v-for="(product, i) in products" :key="i">
      <v-sheet elevation="0">
        <product-widget :product="product" />
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import ProductWidget from "@/components/widgets/Product.vue";

@Component({
  components: {
    "product-widget": ProductWidget,
  },
})
export default class ProductsSlider extends Vue {
  @Prop({ type: Array, default: [] }) readonly products!: IProduct[];
  model = 0;
}
</script>