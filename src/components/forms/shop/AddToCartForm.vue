<template>
  <div>
    <v-card flat>
      <v-row>
        <v-col cols="12" md="4" lg="4" xl="4">
          <product-gallery :imgs-src="testImages" />
        </v-col>
        <v-col cols="12" md="8" lg="8" xl="8">
          <v-row no-gutters justify-md="space-between">
            <v-col cols="12" md="auto">
              <v-card-title class="font-weight-bold">
                {{ product.title }}
              </v-card-title>
            </v-col>

            <v-col cols="12" md="auto">
              <v-card-title class="text-subtitle-1">
                Disponible desde US${{ Number(product.price).toFixed(2) }}
              </v-card-title>
            </v-col>
          </v-row>

          <v-form>
            <v-card-title class="text-subtitle-1" v-if="product.options">
              <v-row align="center">
                <!-- Option Colors -->
                <template v-if="product.options.colors">
                  <v-col cols="auto" lg="12">Colores Disponibles: </v-col>
                  <v-col cols="auto" lg="12">
                    <v-swatches
                      v-model="selectColor"
                      :swatches="colors"
                      shapes="circles"
                      swatch-size="38"
                      show-labels
                      show-border
                      inline
                    />
                  </v-col>
                </template>
                <!-- / Option Colors -->
              </v-row>
            </v-card-title>

            <v-card-title class="text-subtitle-1"
              >Sobre éste artículo</v-card-title
            >

            <!-- Production Description -->
            <v-card-text v-html="product.description" />
            <!-- / Production Description -->

            <!-- Delivery method -->
            <v-card-text>
              <v-select
                class="w-22"
                label="Método de Recogida"
                :items="deliveryMethods"
                dense
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
              <div class="d-flex align-center">
                <v-checkbox />
                <span>
                  Entiendo que este producto tiene un cargo en destino de 5,00
                  CUC
                </span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primaryAlpha" class="mt-4" @click="addToCart">
                <v-icon class="mr-2">mdi-cart-plus</v-icon>
                Añadir al carrito
              </v-btn>
              <v-btn color="primaryBetha" class="mt-4" @click="addToCart">
                <v-icon class="mr-2">mdi-cart</v-icon>
                Compra Rápida
              </v-btn>
            </v-card-actions>
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
import VSwatches from "vue-swatches";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "product-gallery": () => import("@/components/sliders/ProductGallery.vue"),
    VSwatches,
    // "destinatary-input": () =>
    //   import("@/components/forms/shop/SelectDestinatary.vue"),
  },
})
export default class AddToCartForm extends Vue {
  @Prop({ type: Object }) readonly product!: IProduct;

  // personsInfo: TPackDestinationPerson[] = [];
  selectColor = "";
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

  created() {
    this.selectColor = this.colors[0].color;
  }

  get canMinus() {
    return this.cant > 1 ? true : false;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  get isValid() {
    return true;
  }

  // test - array of images
  get testImages() {
    const src = "img/logos/logo_300x225.png";
    return [src, src, src, src, src];
  }

  // test - product colors
  get colors() {
    return [
      { color: "#ff0000", label: "Red" },
      { color: "#ff6600", label: "Orange" },
      { color: "#0066ff", label: "Blue" },
      { color: "#ffffff", label: "White" },
      { color: "#009900", label: "Green" },
    ];
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