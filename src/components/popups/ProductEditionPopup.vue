<template>
  <v-dialog
    :value="show"
    scrollable
    max-width="50rem"
    transition="dialog-bottom-transition"
  >
    <product-form
      :product.sync="product"
      :edit="edit"
      @submit="evtSubmit"
      @reset="evtReset"
    />
  </v-dialog>
</template>

<script lang='ts'>
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "product-form": () => import("@/components/forms/vendor/ProductForm.vue"),
  },
})
export default class ProductEditionPopup extends Vue {
  @Prop(Boolean) readonly show!: boolean;
  @Prop(Boolean) readonly edit?: boolean;
  @Prop(Object) readonly product!: IProduct;

  evtSubmit(_submit: unknown) {
    console.log(_submit);
  }

  evtReset() {
    this.$emit("update:show", false);
  }
}
</script>