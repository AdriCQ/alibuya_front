<template>
  <v-row class="products-group" justify="center" justify-md="start">
    <v-col
      v-for="(product, key) in products"
      cols="auto"
      md="4"
      lg="3"
      :key="`product-group-item-${key}`"
    >
      <product-basic
        :title="product.title"
        :image-src="product.images"
        :max-width="productsMaxWidth"
        :card-props="cardsProps"
        :image-props="imageProps"
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
  @Prop({ type: Boolean, default: false }) readonly cardsProps!: boolean;
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "400" };
    },
  })
  readonly imageProps!: object;
  @Prop({ type: [Number, String], default: 300 }) readonly productsMaxWidth!:
    | number
    | string;
}
</script>