<template>
  <v-form @submit.prevent="submit">
    <v-card flat>
      <v-card-title>Configura tu negocio</v-card-title>
      <v-card-text>
        <!-- Types -->
        <v-select
          dense
          outlined
          multiple
          chips
          deletable-chips
          v-model="form.type"
          :items="allTypes"
        />
        <!-- / Types -->

        <!-- Title -->
        <v-text-field
          dense
          outlined
          v-model="form.title"
          label="Nombre del Negocio"
        />
        <!-- / Title -->
        <v-card-subtitle>Descripción</v-card-subtitle>

        <quill-editor
          class="editor"
          ref="businessFormTextEditor"
          :options="editorOption"
          v-model="form.description"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primaryAlpha" type="submit">Guardar</v-btn>
        <v-btn color="primaryBetha" class="ml-2">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { IVendor, IVSelectItem } from "@/types";
import { CATEGORIES } from "@/utils";
import { Vue, Component } from "vue-property-decorator";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

@Component({
  components: {
    "quill-editor": quillEditor,
  },
})
export default class BusinessForm extends Vue {
  form: IVendor = {
    id: undefined,
    title: "",
    description: "",
    type: [],
  };

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

  get allTypes() {
    const types: IVSelectItem[] = [];
    for (const key in CATEGORIES) {
      types.push({
        text: CATEGORIES[key].labelLang.es ? CATEGORIES[key].labelLang.es : "",
        value: key,
      });
    }
    return types;
  }

  submit() {
    this.$emit("submit", this.form);
  }
}
</script>