<template>
  <div id="shop-view" class="view-container">
    <v-section>
      <v-container>
        <v-card flat>
          <v-card-title>Todos los Productos</v-card-title>
          <v-row
            no-gutters
            v-for="(productGroup, pgKey) in products"
            :key="pgKey"
          >
            <v-col class="ma-1">
              <v-card flat>
                <products-group
                  :title="categories[pgKey].labelLang.es"
                  :products="productGroup"
                  :images-props="{ maxWidth: 200, maxHeight: 200 }"
                  link
                />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CATEGORIES } from "@/utils";
import { ShopStore } from "@/store";

@Component({
  components: {
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
  },
})
export default class ShopHome extends Vue {
  get categories() {
    return CATEGORIES;
  }

  get products() {
    return ShopStore.allProducts;
  }
}
</script>