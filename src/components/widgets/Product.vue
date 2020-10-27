<template>
  <v-card
    class="mx-auto"
    :max-width="`${width}px`"
    @click="showProductDetails(product)"
    :min-height="minHeight"
  >
    <div class="badge-offer pa-2" v-if="badge">
      <span class="text-center white--text">{{ badge }}</span>
    </div>
    <template v-if="!(horizontal && $vuetify.breakpoint.smAndUp)">
      <v-sheet :width="`${width}px`" :height="`${width * 0.75}px`">
        <div :style="`width:${width}px`" class="mt-1">
          <v-img width="100%" :src="product.img" />
        </div>
      </v-sheet>
      <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>
    </template>
    <!-- Horizontal -->
    <div class="d-flex pb-2" v-else>
      <v-sheet :width="`${width}px`" :height="`${width * 0.75}px`">
        <div :style="`width:${width * 0.5}px`" class="mt-1">
          <v-img width="100%" :src="product.img" />
        </div>
      </v-sheet>
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
import { PopupStore } from "@/store";

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
    type: String,
    default: "",
  })
  readonly badge!: string;

  get width() {
    const rem = 18;
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return this.horizontal ? 20 * rem : 12 * rem;
      case "lg":
        return this.horizontal ? 20 * rem : 12 * rem;
      case "md":
        return this.horizontal ? 20 * rem : 12 * rem;
      case "sm":
        return this.horizontal ? 18 * rem : 12 * rem;
      case "xs":
        return 12 * rem;
      default:
        return this.horizontal ? 20 * rem : 12 * rem;
    }
  }

  get minHeight() {
    return this.horizontal ? "auto" : "280px";
  }

  showProductDetails(product: IProduct) {
    PopupStore.showProduct(product);
  }
}
</script>