<template>
  <v-card
    class="mx-auto"
    :max-width="`${width}px`"
    @click="showProductDetails(product)"
    min-height="280px"
  >
    <div class="badge-offer pa-2" v-if="badge">
      <span class="text-center white--text">{{ badgeText }}</span>
    </div>
    <template v-if="!(horizontal && $vuetify.breakpoint.smAndUp)">
      <div :style="`width:${width}px`" class="mt-1">
        <!-- <v-img width="100%" src="images/default.png" /> -->

        <v-img width="100%" :src="product.img" />
      </div>
      <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>
    </template>
    <!-- Horizontal -->
    <div class="d-flex pb-2" v-else>
      <div :style="`width:${width * 0.5}px`" class="mt-1">
        <!-- <v-img width="100%" src="images/default.png" /> -->
        <v-img width="100%" :src="product.img" />
      </div>
      <div class="d-block">
        <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
        <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>
      </div>
    </div>
    <!--/ Horizontal -->
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import { PopupStore } from "@/store/Poups";

@Component
export default class ProductWidget extends Vue {
  @Prop({
    type: Object,
    default: {
      title: "",
      price: "",
      img: "",
      description: "",
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly horizontal!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly badge!: boolean;

  @Prop({
    type: String,
    default: "",
  })
  readonly badgeText!: string;

  get width() {
    const rem = 18;
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.horizontal ? 20 * rem : 13 * rem;
      case "lg":
        return this.horizontal ? 20 * rem : 13 * rem;
      case "md":
        return this.horizontal ? 20 * rem : 15 * rem;
      case "sm":
        return this.horizontal ? 20 * rem : 16 * rem;
      case "xs":
        return this.horizontal ? 20 * rem : 20 * rem;
      default:
        return this.horizontal ? 20 * rem : 13 * rem;
    }
  }

  showProductDetails(product: IProduct) {
    PopupStore.productToShow = product;
    PopupStore.productPopup = true;
  }
}
</script>