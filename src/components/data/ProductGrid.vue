<template>
  <v-row justify="center" no-gutters>
    <v-col
      cols="auto"
      v-for="(prod, prodKey) in products"
      :key="`product-${prodKey}`"
      class="ma-1"
      :color="single ? 'transparent' : undefined"
    >
      <product :product="prod" />
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    product: () => import("@/components/widgets/products/Default.vue"),
  },
})
export default class ProductListGrid extends Vue {
  @Prop({
    type: Array,
    default: [],
  })
  readonly products!: IProduct[];
  @Prop({ type: Boolean, default: false }) readonly single!: boolean;
}
</script>