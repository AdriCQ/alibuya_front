<template>
  <div class="advanced-product-widget">
    <product-basic
      :product="product"
      :image-props="imageProps"
      :card-props="cardProps"
      :link="link"
    >
      <v-card-text>
        <rating-star :rating="product.rating" sm />
        <span class="mt-2">{{ product.title }}</span>
      </v-card-text>
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
}
</script>