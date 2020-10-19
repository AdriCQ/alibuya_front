<template>
  <v-container id="product-details-view">
    <section>
      <v-card>
        <v-row>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
            <v-img :src="product.img" class="mx-auto" max-width="20rem" />
            <v-row align-content="center" class="mt-4" no-gutters>
              <v-col v-for="i in 3" :key="i">
                <div class="box-selector py-2">
                  <v-img class="mx-auto" :src="product.img" max-width="5rem" />
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col xs="12" sm="12" md="8" lg="8" xl="8" cols="12">
            <v-card-title class="font-weight-bold"
              >${{ Number(product.price).toFixed(2) }}
            </v-card-title>
            <v-card-title>{{ product.title }} </v-card-title>
            <v-form>
              <v-card-text>
                <ul class="li-circle">
                  <li v-for="(p, i) in product.description" :key="i">
                    {{ p }}
                  </li>
                </ul>
              </v-card-text>
              <v-card-text>
                <v-select
                  class="w-20"
                  label="Recogida"
                  hint="Método de envío"
                ></v-select>
                <v-checkbox
                  label="Entiendo que este producto tiene un cargo en destino de 5,00 CUC"
                >
                </v-checkbox>
                <div class="d-flex d-flex-row align-center">
                  <span>
                    <cant-input :cant.sync="cant" />
                  </span>
                  <span class="ml-3"
                    >Subtotal: ${{
                      Number(product.price * cant).toFixed(2)
                    }}</span
                  >
                </div>

                <v-btn color="primary" class="mt-4"
                  ><v-icon class="mr-2">mdi-cart-plus</v-icon>Listo para
                  añadir</v-btn
                >
              </v-card-text>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </section>

    <section>
      <v-row class="py-0">
        <v-col>
          <v-card max-width="25rem">
            <v-card-title>Sugerencias</v-card-title>
            <products-slider :products="suggestProducts" />
          </v-card>
        </v-col>
        <v-col>
          <v-simple-table> </v-simple-table>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store/Shop";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "products-slider": () => import("@/components/sliders/ProductsSlider.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  cant = 0;
  get product() {
    return ShopStore.allProducts[0];
  }

  get suggestProducts() {
    return ShopStore.allProducts;
  }
}
</script>