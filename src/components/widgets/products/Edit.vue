<template>
  <product-basic
    :title="title"
    show-title
    show-price
    :product="product"
    :card-props="{ maxWidth: 250 }"
  >
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
  </product-basic>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProductCart } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class EditProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly btnClose!: boolean;
  @Prop({ type: Object }) readonly product!: IProductCart;

  close() {
    this.$emit("close");
    // console.log("Close Button");
  }
}
</script>