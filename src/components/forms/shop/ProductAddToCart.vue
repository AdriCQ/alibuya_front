<template>
  <v-card :outlined="mdAndUp" :max-width="450">
    <v-card-title class="py-2">Añadir al carrito</v-card-title>
    <v-card-text class="py-2 text-body-1 text-color-body">
      <!-- Available Colors -->
      <v-row v-if="product.options.colors">
        <v-col cols="12"> Colores </v-col>
        <v-col cols="12">
          <color-picker
            :color.sync="$v.form.color.$model"
            :colors="colors"
            :error-messages="colorErrorsMsg"
            :small="!mdAndUp"
          />
        </v-col>
      </v-row>
      <!-- / Available Colors -->

      <!-- Option Sizes -->
      <v-row v-if="product.options.sizes">
        <v-col cols="12"> Tallas </v-col>
        <v-col cols="12">
          <v-input :error-messages="sizeErrorsMsg">
            <v-chip-group
              v-model="$v.form.size.$model"
              active-class="primary--text"
            >
              <v-chip
                v-for="(size, key) in product.options.sizes"
                :key="`product-add-to-cart-option-size-${key}`"
                :value="size"
                color="light"
                filter
                filter-icon="mdi-check"
              >
                {{ size }}
              </v-chip>
            </v-chip-group>
          </v-input>
        </v-col>
      </v-row>
      <!-- / Option Sizes -->

      <!--  Delivery Method -->
      <!-- Not used for now -->
      <!--
      <v-row>
        <v-col cols="12">
          <v-select
            color="black"
            label="Método de Recogida"
            v-model="form.deliveryMethod"
            :items="deliveryMethods"
            dense
            outlined
            class="w-22 no-hint"
          />
        </v-col>
      </v-row>
      -->
      <!-- / Delivery Method -->

      <!--  Select Cant -->
      <v-row>
        <v-col cols="12" sm="5" md="12">
          <v-combobox
            label="Cantidad"
            color="black"
            v-model="$v.form.cant.$model"
            :items="cantToSelect"
            dense
            outlined
            @update:search-input="$v.form.cant.$model = $event"
            :error-messages="cantSelectErrorsMsg"
        /></v-col>
        <v-col cols="12" sm="7" md="12">
          <span class="ml-2 text-subtitle-1">
            Subtotal: {{ subtotal }}
          </span></v-col
        >
      </v-row>
      <!-- / Select Cant -->

      <!-- Check -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-checkbox
            v-model="$v.form.check.$model"
            :error-messages="checkErrorsMsg"
          >
            <template #label>
              <span class="text-color-body">
                Entiendo que este producto tiene un cargo en destino de 5,00 CUC
              </span>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="py-2">
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            color="primaryAlpha"
            class="btn-primary-alpha-gradient text-transform-none mb-2"
            @click="addToCart"
          >
            Añadir al Carrito
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";
import { mixins } from "vue-class-component";
import { IColor, IFormAddToCart, IProductCart } from "@/types";
import { required, between, numeric } from "vuelidate/lib/validators";
import { CartStore } from "@/store";

@Component({
  components: {
    "color-picker": () => import("@/components/forms/ColorPicker.vue"),
  },
  validations() {
    return {
      form: {
        color: { required },
        size: { required },

        cant: {
          required,
          numeric,
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          between: between(1, this.product.available_cant),
        },
        check: { isCheck: (value) => value == true },
      },
    };
  },
})
export default class ProductAddToCart extends mixins(GettersBreakpointsMixin) {
  @Prop({ type: Object }) readonly product!: IProductCart;

  /**
   * Form Data
   */
  form: IFormAddToCart = {
    color: {
      value: "",
      label: "",
    },
    size: "",
    // deliveryMethod: "",
    cant: 1,
    check: false,
  };

  /**
   * Test - product colors
   */
  get colors(): IColor[] {
    return [
      { value: "#ff0000", label: "Red" },
      { value: "#ff6600", label: "Orange" },
      { value: "#0066ff", label: "Blue" },
      { value: "#ffffff", label: "White" },
      { value: "#009900", label: "Green" },
    ];
  }

  get cantToSelect(): number[] {
    const items = [];
    for (
      let i = 1;
      i <= (this.product.available_cant ? this.product.available_cant : 10);
      i++
    )
      items.push(i);
    return items;
  }

  /**
   * Error Messages
   */
  get colorErrorsMsg() {
    const errorsMsg: string[] = [];
    if (!this.$v.form.color?.$dirty) return errorsMsg;
    if (!this.$v.form.color?.required) errorsMsg.push("Color es requerido.");
    return errorsMsg;
  }

  get sizeErrorsMsg() {
    const errorsMsg: string[] = [];
    if (!this.$v.form.size?.$dirty) return errorsMsg;
    if (!this.$v.form.size?.required) errorsMsg.push("Talla es requerido.");
    return errorsMsg;
  }

  get cantSelectErrorsMsg() {
    const errorsMsg: string[] = [];
    if (!this.$v.form.cant?.$dirty) return errorsMsg;
    if (!this.$v.form.cant?.required)
      errorsMsg.push("Seleccione una cantidad.");
    if (!this.$v.form.cant?.numeric)
      errorsMsg.push("La cantidad debe ser un número entero.");
    if (!this.$v.form.cant?.between)
      errorsMsg.push(
        `La cantidad debe estar entre ${this.$v.form.cant.$params.between.min} y 
        ${this.$v.form.cant.$params.between.max}.`
      );
    return errorsMsg;
  }

  get checkErrorsMsg() {
    const errorsMsg: string[] = [];
    if (!this.$v.form.check?.$dirty) return errorsMsg;
    if (!this.$v.form.check?.isCheck) errorsMsg.push("Requerido.");
    return errorsMsg;
  }

  /**
   * Get Subtotal Cost
   */
  get subtotal() {
    if (this.$v.form.cant?.$invalid) return "";
    return `$${Number(this.form.cant * this.product.price).toFixed(2)}`;
  }

  /**
   *  Get Product cart
   */
  get productCart(): IProductCart {
    return {
      id: this.product.id,
      title: this.product.title,
      brand: this.product.brand,
      tax: this.product.tax,
      description: this.product.description,
      price: this.product.price,
      images: this.product.images,
      image: this.product.image,
      weight: this.product.weight,
      options: this.product.options,
      tags: this.product.tags,
      rating: this.product.rating,
      suggested: this.product.suggested,
      available_cant: this.product.available_cant,
      type: this.product.type,
      cart_cant: this.form.cant,
      options_details: {
        color: this.form.color,
        size: this.form.size,
      },
    };
  }

  /**
   ** Restart form data
   */
  restartForm() {
    this.form = {
      color: {
        value: "",
        label: "",
      },
      size: "",
      // deliveryMethod: "",
      cant: 1,
      check: false,
    };
  }

  /**
   * Add IProductCart to Cart
   */
  addToCart() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      // Add productCart to store
      CartStore.addProduct(this.productCart);
      this.$router.push({ name: "shop.cart" });

      this.restartForm();
    }
  }
}
</script>