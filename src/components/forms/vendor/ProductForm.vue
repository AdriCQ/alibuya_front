<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-card-text>
        <v-row justify="space-around">
          <!-- Product Name -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.title"
              value="_product_title"
              label="Nombre"
              placeholder="Nombre del producto"
            />
          </v-col>
          <!-- / Product Name -->
          <!-- Product Images -->
          <!-- <v-col cols="12" sm="6">
            <v-file-input
              v-model="product.img"
              label="Imágenes"
              chips
              deletable-chips
              multiple
            />
          </v-col> -->
          <!-- / Product Images -->

          <!-- Product price -->
          <v-col xs="6">
            <v-text-field
              v-model="form.price"
              label="Precio"
              type="number"
              min="1"
            />
          </v-col>
          <!-- / Product price -->

          <!-- Product weight -->
          <v-col xs="6">
            <v-text-field
              v-model="form.weight"
              label="Peso"
              type="number"
              min="1"
            />
          </v-col>
          <!-- / Product weight -->

          <!-- Product Description -->
          <v-col cols="12">
            <v-textarea v-model="form.description" label="Descripción" />
          </v-col>
          <!-- / Product Description -->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit">Guardar</v-btn>
        <v-btn color="primary" class="ml-2" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { IProduct, IProductForm } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductForm extends Vue {
  // TODO: Fix automount product
  @Prop(Boolean) readonly edit?: boolean;
  @Prop(Object) readonly product?: IProduct;

  form: IProductForm = {
    id: 0,
    type: "",
    department: "",
    title: "",
    price: 0,
    brand: "",
    tax: 0,
    description: "",
    available_cant: 0,
    weight: 0,
    options: {},
  };

  submit() {
    this.$emit("submit", this.form);
  }

  reset() {
    this.$emit("reset");
  }
}
</script>