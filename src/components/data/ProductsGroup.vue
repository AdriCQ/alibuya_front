<template>
  <v-card flat>
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-row class="products-group" no-gutters>
      <v-col
        v-for="key in max"
        v-bind="colsProps"
        :key="`product-group-item-${key}`"
      >
        <product-basic
          :product="products[key]"
          :card-props="cardsProps"
          :image-props="imagesProps"
          :link="link"
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
  @Prop(Object) readonly colsProps!: object;

  @Prop(String) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;

  @Prop({ type: Number, default: 8 }) readonly max!: number;
}
</script>