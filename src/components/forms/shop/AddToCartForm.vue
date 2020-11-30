<template>
  <div>
    <v-card flat>
      <v-row no-gutters>
        <v-col v-if="!mdAndUp" cols="12">
          <product-heading
            :title="product.title"
            :price="Number(product.price)"
            :brand="product.brand"
          />
        </v-col>

        <v-col cols="12" md="5" lg="5" xl="5" class="mb-6 mb-md-0">
          <product-gallery :imgs-src="testImages" />
        </v-col>

        <v-col cols="12" md>
          <product-heading
            v-if="mdAndUp"
            :title="product.title"
            :price="Number(product.price)"
            :brand="product.brand"
          />

          <v-form>
            <v-card-text v-if="product.options" class="py-0">
              <!-- Production Description -->
              <v-row v-if="product.description">
                <v-col cols="12">
                  <div v-html="product.description" class="text-justify" />
                </v-col>
              </v-row>
              <!-- / Production Description -->

              <!-- Option Colors -->
              <v-row v-if="product.options.colors" align="center" class="mb-4">
                <v-col cols="12" md="auto">
                  <span class="title">Color</span>
                </v-col>
                <v-col cols="12" md="auto">
                  <color-picker :color.sync="form.color" :colors="colors" />
                </v-col>
              </v-row>
              <!-- / Option Colors -->

              <!-- Option Sizes -->
              <v-row v-if="product.options.sizes" align="center">
                <v-col cols="12" md="auto">
                  <span class="title">Tamaño</span>
                </v-col>
                <v-col cols="12" md="auto">
                  <v-chip-group v-model="form.size" mandatory>
                    <v-chip
                      v-for="size in product.options.sizes"
                      :key="size"
                      :value="size"
                      color="light"
                      filter
                      class="my-0"
                      style="font-size: 1rem"
                    >
                      {{ size }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
              <!-- / Option Sizes -->

              <v-row>
                <!-- Delivery method -->
                <v-col cols="12">
                  <v-select
                    class="w-22"
                    label="Método de Recogida"
                    v-model="form.deliveryMethod"
                    :items="deliveryMethods"
                    dense
                    outlined
                  />
                </v-col>
                <!-- / Delivery method -->

                <!-- Cant -->
                <v-col cols="12">
                  <div class="d-flex">
                    <v-select
                      label="Cantidad"
                      class="w-10"
                      outlined
                      color="black"
                      dense
                      v-model="product.cant"
                      :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    />
                    <span class="ml-3 mt-2 text-subtitle-1">
                      Subtotal: ${{
                        Number(product.price * form.cant).toFixed(2)
                      }}
                    </span>
                  </div>
                </v-col>
                <!-- / Cant -->

                <v-col cols="12">
                  <div class="d-flex align-center">
                    <v-checkbox v-model="form.check" />
                    <span>
                      Entiendo que este producto tiene un cargo en destino de
                      5,00 CUC
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-row justify="center" :no-gutters="!smAndUp">
                <v-col cols="12" sm="auto">
                  <v-btn
                    block
                    class="btn-primary-betha-gradient mb-2"
                    @click="addToPack"
                  >
                    Empaquetar
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="auto">
                  <v-btn
                    block
                    class="btn-primary-alpha-gradient mb-2"
                    @click="addToPack"
                  >
                    Compra Rápida
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { PackStore, PopupStore, ShopStore, UserStore } from "@/store";
import { IColor, IProduct } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "product-heading": () =>
      import("@/components/parts/shop/ProductHeading.vue"),
    "product-gallery": () => import("@/components/sliders/ProductGallery.vue"),
    "color-picker": () => import("@/components/forms/ColorPicker.vue"),
    // "destinatary-input": () =>
    //   import("@/components/forms/shop/SelectDestinatary.vue"),
  },
})
export default class AddToCartForm extends Vue {
  created() {
    this.form.color = this.colors[0].value;
  }

  @Prop({ type: Object }) readonly product!: IProduct;

  // personsInfo: TPackDestinationPerson[] = [];

  form = {
    color: "",
    size: 0,
    deliveryMethod: "",
    cant: 1,
    check: false,
  };

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
    return this.form.cant > 1 ? true : false;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  get isValid() {
    return true;
  }

  // test - array of images
  get testImages() {
    return [
      "img/test/comidas/1.jpg",
      "img/test/comidas/2.jpg",
      "img/test/comidas/1.jpg",
      "img/test/comidas/2.jpg",
    ];
  }

  // test - product colors
  get colors(): IColor[] {
    return [
      { value: "#ff0000", label: "Red" },
      { value: "#ff6600", label: "Orange" },
      { value: "#0066ff", label: "Blue" },
      { value: "#ffffff", label: "White" },
      { value: "#009900", label: "Green" },
    ];
  }

  // breakpoints
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }

  get smAndUp() {
    return this.$vuetify.breakpoint.smAndUp;
  }

  get mdAndUp() {
    return this.$vuetify.breakpoint.mdAndUp;
  }

  addToCart() {
    if (this.isValid) {
      ShopStore.addShoppingCartProduct(
        this.product as IProduct,
        this.form.cant
      );
      this.form.cant = 1;
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

  addToPack() {
    // TODO: Validate
    this.product.cant = this.form.cant;
    PackStore.addProduct(this.product);
    this.form.cant = 1;
  }
}
</script>