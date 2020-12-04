<template>
  <v-card class="products-group" flat>
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-row class="products-group" no-gutters>
      <v-col
        v-for="(product, key) in products"
        v-bind="colsProps"
        :key="`product-group-item-${key}`"
      >
        <product-basic
          v-if="!advanced"
          :product="product"
          :card-props="cardsProps"
          :image-props="imagesProps"
          :link="link"
          class="mx-auto"
        />
        <product-advanced
          v-else
          :product="product"
          :card-props="cardsProps"
          :image-props="imagesProps"
          :link="link"
          :withRating="withRating"
          :withTitle="withTitle"
          :withPrice="withPrice"
          :withCant="withCant"
          class="mx-auto"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
    "product-advanced": () =>
      import("@/components/widgets/products/Advanced.vue"),
  },
})
export default class ProductsGroup extends Vue {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  // props to children
  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "200" };
    },
  })
  readonly cardsProps!: object;
  @Prop(Object) readonly imagesProps!: object;

  //
  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  readonly colsProps!: object;

  @Prop(String) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;
  @Prop({ type: Boolean, default: false }) readonly advanced!: boolean;

  @Prop({ type: Number, default: 8 }) readonly max!: number;

  @Prop({ type: Boolean, default: false }) readonly withRating!: boolean;
  @Prop({ type: Boolean, default: false }) readonly withTitle!: boolean;
  @Prop({ type: Boolean, default: false }) readonly withPrice!: boolean;
  @Prop({ type: Boolean, default: false }) readonly withCant!: boolean;

  get counter() {
    return this.max < this.products.length ? this.max : this.products.length;
  }
}
</script>