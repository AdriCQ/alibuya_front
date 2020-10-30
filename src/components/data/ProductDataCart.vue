<template>
  <div>
    <!-- Confirm delete -->
    <v-dialog v-model="deleteDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Confirmación de eliminación
        </v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar éste producto de su carrito? Tenga
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

    <v-container>
      <template v-if="shopProducts.length">
        <!-- Small View Grid Mode -->
        <template v-if="$vuetify.breakpoint.xs">
          <products-cart
            class="mt-4"
            :product="product"
            v-for="(product, key) in shopProducts"
            @delete="deletePopupConfirm(key)"
            :key="key"
          />
        </template>
        <!-- / Small View Grid Mode -->

        <v-simple-table fixed-header v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="width: 5rem"></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, key) in shopProducts" :key="key">
                <td class="pa-1">
                  <div style="width: 5rem">
                    <v-img :src="product.img" width="5rem" />
                  </div>
                </td>
                <td>
                  {{ product.title }}
                </td>
                <td>${{ Number(product.price).toFixed(2) }}</td>
                <td class="text-center">
                  <cant-input
                    :cant.sync="product.cant"
                    :can-minus="product.cant > 1"
                  />
                </td>
                <td>${{ Number(product.price * product.cant).toFixed(2) }}</td>
                <td>
                  <v-btn icon color="error" @click="deletePopupConfirm(key)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>

      <div class="mt-1" v-if="shopProducts.lenght">
        <!-- Small View Grid Mode -->
        <template v-if="$vuetify.breakpoint.xs">
          <products-cart
            class="mt-4"
            :product="product"
            v-for="(product, key) in shopProducts"
            @delete="deletePopupConfirm(key)"
            :key="key"
          />
        </template>
        <!-- / Small View Grid Mode -->

        <v-simple-table fixed-header v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="width: 5rem"></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, key) in shopProducts" :key="key">
                <td class="pa-1">
                  <v-sheet width="5rem" height="5rem">
                    <v-img :src="product.img" width="5rem" />
                  </v-sheet>
                </td>
                <td>
                  {{ product.title }}
                </td>
                <td>${{ Number(product.price).toFixed(2) }}</td>
                <td class="text-center">
                  <cant-input
                    :cant.sync="product.cant"
                    :can-minus="product.cant > 1"
                  />
                </td>
                <td>${{ Number(product.price * product.cant).toFixed(2) }}</td>
                <td>
                  <v-btn icon color="error" @click="deletePopupConfirm(key)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { ShopStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "products-cart": () => import("@/components/widgets/ProductCart.vue"),
  },
})
export default class ProductDataCart extends Vue {
  deleteKey: number | null = null;
  deleteDialog = false;

  get shopProducts() {
    return ShopStore.shoppingCartProducts;
  }

  /**
   *
   */
  increase(key: number) {
    this.shopProducts[key].cant++;
  }
  /**
   *
   */
  decrease(key: number) {
    if (this.shopProducts[key].cant > 0) this.shopProducts[key].cant--;
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
    ShopStore.removeShoppingCartProduct(key);
    this.deleteDialog = false;
  }
}
</script>