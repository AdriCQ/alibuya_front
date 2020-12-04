<template>
  <v-card class="basic-product-widget" :class="[cardClass]" v-bind="cardProps">
    <v-card-title v-if="title || !!$slots['title']" class="pa-2">
      <slot name="title">
        <span>
          {{ title }}
        </span>
      </slot>

      <slot name="title-right" />
    </v-card-title>

    <v-img
      :src="productImage"
      :alt="product.title"
      max-width="100%"
      v-bind="imageProps"
      class="mx-auto"
      @click="imgClick"
    />

    <slot />

    <v-card-actions v-if="!!$slots['actions']">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component
export default class BasicProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;
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

  // props to children
  @Prop({
    type: Object,
  })
  readonly imageProps!: object;

  @Prop({
    type: Object,
    default: () => {
      return { maxWidth: "200" };
    },
  })
  readonly cardProps!: object;

  get cardClass() {
    const res = [];
    if (this.cardProps && this.cardProps.class) res.push(this.cardProps.class);
    if (this.link) res.push("cursor-pointer");

    return res;
  }

  get productImage() {
    // handle image
    return "img/png/empty-cart.png";
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

  /**
   *
   */
  imgClick() {
    if (this.link) {
      this.showProductDetails(this.product);
    }
  }
}
</script>