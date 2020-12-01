<template>
  <v-card flat>
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-row class="products-group" no-gutters>
      <v-col
        v-for="key in max"
        xs="4"
        md="3"
        lg="2"
        :key="`product-group-item-${key}`"
      >
        <product-basic
          :product="products[key]"
          :card-props="cardsProps"
          :image-props="imagesProps"
          :link="link"
          class="ma-1"
        >
          <!-- <template #actions>
          <v-btn color="primary" text class="text-transform-none">
            <strong> Ver más</strong>
          </v-btn>
        </template> -->
        </product-basic>
      </v-col>
    </v-row>
  </v-card>
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

  @Prop(String) readonly title!: string;
  @Prop(Boolean) readonly link!: boolean;

  @Prop({ type: Number, default: 8 }) readonly max!: number;
}
</script>