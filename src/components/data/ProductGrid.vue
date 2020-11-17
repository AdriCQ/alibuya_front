<template>
  <v-row justify="center">
    <v-col
      cols="auto"
      v-for="(prod, prodKey) in products"
      :key="`product-${prodKey}`"
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
    product: () => import("@/components/widgets/Product.vue"),
  },
})
export default class ProductListGrid extends Vue {
  @Prop({
    type: Array,
    default: [],
  })
  readonly products!: IProduct[];
}
</script>