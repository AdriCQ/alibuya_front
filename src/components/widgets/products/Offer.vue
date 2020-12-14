<template>
  <product-basic
    :product="product"
    :card-props="cardProps"
    :image-props="imageProps"
    :show-description="showDescription"
    :link="link"
    :large="large"
    class="offer-product-widget"
  >
    <!-- Header -->
    <template v-if="title || showTitle || showPrice" #header>
      <v-card-title class="text-single-line">
        <template v-if="title">{{ title }}</template>
        <template v-else-if="showTitle">{{ product.title }}</template>

        <span v-if="showPrice">
          <br v-if="title || showTitle" />
          $ {{ Number(product.price).toFixed(2) }}</span
        >
      </v-card-title>
    </template>
    <!-- / Header -->

    <!-- Actions -->
    <template v-if="to" #footer>
      <span class="text-link text-body-2 mt-auto" @click="goToRoute">
        {{ textLink }}
      </span>
    </template>
    <!-- / Actions -->
  </product-basic>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import ProductBaseClass from "@/mixins/product";
import { IProduct, TRouteLink } from "@/types";

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

  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop([Object, String]) readonly to!: TRouteLink;
  @Prop({ type: String, default: "Ver más" }) readonly textLink!: string;

  /**
   *
   */
  goToRoute() {
    this.$router.push(this.to);
  }
}
</script>