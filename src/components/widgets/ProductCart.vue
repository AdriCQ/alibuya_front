<template>
  <v-card class="mx-auto" max-width="25rem" flat>
    <div style="position: absolute; right: 3px; top: 0px; z-index: 2">
      <v-btn color="error" @click="deleteProduct" icon
        ><v-icon>mdi-delete-circle</v-icon></v-btn
      >
    </div>
    <v-img :src="product.img" class="mx-auto" max-width="15rem" />
    <v-card-title
      ><span class="text-center" style="width: 100%">{{ product.title }}</span>
    </v-card-title>
    <v-card-text class="d-flex justify-center align-center">
      <input-cant :cant.sync="product.cant" />
      <span class="ml-2"
        >Subtotal: ${{ Number(product.price * product.cant).toFixed(2) }}</span
      >
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

  deleteProduct() {
    this.$emit("delete");
  }
}
</script>