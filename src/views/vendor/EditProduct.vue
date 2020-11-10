<template>
  <div id="edit-vendor-product-view" class="view-container">
    <v-section class="mt-2">
      <v-card>
        <v-card-title>Editar Producto</v-card-title>
        <v-card-text>
          <product-form
            :product="product"
            edit
            @submit="saveProduct"
            @reset="reset"
          />
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { VendorStore } from "@/store";
import { IProductCart } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "product-form": () => import("@/components/forms/vendor/ProductForm.vue"),
  },
})
export default class EditVendorProductView extends Vue {
  beforeMount() {
    if (this.$route.params.productKey)
      // TODO: Remove ts-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.product =
        VendorStore.myProducts[Number(this.$route.params.productKey)];
  }

  product: IProductCart = {
    cant: 0,
    title: "",
    price: 0,
    img: "",
    id: 0,
    weight: 0,
    description: [],
  };

  saveProduct(_product: IProductCart) {
    VendorStore.myProducts[Number(this.$route.params.productKey)] = _product;
    this.$router.push({
      name: "vendor.products",
    });
  }

  reset() {
    if (this.$route.name !== "vendor.products") {
      this.$router.push({
        name: "vendor.products",
      });
    }
  }
}
</script>