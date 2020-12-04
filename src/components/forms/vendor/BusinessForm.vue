<template>
  <v-form @submit.prevent="submit">
    <v-card flat>
      <v-card-title>Configura tu negocio</v-card-title>
      <v-card-text>
        <v-row justify="space-around">
          <v-col xs="12" sm="12" md="3" class="d-flex justify-center">
            <!-- Image -->
            <div class="my-2">
              <input
                type="file"
                ref="vendor-img-input"
                hidden
                accept="image/*"
                @change="imageInputChange"
              />
              <div class="img-container-qwer cursor-pointer" v-if="imgPreview">
                <v-img :src="imgPreview" width="100%" height="100%" />
              </div>
              <div
                v-else
                class="img-container-plus-qwer cursor-pointer d-flex justify-center align-center"
                @click="pickImage"
              >
                <div>
                  <v-icon x-large color="secondaryAlpha">mdi-plus</v-icon>
                  <p class="subtitle-2">Subir Imagen</p>
                </div>
              </div>
            </div>
            <!-- / Image -->
          </v-col>

          <v-col>
            <!-- Types -->
            <!-- <v-card-subtitle>Categorías</v-card-subtitle> -->
            <v-select
              dense
              outlined
              multiple
              small-chips
              deletable-chips
              v-model="form.tags"
              :items="allTypes"
              label="Categorías"
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
            <v-card-subtitle class="black--text">Descripción</v-card-subtitle>

            <quill-editor
              class="editor"
              ref="businessFormTextEditor"
              :options="editorOption"
              v-model="form.description"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primaryAlpha" type="submit">Guardar</v-btn>
        <v-btn color="primaryBetha" class="ml-2">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import {
  IEventTarget,
  TImage,
  IVendorForm,
  IVSelectItem,
  IShopImage,
} from "@/types";
import { CATEGORIES } from "@/utils";
import { Vue, Component, Prop } from "vue-property-decorator";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { VendorStore } from "@/store";

@Component({
  components: {
    "quill-editor": quillEditor,
  },
})
export default class BusinessForm extends Vue {
  mounted() {
    if (this.edit && this.vendor.id) {
      this.form = this.vendor;
      if ((this.form.image as IShopImage).paths) {
        // TODO: Remove TS ignore
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore1
        this.imgPreview = (this.form.image as IImage).paths["sm"];
        // console.log(this.imgPreview);
      }
    }
  }
  @Prop(Boolean) readonly edit!: boolean;

  form: IVendorForm = {
    id: undefined,
    upload_image: "",
    title: "",
    description: "",
    tags: [],
  };
  imgPreview: TImage | null = null;

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

  get vendor() {
    return VendorStore.vendor;
  }

  submit() {
    const formData = new FormData();
    formData.append("image", this.form.upload_image as File);
    formData.append("title", this.form.title);
    formData.append("description", this.form.description);
    this.form.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    this.$emit("submit", formData);
  }

  pickImage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs["vendor-img-input"].click();
  }
  imageInputChange(e: Event) {
    if (!this.edit) {
      const files = (e.target as IEventTarget)?.files;
      this.form.upload_image = files[0];
      for (let i = 0; i < files.length; i++) {
        let _name = "";
        let _url: TImage;
        if (files[i] !== undefined) {
          _name = files[i].name;
          if (_name.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.onload = (e) => {
            _url = e.target?.result as TImage;
            this.imgPreview = _url;
          };
          fr.readAsDataURL(files[i]);
        }
      }
    }
  }
}
</script>