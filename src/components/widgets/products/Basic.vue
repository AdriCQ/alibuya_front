<!-- TODO:
    props flat in v-card is fixed until I learn to pass props from parent in high level 
 -->
<template>
  <v-card class="basic-product-widget cursor-pointer" v-bind="cardProps">
    <v-card-title v-if="title || !!$slots['title']" class="py-2">
      <slot name="title">
        {{ title }}
      </slot>
    </v-card-title>
    <v-sheet>
      <v-img
        :src="productImage"
        :alt="product.title"
        v-bind="imageProps"
        class="mx-auto"
        @click="imgClick"
      />
    </v-sheet>
    <slot />

    <v-card-actions v-if="!!$slots['actions']">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BasicProductWidget extends Vue {
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

  @Prop(Boolean) readonly link!: boolean;

  get productImage() {
    // handle image
    return "img/png/empty-cart.png";
  }

  imgClick() {
    if (this.link) {
      this.showProductDetails(this.product);
    }
  }

  private showProductDetails(product: IProduct) {
    if (product.id) {
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
          query: {
            productId: product.id.toString(),
          },
        });
    }
  }
}
</script>