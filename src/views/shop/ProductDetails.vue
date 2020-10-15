<template>
  <div id="product-details-view">
    <section>
      <v-container>
        <v-card>
          <v-row>
            <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
              <v-img :src="product.img" max-width="20rem" />
            </v-col>
            <v-col xs="12" sm="12" md="8" lg="8" xl="8" cols="12">
              <v-card-title
                >${{ Number(product.price).toFixed(2) }}
              </v-card-title>
              <v-card-title>{{ product.title }} </v-card-title>

              <v-card-text>
                <ul>
                  <li v-for="(p, i) in product.description" :key="i">
                    {{ p }}
                  </li>
                </ul>
              </v-card-text>
              <v-card-text>
                <v-form>
                  <v-select class="w-20" label="Recogida"></v-select>
                  <v-checkbox
                    label="Entiendo que este producto tiene un cargo en destino de 5,00 CUC"
                  >
                  </v-checkbox>

                  <cant-input :cant.sync="cant" />
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { ProductStore } from "@/store/Products";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/ProductCantInput.vue"),
  },
})
export default class ProductDetailsView extends Vue {
  cant = 0;
  get product() {
    return ProductStore.products[0];
  }
}
</script>