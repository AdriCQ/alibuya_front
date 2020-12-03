<template>
  <product-basic :title="title" :product="product">
    <template #title>
      <slot name="title" />
    </template>

    <template v-if="!!$slots['title-right'] || btnClose" #title-right>
      <v-spacer />
      <slot name="title-right">
        <v-btn
          color="primary"
          width="25"
          height="25"
          depressed
          fab
          dark
          x-small
          class="position-relative"
          style="top: -6px"
          @click="close"
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </slot>
    </template>

    <template #actions>
      <slot name="actions">
        <v-form class="full-width">
          <v-row justify="center" no-gutters>
            <v-col cols="7">
              <v-text-field
                v-model="counterSync"
                label="Cantidad"
                type="number"
                min="0"
                max="100"
                background-color="primary lighten-5"
                outlined
                dense
                class="no-hint"
              />
            </v-col>
          </v-row>
        </v-form>
      </slot>
    </template>
  </product-basic>
</template>

<script lang='ts'>
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class EditProductWidget extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Boolean, default: false }) readonly btnClose!: boolean;
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

  @PropSync("counter", { type: String }) counterSync!: string;

  close() {
    this.$emit("close");
    // console.log("Close Button");
  }
}
</script>