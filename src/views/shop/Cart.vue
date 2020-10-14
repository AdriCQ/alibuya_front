<template>
  <div id="shop-cart-view">
    <section class="mt-0">
      <banner-widget height="auto">
        <div class="text-h4 text-center white--text">Mis Pedidos</div>
      </banner-widget>
    </section>

    <section class="mt-0">
      <v-container>
        <v-card>
          <v-card-title
            >Tienes {{ shopProducts.length }} productos pendientes</v-card-title
          >
          <v-card-subtitle
            >Listado de productos listos para comprar</v-card-subtitle
          >
          <v-card-text>
            <v-simple-table fixed-header height="500px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th style="width: 5rem"></th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
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
                      <!-- Less More buttons -->
                      <v-icon
                        class="cursor-pointer"
                        small
                        @click="increase(key)"
                        >mdi-arrow-up-drop-circle-outline</v-icon
                      ><br />
                      <div class="mx-2">{{ product.cant }}</div>
                      <v-icon
                        v-if="product.cant > 1"
                        class="cursor-pointer"
                        small
                        @click="decrease(key)"
                        >mdi-arrow-down-drop-circle-outline</v-icon
                      >
                      <v-icon v-else class="cursor-pointer" small
                        >mdi-close</v-icon
                      >
                      <!-- / Less More buttons -->
                    </td>
                    <td>
                      ${{ Number(product.price * product.cant).toFixed(2) }}
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
          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
            <v-card>
              <v-card-title>Pago</v-card-title>
              <v-card-text
                >Subtotal: ${{ Number(totalPrice).toFixed(2) }}</v-card-text
              >
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
              <products-slider :products="shopProducts" />
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
    "banner-widget": () => import("@/components/widgets/Banner.vue"),
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
}
</script>