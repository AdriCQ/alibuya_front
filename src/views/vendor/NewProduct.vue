<template>
  <div id="new-product-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title>Creando tu producto en Alibuya</v-card-title>
        <v-stepper v-model="stepper" vertical>
          <!-- Step 1 -->
          <v-stepper-step :complete="stepper > 1" step="1">
            Categoría
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-select
              label="Categoría"
              :items="departments"
              v-model="department"
              class="w-20"
              filled
              dense
            />
            <v-btn @click="nextStep" small color="primary">Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 1 -->

          <!-- Step 2 -->
          <v-stepper-step :complete="stepper > 2" step="2">
            Nombra tu producto
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-text-field
              v-model="product.title"
              label="Nombre del Producto"
              placeholder="Nombre del Producto"
              class="w-40"
            />
            <v-btn @click="nextStep" small color="primary">Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 2 -->

          <!-- Step 3: Images -->
          <v-stepper-step :complete="stepper > 3" step="3">
            Fotos del procucto
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-file-input
              v-model="product.img"
              label="Imágenes"
              small-chips
              multiple
              counter="3"
              show-size=""
              append-icon="mdi-file-image"
              @change="previewImage"
            />
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 3: Images -->

          <!-- Step 4: Detalles -->
          <v-stepper-step :complete="stepper > 4" step="4">
            Detalles
          </v-stepper-step>

          <v-stepper-content step="4">
            <v-row>
              <v-col xs="12" sm="6">
                <v-text-field
                  type="number"
                  v-model="product.price"
                  label="Precio"
                />
              </v-col>
              <v-col xs="12" sm="6">
                <v-text-field
                  type="number"
                  v-model="product.weight"
                  label="Peso"
                />
              </v-col>
            </v-row>
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 4: Description -->

          <!-- Step 5: Final -->
          <v-stepper-step :complete="stepper > 5" step="5">
            Descripción
          </v-stepper-step>

          <v-stepper-content step="5">
            <v-list>
              <v-list-item v-for="(d, k) in product.description" :key="k">
                <v-list-item-icon @click="removeDescription(k)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ d }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-textarea v-model="description" label="Descripción">
              <template v-slot:append-outer>
                <v-btn color="success" small @click="addDescription">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-textarea>
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 5: Description -->

          <!-- Step 6: Finish -->
          <v-stepper-step :complete="stepper > 6" step="6">
            Finalizar
          </v-stepper-step>

          <v-stepper-content step="6">
            <v-product :product="productPreview" no-link class="mb-4" />
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="save" color="primary" small>Guardar</v-btn>
          </v-stepper-content>
          <!-- / Step 6: Images -->
        </v-stepper>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { AppStore, VendorStore } from "@/store";
import { IProduct, IProductCart, IVSelectItem, TDepartment } from "@/types";
import { DEPARTMENTS } from "@/utils";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "v-product": () => import("@/components/widgets/Product.vue"),
  },
})
export default class NewProductView extends Vue {
  mounted() {
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
  }
  product: IProductCart = {
    cant: 1,
    title: "",
    price: 0,
    img: [],
    weight: 0,
    description: [],
  };
  description = "";
  imagePreviewSrc: string | ArrayBuffer | null | undefined = null;

  stepper = 1;

  department: TDepartment = "automotriz";
  departments: IVSelectItem[] = [];

  get validateStep() {
    return true;
    // switch (this.stepper) {
    //   case 1:
    //     return this.product.title.length;
    //   case 2:
    //     return this.product.img.length;
    //   case 3:
    //     return (
    //       this.product.weight &&
    //       this.product.weight > 0 &&
    //       this.product.price > 0
    //     );
    //   case 4:
    //     return this.product.description?.length;
    //   default:
    //     return false;
    // }
  }

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

  nextStep() {
    if (this.validateStep) {
      this.stepper++;
    }
  }

  prevStep() {
    if (this.stepper > 1) {
      this.stepper--;
    }
  }

  addDescription() {
    if (this.description) {
      this.product.description?.push(this.description);
      this.description = "";
    }
  }

  removeDescription(_key: number) {
    this.product.description?.splice(_key, 1);
  }

  save() {
    VendorStore.addProduct(this.productPreview);
    this.$router.push({
      name: "vendor.products",
    });
  }
}
</script>