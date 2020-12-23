<template>
  <v-card
    class="mx-auto"
    @click="showProductDetails(product)"
    :min-height="minHeight"
  >
    <div class="badge-offer pa-2" v-if="badge">
      <span class="text-center white--text">{{ badge }}</span>
    </div>
    <div><v-img :src="image.xs" :alt="product.title" /></div>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import { ShopStore } from "@/store";
import { ProductImage } from "@/utils";

@Component
export default class HorizontalProductWidget extends Vue {
  @Prop({
    type: Object,
    default: {
      title: "",
      price: "",
      images: "",
      description: "",
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: String,
    default: "",
  })
  readonly badge!: string;

  get image() {
    return new ProductImage(this.product.image);
  }

  async showProductDetails(product: IProduct) {
    if (product.id) {
      await ShopStore.getProductById(product.id);
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
        });
    }
  }
}
</script>