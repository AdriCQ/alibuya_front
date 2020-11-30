<template>
  <v-row class="products-group" no-gutters justify="space-between">
    <v-col
      v-for="(product, key) in products"
      xs="4"
      md="3"
      lg="2"
      :key="`product-group-item-${key}`"
    >
      <product-basic
        :product="product"
        :card-props="cardsProps"
        :image-props="imagesProps"
        class="ma-1"
      >
        <template #actions>
          <v-btn color="primary" text class="text-transform-none">
            <strong> Ver más</strong>
          </v-btn>
        </template>
      </product-basic>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
// types
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsGroup extends Vue {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(Object) readonly cardsProps!: object;
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "400" };
    },
  })
  readonly imagesProps!: object;
}
</script>