<template>
  <product-basic
    :product="product"
    :card-props="{ ...cardProps, maxWidth: 320 }"
    :image-props="{ ...imageProps, maxWidth: 280 }"
    :link="link"
    :body-class="`${bodyClass} black--text`"
    class="offer-product-widget"
  >
    <template #header>
      <v-card-title :class="['font-weight-bold', 'py-2', 'title', titleClass]">
        <slot name="title">{{ title }}</slot>
      </v-card-title>
    </template>

    <v-card-text class="py-2">
      <span class="title black--text mb-2">
        $ {{ Number(product.price).toFixed(2) }}
      </span>

      <p class="mb-0">
        {{ product.description }}
      </p>
    </v-card-text>

    <template #footer>
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

  @Prop(String) readonly title!: string;
}
</script>