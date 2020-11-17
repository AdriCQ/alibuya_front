<template>
  <div id="new-product-view" class="view-container">
    <!-- Image uploader -->
    <v-section>
      <!-- File input hidden -->
      <input
        type="file"
        style="display: none"
        ref="imagePicker"
        accept="image/*"
        multiple
        @change="onImagePicked"
      />
      <!--  / File input hidden -->

      <v-card flat class="pl-2">
        <v-card-title>Imágenes</v-card-title>
        <v-row justify="space-around">
          <v-col cols="auto" v-for="(img, key) in images" :key="key">
            <div class="img-container-qwer">
              <v-img :src="img.url" width="100%" height="100%" />
            </div>
          </v-col>
          <v-col cols="auto">
            <div
              class="img-container-plus-qwer d-flex align-center justify-center cursor-pointer"
              @click="pickImage"
            >
              <div>
                <v-icon x-large color="secondaryAlpha">mdi-plus</v-icon>
                <p class="subtitle-2">Subir Imagen</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-section>
    <!-- / Image uploader -->

    <!-- Form Product -->
    <v-section class="mt-2">
      <new-product-form @submit="formSubmit" />
    </v-section>
    <!-- / Form Product -->
  </div>
</template>

<script lang='ts'>
import { AppStore } from "@/store";
import { IProduct, IVSelectItem, TCategory } from "@/types";
import { CATEGORIES } from "@/utils";
import { Vue, Component } from "vue-property-decorator";

interface EventTarget extends globalThis.EventTarget {
  files: FileList;
}

interface IIMages {
  name: string;
  url: string | ArrayBuffer | null | undefined;
}

@Component({
  components: {
    "v-product": () => import("@/components/widgets/Product.vue"),
    "new-product-form": () =>
      import("@/components/forms/vendor/NewProductForm.vue"),
  },
})
export default class NewProductView extends Vue {
  created() {
    for (const key in CATEGORIES) {
      this.CATEGORIES.push({
        // TODO: Remove TS IGNORE
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        text: CATEGORIES[key as keyof typeof CATEGORIES].labelLang[
          AppStore.lang
        ].toLocaleUpperCase(),
        value: key,
      });
    }
  }

  product: IProduct = {
    cant: 1,
    title: "",
    price: 0,
    img: [],
    weight: 0,
    description: "",
    brand: "",
    tax: 0,
    options: {
      colors: [],
      sizes: [],
    },
    tags: [],
    type_id: 0,
  };
  imagePreviewSrc: string | ArrayBuffer | null | undefined = null;
  images: IIMages[] = [];

  stepper = 1;

  category: TCategory = "automotriz";
  CATEGORIES: IVSelectItem[] = [];

  get productPreview(): IProduct {
    return {
      title: this.product.title,
      price: this.product.price,
      img: this.imagePreviewSrc as string,
      weight: this.product.weight,
      description: this.product.description,
    };
  }

  previewImage(_input: File[]) {
    if (_input.length) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewSrc = e.target?.result;
      };
      reader.readAsDataURL(_input[0]);
    }
  }
  pickImage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.imagePicker.click();
  }

  onImagePicked(e: Event) {
    const files = (e.target as EventTarget)?.files;
    for (let i = 0; i < files.length; i++) {
      let _name = "";
      let _url: string | ArrayBuffer | null | undefined = null;
      if (files[i] !== undefined) {
        _name = files[i].name;
        if (_name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.onload = (e) => {
          _url = e.target?.result;
          this.images.push({
            name: _name,
            url: _url,
          });
        };
        fr.readAsDataURL(files[i]);
      }
    }
  }

  formSubmit(_product: IProduct) {
    console.log("Product", _product);
  }
}
</script>
