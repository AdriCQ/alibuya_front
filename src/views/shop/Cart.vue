<template>
  <div id="shop-cart-view" class="mt-2">
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

    <v-section>
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-cart</v-icon>
          Mis Pedidos
        </v-card-title>
        <v-card-subtitle
          >Tienes {{ shopProducts.length }} productos
          pendientes</v-card-subtitle
        >
        <v-card-text>
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
                  <td>
                    ${{ Number(product.price * product.cant).toFixed(2) }}
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
        </v-card-text>
      </v-card>
    </v-section>

    <v-section class="mt-0">
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="4" xl="4" v-if="shopProducts.length">
          <v-card>
            <v-card-title>Pago</v-card-title>
            <v-card-text
              >Total: ${{ Number(totalPrice + 5).toFixed(2) }}</v-card-text
            >
            <v-card-actions class="d-block text-center">
              <v-btn color="primary"> Proceder a Pagar </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Sugerencias</v-card-title>
            <products-slider :products="suggestedProducts" />
          </v-card>
        </v-col>
      </v-row>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store";

@Component({
  components: {
    // "banner-widget": () => import("@/components/widgets/Banner.vue"),
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "products-cart": () => import("@/components/widgets/ProductCart.vue"),
    "products-slider": () =>
      import("@/components/sliders/ProductSliderMultiple.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  deleteKey: number | null = null;
  deleteDialog = false;

  get shopProducts() {
    return ShopStore.shoppingCartProducts;
  }

  get suggestedProducts() {
    return ShopStore.allProducts;
  }

  /**
   *
   */
  get totalPrice() {
    let cant = 0;
    this.shopProducts.forEach((product) => {
      cant += product.cant * product.price;
    });
    return cant;
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

  deletePopupConfirm(key: number) {
    this.deleteKey = key;
    this.deleteDialog = true;
  }
  deleteProduct(key: number) {
    ShopStore.removeShoppingCartProduct(key);
    this.deleteDialog = false;
  }
}
</script>