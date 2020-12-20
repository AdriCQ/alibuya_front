<template>
  <product-basic :title="title" show-title show-price :product="syncedProduct">
    <template #header>
      <div>
        <v-btn
          class="float-right"
          color="red"
          width="25"
          height="25"
          depressed
          fab
          dark
          x-small
          @click="close"
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </div>
    </template>

    <template #footer>
      <v-text-field
        type="number"
        min="1"
        v-model="syncedProduct.cart_cant"
        label="Cantidad"
        dense
        color="black"
        outlined
      />
    </template>
  </product-basic>
</template>

<script lang='ts'>
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import { IProductCart } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class EditProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly btnClose!: boolean;
  @PropSync("product", { type: Object })
  readonly syncedProduct!: IProductCart;

  @PropSync("counter", { type: String }) counterSync!: string;

  close() {
    this.$emit("close");
    // console.log("Close Button");
  }
}
</script>