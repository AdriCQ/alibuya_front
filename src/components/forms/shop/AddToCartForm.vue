<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col v-if="!mdAndUp" cols="12">
        <product-heading
          :title="product.title"
          :price="Number(product.price)"
        />
      </v-col>

      <v-col cols="12" md="5" lg="5" xl="6" class="mb-6 mb-md-0">
        <product-gallery :imgs-src="imagesSrc" />
      </v-col>

      <v-col cols="12" md>
        <product-heading
          v-if="mdAndUp"
          :title="product.title"
          :price="Number(product.price)"
          :brand="product.brand"
        />

        <v-form>
          <!-- Production Description -->
          <div v-if="product.description" class="px-4">
            <v-col cols="12">
              <div v-html="product.description" class="text-justify" />
            </v-col>
          </div>
          <!-- / Production Description -->

          <v-card-text class="py-2">
            <!-- Option Colors -->
            <div v-if="product.options.colors">
              <v-row>
                <v-col cols="12" sm="auto">
                  <span class="title">Color</span>
                </v-col>
                <v-col cols="12" sm>
                  <color-picker :color.sync="form.color" :colors="colors"
                /></v-col>
              </v-row>
            </div>
            <!-- / Option Colors -->

            <!-- Option Sizes -->
            <div v-if="product.options.sizes">
              <v-row>
                <v-col cols="12" sm="auto">
                  <span class="title">Tamaño</span>
                </v-col>
                <v-col cols="12" sm>
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
            </div>
            <!-- / Option Sizes -->

            <v-col cols="12">
              <!-- Delivery method -->
              <v-select
                color="black"
                label="Método de Recogida"
                v-model="form.deliveryMethod"
                :items="deliveryMethods"
                dense
                outlined
                class="w-22"
              />
              <!-- / Delivery method -->

              <!-- Cant -->
              <v-select
                label="Cantidad"
                outlined
                color="black"
                dense
                v-model="form.cant"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                class="w-22"
              />
              <span class="ml-3 mt-2 text-subtitle-1">
                Subtotal: ${{ Number(product.price * form.cant).toFixed(2) }}
              </span>
              <!-- / Cant -->

              <div class="d-flex align-center">
                <v-checkbox v-model="form.check" />
                <span>
                  Entiendo que este producto tiene un cargo en destino de 5,00
                  CUC
                </span>
              </div>
            </v-col>
          </v-card-text>

          <v-card-actions>
            <v-row justify="center" :no-gutters="!smAndUp">
              <v-col cols="12" sm="auto">
                <v-btn
                  block
                  class="btn-primary-betha-gradient mb-2"
                  @click="addToPack"
                >
                  Añadir al Carrito 2
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { PackStore, UserStore } from "@/store";
import { IColor, IProductCart, IProduct } from "@/types";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";

@Component({
  components: {
    "product-heading": () =>
      import("@/components/parts/shop/ProductHeading.vue"),
    "product-gallery": () => import("@/components/sliders/ProductGallery.vue"),
    "color-picker": () => import("@/components/forms/ColorPicker.vue"),
  },
})
export default class AddToCartForm extends mixins(GettersBreakpointsMixin) {
  beforeMount() {
    this.form.color = this.colors[0].value;
  }

  @Prop({ type: Object }) readonly product!: IProduct;

  // personsInfo: TPackDestinationPerson[] = [];

  form = {
    color: "",
    size: 0,
    // deliveryMethod: "",
    cant: 1,
    check: false,
  };

  // TODO: Work with limits
  // productLimit = 2;

  /**
   *  get Product cart
   */
  get productCart(): IProductCart {
    return {
      id: this.product.id,
      cart_cant: this.form.cant,
      title: this.product.title,
      price: this.product.price,
      options_details: {
        color: this.form.color,
        size: this.form.size,
      },
    };
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  // test - array of images
  get imagesSrc() {
    const images: string[] = [];

    /*
    if (this.product.images?.length) {
      this.product.images.forEach((image) => {
        images.push(new ProductImage(image).sm);
      });
    } else {
      images.push(new ProductImage(this.product.image).sm);
    }
    */

    // test images
    images.push("img/test/offers/1.png");
    images.push("img/test/offers/2.png");
    images.push("img/test/offers/3.png");
    images.push("img/test/offers/4.jpg");
    images.push("img/test/offers/5.png");
    images.push("img/test/offers/1.png");
    images.push("img/test/offers/5.png");
    images.push("img/test/offers/1.png");
    return images;
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

  addToPack() {
    // TODO: Validate
    console.log("Add to pack", this.productCart);
    PackStore.addProduct(this.productCart);
    // Restart form data
    this.form = {
      color: "",
      size: 0,
      // deliveryMethod: "",
      cant: 1,
      check: false,
    };
  }
}
</script>