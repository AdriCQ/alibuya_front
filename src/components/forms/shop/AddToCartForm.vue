<template>
  <div>
    <v-card>
      <v-row>
        <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
          <v-img :src="product.img" class="mx-auto" max-width="20rem" />
          <!-- <v-row align-content="center" class="mt-4" no-gutters>
            <v-col v-for="i in 3" :key="i">
              <div class="box-selector py-2">
                <v-img class="mx-auto" :src="product.img" max-width="5rem" />
              </div>
            </v-col>
          </v-row> -->
        </v-col>
        <v-col xs="12" sm="12" md="8" lg="8" xl="8" cols="12">
          <v-card-title class="font-weight-bold">
            ${{ Number(product.price).toFixed(2) }}
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
            <!-- Delivery method -->
            <v-card-text>
              <v-select
                class="w-20"
                label="Método de Recogida"
                :items="deliveryMethods"
              />
            </v-card-text>
            <!-- / Delivery method -->
            <!-- Cant Input -->
            <v-card-text>
              <div class="d-flex d-flex-row align-center">
                <span>
                  <cant-input :cant.sync="cant" :can-minus="canMinus" />
                </span>
                <span class="ml-3">
                  Subtotal: ${{ Number(product.price * cant).toFixed(2) }}
                </span>
              </div>
            </v-card-text>
            <!-- / Cant Input -->
            <!-- Destinataries Input -->
            <!-- <v-card-text>
              <destinatary-input
                class="w-20"
                :selected.sync="personsInfo"
                :cant="cant"
                :limit="productLimit"
              />
            </v-card-text> -->
            <!-- / Destinataries Input -->

            <v-card-text>
              <v-checkbox
                label="Entiendo que este producto tiene un cargo en destino de 5,00 CUC"
              />
              <v-btn color="primary" class="mt-4" @click="addToCart">
                <v-icon class="mr-2">mdi-cart-plus</v-icon>
                Listo para añadir
              </v-btn>
            </v-card-text>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { PopupStore, ShopStore, UserStore } from "@/store";
import { IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    // "destinatary-input": () =>
    //   import("@/components/forms/shop/SelectDestinatary.vue"),
  },
})
export default class AddToCartForm extends Vue {
  @Prop({ type: Object }) readonly product!: IProduct;

  // personsInfo: TPackDestinationPerson[] = [];

  cant = 1;
  // TODO: Work with limits
  // productLimit = 2;

  deliveryMethods = [
    "La Habana Transcargo",
    "Oficina de Correos de su Localidad",
    "La Habana – Aerovaradero",
    "Camagüey – Aerovaradero",
    "Holguín -Aerovaradero",
    "Varadero – Aerovaradero",
    "Santiago de Cuba – Aerovaradero",
  ];

  get canMinus() {
    return this.cant > 1 ? true : false;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  get isValid() {
    return true;
  }

  addToCart() {
    if (this.isValid) {
      ShopStore.addShoppingCartProduct(this.product as IProduct, this.cant);
      this.cant = 1;
      PopupStore.addNotification(
        [
          "Producto añadido al carrito correctamente",
          "Presione aquí para ver más detalles",
        ],
        "success",
        5000,
        {
          name: "shop.cart",
        }
      );
    }
  }
}
</script>