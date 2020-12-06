<template>
  <v-form @submit.prevent="submit">
    <v-card flat>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-card-title>Información</v-card-title>
          <v-card-text>
            <!-- Department Selec -->
            <v-select
              :items="departments"
              label="Departamento"
              v-model="form.department"
              outlined
              dense
            />
            <!-- / Department Selec -->

            <!-- Name -->
            <v-text-field
              outlined
              dense
              label="Nombre del producto"
              v-model="form.title"
            />
            <!-- / Name -->

            <!-- Price -->
            <v-text-field
              outlined
              dense
              label="Precio"
              type="number"
              min="0"
              v-model="form.price"
            >
              <template v-slot:prepend-inner>
                <v-icon>mdi-currency-usd</v-icon>
              </template>
            </v-text-field>
            <!-- / Price -->
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-card-title>Disponibilidad</v-card-title>
          <v-card-text>
            <v-switch
              class="w-10 mt-0"
              label="Disponible"
              v-model="available"
            />

            <v-switch
              class="w-10 mt-0"
              label="Inventario Infinito"
              v-model="infinity"
              @change="toggleInfinity"
            />

            <v-text-field
              type="number"
              :disabled="infinity"
              :placeholder="inventaryPlaceholder"
              v-model="form.cant"
              outlined
              dense
              label="Inventario"
            />
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-card-title>Extra</v-card-title>
          <v-card-text>
            <!-- Weight -->
            <v-text-field
              outlined
              dense
              label="Peso (Kg)"
              type="number"
              min="0"
              v-model="form.weight"
            >
              <template v-slot:append>
                <v-icon>mdi-weight-kilogram</v-icon>
              </template>
            </v-text-field>
            <!-- / Weight -->

            <!-- Colors -->
            <v-select
              multiple
              dense
              outlined
              chips
              deletable-chips
              label="Colores"
              :items="['Rojo', 'Negro', 'Azul']"
              v-model="form.options.colors"
            />
            <!-- / Colors -->

            <!-- Tallas -->
            <template v-if="form.department === 'clothes'">
              <v-select
                multiple
                chips
                deletable-chips
                dense
                outlined
                label="Tallas"
                v-model="form.options.sizes"
              />
            </template>
            <!-- / Tallas -->
          </v-card-text>
        </v-col>
        <v-col cols="12">
          <v-card-text>
            <v-card-title>Descripción</v-card-title>
            <quill-editor
              class="editor"
              ref="myTextEditor"
              :options="editorOption"
              v-model="form.description"
            />
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn color="primaryAlpha" type="submit">Guardar</v-btn>
        <v-btn color="primaryBetha" class="ml-2">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ShopStore } from "@/store";
import { IProductForm, IVSelectItem } from "@/types";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

@Component({
  components: {
    "quill-editor": quillEditor,
  },
})
export default class NewProductForm extends Vue {
  
  infinity = false;
  available = true;

  get categories() {
    return ShopStore.categories;
  }

  editorOption = {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ script: "sub" }, { script: "super" }],
        // [{ indent: "-1" }, { indent: "+1" }],
        // [{ direction: "rtl" }],
        // [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        // [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        // ["link", "image", "video"],
      ],
    },
  };

  form: IProductForm = {
    type: "",
    id: 0,
    department: "automotriz",
    title: "",
    price: 0,
    upload_images: [],
    upload_image: "",
    brand: "",
    tax: 0,
    description: "",
    weight: 0,
    options: {
      colors: [],
      sizes: [],
    },
    tags: [],
    available_cant: 0,
  };

  departments: IVSelectItem[] = [];
  quillEditor = "";

  get inventaryPlaceholder() {
    return this.infinity ? "Infinito" : "";
  }

  toggleInfinity() {
    if (this.infinity) {
      this.form.available_cant = 999999;
    } else {
      this.form.available_cant = 0;
    }
  }

  submit() {
    this.$emit("submit", this.form);
  }
}
</script>