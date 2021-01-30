<template>
  <basic v-bind="props" :product="productProp" />
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
// types
import { IProduct, IProductCart } from "@/types";

@Component({
  components: {
    basic: () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class CartProductSimple extends Vue {
  @Prop({ type: Object, required: true }) readonly product!: IProductCart;
  @Prop(Object) readonly props!: object;

  /**
   * Getters
   */
  get productProp(): IProduct {
    return {
      id: this.product.id,
      title: this.product.title,
      brand: this.product.brand,
      tax: this.product.tax,
      description: this.product.description,
      price: this.product.price,
      images: this.product.images,
      image: this.product.image,
      weight: this.product.weight,
      options: this.product.options,
      tags: this.product.tags,
      rating: this.product.rating,
      suggested: this.product.suggested,
      available_cant: this.product.available_cant,
      type: this.product.type,
    };
  }
}
</script>