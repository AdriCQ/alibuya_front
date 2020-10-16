<template>
  <div id="shop-cart-view">
    <!-- <section class="mt-0">
      <banner-widget height="auto" img="images/banners/b2.jpeg">
        <div class="text-h4 text-center white--text pa-2">Mi Carrito</div>
      </banner-widget>
    </section> -->

    <section class="mt-0">
      <v-container>
        <v-card>
          <v-card-title
            ><v-icon class="mr-2">mdi-cart</v-icon> Carrito</v-card-title
          >
          <v-card-subtitle
            >Tienes {{ shopProducts.length }} productos
            pendientes</v-card-subtitle
          >
          <v-card-text>
            <template v-if="$vuetify.breakpoint.xs">
              <products-cart
                class="mt-4"
                :product="product"
                v-for="(product, key) in shopProducts"
                @delete="deleteProduct(key)"
                :key="key"
              />
            </template>
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
                      <cant-input :cant.sync="product.cant" />
                    </td>
                    <td>
                      ${{ Number(product.price * product.cant).toFixed(2) }}
                    </td>
                    <td>
                      <v-btn icon color="error" @click="deleteProduct(key)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-container>
    </section>

    <section class="mt-0">
      <v-container class="pt-0">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xl="6"
            v-if="shopProducts.length"
          >
            <v-card>
              <v-card-title>Pago</v-card-title>
              <v-card-text
                >Total: ${{ Number(totalPrice + 5).toFixed(2) }}</v-card-text
              >
              <v-card-actions class="d-block text-center">
                <v-btn style="width: 80%" color="primary">
                  Proceder a Pagar
                </v-btn>
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
      </v-container>
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { IProductCart } from "@/types";
import { ProductStore } from "@/store/Products";

@Component({
  components: {
    // "banner-widget": () => import("@/components/widgets/Banner.vue"),
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "products-cart": () => import("@/components/widgets/ProductCart.vue"),
    "products-slider": () => import("@/components/sliders/ProductsSlider.vue"),
  },
})
export default class ShoppingCartView extends Vue {
  mounted() {
    ProductStore.products.forEach((p) => {
      this.shopProducts.push({
        cant: 1,
        title: p.title,
        price: p.price,
        img: p.img,
        description: p.description,
      });
    });
  }

  shopProducts: IProductCart[] = [];

  get suggestedProducts() {
    return ProductStore.products;
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

  deleteProduct(key: number) {
    this.shopProducts.splice(key, 1);
  }
}
</script>