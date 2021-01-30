<template>
  <product-basic
    :title="title"
    show-title
    show-price
    :product="product"
    :card-props="{ maxWidth: 250 }"
  >
    <template #header>
      <div class="pa-2">
        <v-btn
          class="float-right"
          color="red"
          width="25"
          height="25"
          depressed
          fab
          dark
          x-small
          @click="remove"
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
    "product-basic": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class EditProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly btnClose!: boolean;
  @Prop({ type: Object }) readonly product!: IProductCart;

  remove() {
    this.$emit("remove");
    // console.log("Close Button");
  }
}
</script>