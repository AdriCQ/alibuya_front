<template>
  <v-card
    class="mx-auto"
    :max-width="`${width + 6}rem`"
    :min-width="`${width}rem`"
  >
    <div style="position: absolute; right: 3px; top: 0px; z-index: 2">
      <v-btn color="error" x-large @click="deleteProduct" icon
        ><v-icon>mdi-delete-circle</v-icon></v-btn
      >
    </div>
    <div
      :style="`width:${width}rem; max-width: ${width + 2}rem; min-width: ${
        width - 2
      }rem`"
      class="mt-1"
    >
      <v-img width="100%" :src="product.img" />
    </div>
    <v-card-title>
      <span class="text-center" style="width: 100%">{{ product.title }}</span>
    </v-card-title>
    <v-card-text class="d-flex justify-center align-center">
      <input-cant :cant.sync="product.cant" :can-minus="product.cant > 1" />
      <span class="ml-2">
        Subtotal: ${{ Number(product.price * product.cant).toFixed(2) }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { IProductCart } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "input-cant": () => import("@/components/forms/shop/ProductCantInput.vue"),
  },
})
export default class ProductCart extends Vue {
  @Prop(Object) readonly product!: IProductCart;

  get width() {
    return 15;
  }

  deleteProduct() {
    this.$emit("delete");
  }
}
</script>