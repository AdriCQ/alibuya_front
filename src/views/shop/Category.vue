<template>
  <div id="shop-category-view" class="view-container">
    <v-section>
      <v-card flat :loading="loadingCard || !category">
        <!-- Section title -->
        <v-card-title v-if="category">
          {{ category.title.es }}
        </v-card-title>
        <!-- / Section title -->

        <!-- Section Content -->
        <v-card>
          <v-card-text v-if="emptyInventary || !category">
            <!-- Empty Inventary -->
            <div class="w-100 max-w-30">
              <v-img src="img/png/empty-cart.png" />
            </div>
            <!-- Empty Inventary -->
          </v-card-text>
          

          <product-grid v-if="!emptyInventary" :products="products" />
        </v-card>

        <!-- / Section Content -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore, ShopStore } from "@/store";
import { IProduct, IProductCategory } from '@/types';

@Component({
  components: {
    "product-grid": () => import("@/components/data/ProductGrid.vue"),
  },
})
export default class ShopCategory extends Vue {
  products: IProduct[] = [];
  emptyInventary = false;
  loadingCard = false;

  get category(): IProductCategory | null {
    let cat: IProductCategory | null = null;
    if(this.$route.query.category && ShopStore.categories[Number(this.$route.query.category)]){
      cat = ShopStore.categories[Number(this.$route.query.category)];
      this.loadProducts(cat.tag);
    }
    return cat;
  }

  get appLang() {
    return AppStore.lang;
  }

  async loadProducts(_tag: string) {
    try {
      this.emptyInventary = true;
      this.loadingCard = true;
      await ShopStore.getProductsByCategory(_tag);
      if (ShopStore.products[_tag].length) {
        this.products = ShopStore.products[_tag];
        this.emptyInventary = false;
      } else {
        this.products = [];
        this.emptyInventary = true;
      }
    } catch (error) {
      // PopupStore.addNotification(error);
      this.emptyInventary = true;
    }
    this.loadingCard = false;
  }
}
</script>