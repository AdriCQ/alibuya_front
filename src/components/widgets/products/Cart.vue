<template>
  <basic v-bind="propsBasic" :product="product">
    <template #header
      ><!-- Button Badge -->
      <v-btn
        v-if="cantProducts"
        color="primary"
        dark
        absolute
        fab
        :small="mdAndUp"
        :x-small="!mdAndUp"
        elevation="0"
        class="text-subtitle-2 text-md-body-1 position-top-left"
        >{{ cantProducts }}</v-btn
      >
      <!-- / Button Badge --></template
    >
  </basic>
</template>

<script lang='ts'>
import { Component, Mixins, Prop } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins";
import { IProduct, IProductCart } from "@/types";

@Component({
  components: {
    basic: () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class CartProductWidget extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Object, required: true }) readonly productCart!: IProductCart;

  /**
   * Getters
   */
  get product(): IProduct {
    return {
      id: this.productCart.id,
      title: this.productCart.title,
      brand: this.productCart.brand,
      tax: this.productCart.tax,
      description: this.productCart.description,
      price: this.productCart.price,
      images: this.productCart.images,
      image: this.productCart.image,
      weight: this.productCart.weight,
      options: this.productCart.options,
      tags: this.productCart.tags,
      rating: this.productCart.rating,
      suggested: this.productCart.suggested,
      available_cant: this.productCart.available_cant,
      type: this.productCart.type,
    };
  }

  get propsBasic() {
    return {
      cardProps: {
        elevation: 3,
      },
      showTitle: true,
      showRating: true,
      showRibbon: true,
      showPrice: true,
      fluid: true,
      bodyClass: "px-0",
    };
  }

  get cantProducts() {
    return this.productCart.cart_cant;
  }
}
</script>