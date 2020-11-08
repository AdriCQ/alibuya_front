<template>
  <div id="products-vendor-view" class="view-container">
    <!-- Confirm delete -->
    <v-dialog v-model="deleteDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Confirmación de eliminación
        </v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar éste paquete de su carrito? Tenga
          presente que ésta acción no se puede revertir.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="deleteProduct(deleteKey)">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Confirm delete -->

    <v-section class="mt-2">
      <v-card>
        <v-card-title>Mis Productos</v-card-title>
        <v-card-subtitle>
          <v-btn color="primary" @click="newProduct">Añadir Producto</v-btn>
        </v-card-subtitle>
        <!-- Mobile View -->
        <v-row justify="space-around" v-if="$vuetify.breakpoint.smAndDown">
          <v-col cols="auto" v-for="(product, pKey) in myProducts" :key="pKey">
            <product-widget
              :product="product"
              editable
              @delete="deletePopupConfirm(pKey)"
              @edit="editProduct(pKey)"
            />
          </v-col>
        </v-row>
        <!-- / Mobile View -->
        <!-- Desktop View -->
        <v-simple-table fixed-header v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="width: 5rem"></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, key) in myProducts" :key="key">
                <td class="pa-1">
                  <div style="width: 5rem">
                    <v-img :src="product.img" width="5rem" />
                  </div>
                </td>
                <td>
                  {{ product.title }}
                </td>
                <td>${{ Number(product.price).toFixed(2) }}</td>
                <td>10</td>
                <td>
                  <v-btn color="info" @click="editProduct(key)"> Editar</v-btn>
                </td>
                <td>
                  <v-btn icon color="error" @click="deletePopupConfirm(key)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!-- / Desktop View -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { IProductCart } from "@/types";
import { Vue, Component } from "vue-property-decorator";
import { VendorStore } from "@/store";

interface IDialogControl {
  show: boolean;
  edit: boolean;
  product: IProductCart;
}

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "product-edition-popup": () =>
      import("@/components/popups/ProductEditionPopup.vue"),
    "product-widget": () => import("@/components/widgets/Product.vue"),
  },
})
export default class ProductsVendorView extends Vue {
  deleteDialog = false;
  deleteKey = 0;

  get myProducts() {
    return VendorStore.myProducts;
  }

  newProduct() {
    this.$router.push({
      name: "vendor.product.add",
    });
  }

  editProduct(_productKey: number) {
    this.$router.push({
      name: "vendor.product.edit",
      params: {
        productKey: _productKey.toString(),
      },
    });
  }

  /**
   *
   */
  deletePopupConfirm(key: number) {
    this.deleteKey = key;
    this.deleteDialog = true;
  }

  /**
   *
   */
  deleteProduct(key: number) {
    VendorStore.deleteProduct(key);
    this.deleteDialog = false;
  }
}
</script>