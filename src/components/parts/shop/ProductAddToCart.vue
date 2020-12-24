<template>
  <v-card
    class="position-sticky"
    :style="cardContainerStyles"
    :outlined="mdAndUp"
    :max-width="450"
  >
    <v-card-title class="py-2">Añadir al carrito</v-card-title>
    <v-card-text class="py-2 text-body-1 text-color-body">
      <!-- Available Colors -->
      <v-row v-if="product.options.colors">
        <v-col cols="12"> Colores </v-col>
        <v-col cols="12">
          <color-picker :color.sync="form.color" :colors="colors" small />
        </v-col>
      </v-row>
      <!-- / Available Colors -->

      <!-- Option Sizes -->
      <v-row v-if="product.options.sizes">
        <v-col cols="12"> Tallas </v-col>
        <v-col cols="12">
          <v-chip-group
            v-model="form.size"
            active-class="primary--text"
            mandatory
          >
            <v-chip
              v-for="(size, key) in product.options.sizes"
              :key="`option-size-${key}`"
              :value="size"
              color="light"
              filter
              filter-icon="mdi-check"
            >
              {{ size }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <!-- / Option Sizes -->

      <!--  Delivery Method -->
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
      <!-- / Delivery Method -->

      <!--  Select Cant -->
      <v-row align="center">
        <v-col cols="4" md="12" lg="4">
          <v-combobox
            label="Cantidad"
            color="black"
            v-model="form.cant"
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            dense
            outlined
            class="w-22 no-hint"
        /></v-col>
        <v-col cols="8" md="12" lg="8">
          <span class="ml-2 text-subtitle-1">
            Subtotal: ${{ Number(product.price * form.cant).toFixed(2) }}
          </span></v-col
        ></v-row
      >
      <!-- / Select Cant -->

      <!-- Check -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-checkbox v-model="form.check">
            <template #label>
              <span class="text-color-body">
                Entiendo que este producto tiene un cargo en destino de 5,00 CUC
              </span>
            </template>
          </v-checkbox>
        </v-col></v-row
      >
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
import { IColor, IProductCart } from "@/types";

@Component({
  components: {
    "color-picker": () => import("@/components/forms/ColorPicker.vue"),
  },
})
export default class ProductAddToCart extends mixins(GettersBreakpointsMixin) {
  beforeMount() {
    this.form.color = this.colors[0].value;
  }

  @Prop({ type: Object }) readonly product!: IProductCart;

  /**
   * Styles
   */
  get cardContainerStyles() {
    return { top: this.lgAndUp ? "119px" : "0" };
  }

  /**
   *
   */
  form = {
    color: "",
    size: "",
    deliveryMethod: "",
    cant: 1,
    check: false,
  };

  deliveryMethods = [
    "La Habana Transcargo",
    "Oficina de Correos de su Localidad",
    "La Habana – Aerovaradero",
    "Camagüey – Aerovaradero",
    "Holguín -Aerovaradero",
    "Varadero – Aerovaradero",
    "Santiago de Cuba – Aerovaradero",
  ];

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

  addToCart() {
    // TODO: Validate
    this.$emit("add-to-cart", this.form);
  }
}
</script>