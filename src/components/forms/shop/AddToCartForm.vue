<template>
  <div>
    <v-card flat>
      <v-row>
        <v-col cols="12" md="4" lg="4" xl="4">
          <product-gallery
            :imgs-src="[
              product.img,
              product.img,
              product.img,
              product.img,
              product.img,
              product.img,
            ]"
          />
        </v-col>
        <v-col cols="12" md="8" lg="8" xl="8">
          <v-card-title class="font-weight-bold">
            {{ product.title }}
          </v-card-title>
          <v-card-title>
            Disponible desde US${{ Number(product.price).toFixed(2) }}
          </v-card-title>

          <v-form>
            <!-- Product Options -->
            <v-card-text v-if="product.options">
              <!-- Option Colors -->
              <template v-if="product.options.colors">
                <v-select
                  label="Color"
                  outlined
                  class="w-20"
                  :items="product.options.colors"
                />
              </template>
              <!-- / Option Colors -->
            </v-card-text>
            <!-- / Product Options -->
            <v-card-title>Sobre éste artículo</v-card-title>
            <!-- Production Description -->
            <v-card-text v-html="product.description" />
            <!-- / Production Description -->
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
import { PropType } from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "product-gallery": () => import("@/components/sliders/ProductGallery.vue"),
    // "destinatary-input": () =>
    //   import("@/components/forms/shop/SelectDestinatary.vue"),
  },
})
export default class AddToCartForm extends Vue {
  @Prop({ type: Object as PropType<IProduct> }) readonly product!: IProduct;

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