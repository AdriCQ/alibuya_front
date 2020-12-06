<template>
  <product-basic
    :product="product"
    :card-props="cardProps"
    :image-props="imageProps"
    :link="link"
    :show-title="showTitle"
    :show-price="showPrice"
  >
    <template #actions>
      <span
        class="blue--text text--darken-2 text-body-1 cursor-pointer"
        @click="showProductDetails(product.id)"
      >
        <slot name="actions" />
      </span>
    </template>
  </product-basic>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import ProductBaseClass from "@/utils/mixins";
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class OfferProductWidget extends ProductBaseClass {
  @Prop({
    type: Object,
    required: true,
  })
  readonly product!: IProduct;
}
</script>