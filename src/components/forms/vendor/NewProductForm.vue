<template>
  <v-form>
    <v-card flat>
      <v-row>
        <v-col>
          <v-card-title>Información del Producto</v-card-title>
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
            <v-text-field outlined dense label="Nombre del producto" />
            <!-- / Name -->

            <!-- Price -->
            <v-text-field outlined dense label="Precio" type="number" min="0">
              <template v-slot:prepend-inner>
                <v-icon>mdi-currency-usd</v-icon>
              </template>
            </v-text-field>
            <!-- / Price -->
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-title>Disponibilidad</v-card-title>
          <v-card-text>
            <v-text-field
              type="number"
              :disabled="infinity"
              :placeholder="inventaryPlaceholder"
              outlined
              dense
              label="Inventario"
            />
            <v-switch
              class="w-10 mt-0"
              label="Inventario Infinito"
              v-model="infinity"
            />

            <!-- Size -->
            <v-text-field
              outlined
              dense
              label="Peso (Kg)"
              type="number"
              min="0"
            >
              <template v-slot:append>
                <v-icon>mdi-weight-kilogram</v-icon>
              </template>
            </v-text-field>
            <!-- / Size -->
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-title>Extra</v-card-title>
          <v-card-text>
            <!-- Colors -->
            <v-select
              multiple
              dense
              outlined
              chips
              deletable-chips
              label="Colores"
              :items="['Rojo', 'Negro', 'Azul']"
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
            />
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn color="primaryAlpha">Guardar</v-btn>
        <v-btn color="primaryBetha" class="ml-2">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { DEPARTMENTS } from "@/utils";
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store";
import { IProduct, IVSelectItem, TDepartment } from "@/types";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
interface INewProductForm extends IProduct {
  department: TDepartment;
}

@Component({
  components: {
    "quill-editor": quillEditor,
  },
})
export default class NewProductForm extends Vue {
  created() {
    for (const key in DEPARTMENTS) {
      this.departments.push({
        // TODO: Remove TS IGNORE
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        text: DEPARTMENTS[key as keyof typeof DEPARTMENTS].labelLang[
          AppStore.lang
        ].toLocaleUpperCase(),
        value: key,
      });
    }
    console.log("All Departments", this.departments);
  }
  infinity = false;

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

  form: INewProductForm = {
    department: "automotriz",
    title: "",
    price: 0,
    img: [],
    brand: "",
    tax: 0,
    description: "",
    weight: 0,
    options: {
      colors: [],
      size: "",
    },
    tags: [],
    cant: 0,
  };

  departments: IVSelectItem[] = [];
  quillEditor = "";

  get editor() {
    return (this.$refs.myTextEditor as any).quill;
  }

  get inventaryPlaceholder() {
    return this.infinity ? "Infinito" : "";
  }
}
</script>


<style lang="scss">
.ql-editor {
  height: 10rem !important;
}
</style>