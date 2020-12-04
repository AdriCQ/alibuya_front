<template>
  <div class="advanced-product-widget">
    <product-basic
      :product="product"
      :image-props="imageProps"
      :card-props="cardProps"
      :link="link"
    >
      <v-card-text v-if="withRating">
        <rating-star :rating="product.rating" sm />
      </v-card-text>
      <v-card-subtitle class="my-0 py-0" v-if="withPrice"
        >${{ Number(product.price).toFixed(2) }}</v-card-subtitle
      >

      <v-card-subtitle class="my-0 py-0" v-if="withTitle">{{
        product.title
      }}</v-card-subtitle>
      <v-card-subtitle class="my-0 py-0" v-if="withCant"
        >{{ product.cant }} Piezas</v-card-subtitle
      >
    </product-basic>
  </div>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
    "rating-star": () => import("@/components/widgets/RatingStar.vue"),
  },
})
export default class AdvancedProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop(Object) readonly cardProps!: object;
  @Prop({
    type: Object,
    default: () => {
      return {
        title: "",
        images: "",
      };
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: Object,
    default: () => {
      return {};
    },
  })
  readonly imageProps!: object;
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;
  // Advanced
  @Prop({ type: Boolean, default: true }) readonly withRating!: boolean;
  @Prop({ type: Boolean, default: true }) readonly withTitle!: boolean;
  @Prop({ type: Boolean, default: true }) readonly withPrice!: boolean;
  @Prop({ type: Boolean, default: true }) readonly withCant!: boolean;
}
</script>