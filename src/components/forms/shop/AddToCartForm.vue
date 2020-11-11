<template>
  <div>
    <v-card flat>
      <v-row>
        <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
          <v-img :src="product.img" class="mx-auto" max-width="20rem" />
        </v-col>
        <v-col xs="12" sm="12" md="8" lg="8" xl="8" cols="12">
          <v-card-title class="font-weight-bold">
            {{ product.title }}
          </v-card-title>
          <v-card-title>
            Disponible desde US${{ Number(product.price).toFixed(2) }}
          </v-card-title>

          <v-form>
            <!-- Product Description -->
            <v-card-text>
              <v-text-field class="w-20" outlined label="Peso" color="primary">
                <template v-slot:append>
                  <label>Kg</label>
                </template>
              </v-text-field>
              <v-select
                label="Color"
                outlined
                class="w-20"
                :items="['Rojo', 'Azul', 'Negro']"
              />
            </v-card-text>
            <!-- / Product Description -->
            <v-card-title>Sobre éste artículo</v-card-title>
            <v-card-text>
              <b>Lorem ipsum dolor sit amet</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                reprehenderit hic earum in repellat tempore pariatur rerum ipsam
                suscipit sint maiores cum, itaque eaque quis dolorum eum vel
                explicabo fugiat.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolore, culpa, nostrum animi placeat ducimus a aut ipsam
                deserunt, minima praesentium ut quia dolorum natus omnis ex
                atque fugiat! Error, ratione.
              </p>
            </v-card-text>
            <!-- Delivery method -->
            <v-card-text>
              <v-select
                class="w-20"
                label="Método de Recogida"
                :items="deliveryMethods"
                outlined
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

            <v-card-text>
              <v-checkbox
                label="Entiendo que este producto tiene un cargo en destino de 5,00 CUC"
              />
              <v-btn color="primaryAlpha" class="mt-4" @click="addToCart">
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