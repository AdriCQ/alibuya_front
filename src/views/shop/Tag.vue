<template>
  <div id="shop-tag-view" class="view-container">
    <v-section>
      <v-card flat>
        <!-- Section title -->
        <v-card-title>
          <!-- <v-icon class="mr-2">{{ departmentIcon }}</v-icon> -->
          Departamento de {{ departmentName }}
        </v-card-title>
        <!-- / Section title -->

        <!-- Section Content -->
        <v-card>
          <v-card-text v-if="emptyInventary">
            <!-- Empty Inventary -->
            <div class="w-30">
              <v-img src="img/png/empty-cart.png" />
            </div>
            <!-- Empty Inventary -->
          </v-card-text>
          <v-card-subtitle v-if="products.lenght">
            <v-btn icon @click="activeComponent = 'product-grid'">
              <v-icon>mdi-view-grid</v-icon>
            </v-btn>
            <v-btn icon @click="activeComponent = 'product-list'">
              <v-icon>mdi-view-list</v-icon>
            </v-btn>
          </v-card-subtitle>

          <keep-alive v-if="products.lenght">
            <component :is="activeComponent" :products="products" />
          </keep-alive>
        </v-card>

        <!-- / Section Content -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CATEGORIES } from "@/utils/const";
import { AppStore, PopupStore, ShopStore } from "@/store";
import { IProduct, TCategory } from "@/types";

@Component({
  components: {
    "search-inline": () =>
      import("@/components/forms/shop/SearchInlineFormDepartments.vue"),
    "product-grid": () => import("@/components/data/ProductGrid.vue"),
    "product-list": () => import("@/components/data/ProductList.vue"),
  },
})
export default class ShopTag extends Vue {
  activeComponent: "product-grid" | "product-list" = "product-grid";
  products: IProduct[] = [];
  emptyInventary = false;

  get tag() {
    this.laodProducts(this.$route.params.tag as TCategory);
    return this.$route.params.tag;
  }

  get departmentName(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return CATEGORIES[this.tag].labelLang[this.appLang];
  }

  get departmentIcon() {
    return CATEGORIES[this.tag].icon;
  }

  get appLang() {
    return AppStore.lang;
  }

  async laodProducts(_category: TCategory) {
    try {
      this.emptyInventary = false;
      await ShopStore.getProductsByCategory(_category);
      if (ShopStore.allProducts[this.tag].length) {
        this.products = ShopStore.allProducts[this.tag];
      } else {
        this.products = [];
        this.emptyInventary = true;
      }
    } catch (error) {
      PopupStore.addNotification(error);
      this.emptyInventary = true;
    }
  }
}
</script>