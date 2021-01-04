<template>
  <div id="shop-types-view" class="view-container">
    <v-section>
      <v-card flat :loading="loadingCard || !type">
        <!-- Section title -->
        <v-card-title v-if="type">
          {{ type.title[appLang] }}
        </v-card-title>
        <!-- / Section title -->

        <!-- Section Content -->
        <v-card>
          <v-card-text v-if="emptyInventary || !type">
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
import { ShopStore, AppStore } from "@/store";
import { IProductType, IProduct, IPaginatedTypeProductsParam } from "@/types";
import { ScrollTop } from "@/utils";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "product-grid": () => import("@/components/data/ProductGrid.vue"),
  },
})
export default class ShopType extends Vue {
  beforeMount() {
    const cKey = Number(this.$route.query.category);
    const tKey = Number(this.$route.query.type);
    if (
      ShopStore.categories[cKey] &&
      ShopStore.categories[cKey].types &&
      (ShopStore.categories[cKey].types as IProductType[])[tKey]
    ) {
      const tag = (ShopStore.categories[cKey].types as IProductType[])[tKey]
        .tag;
      this.loadProducts({ type: tag });
    }
  }

  mounted() {
    ScrollTop();
  }

  updated() {
    ScrollTop();
  }

  products: IProduct[] = [];
  emptyInventary = false;
  loadingCard = false;

  get type() {
    const cKey = Number(this.$route.query.category);
    const tKey = Number(this.$route.query.type);
    if (
      ShopStore.categories[cKey] &&
      ShopStore.categories[cKey].types &&
      (ShopStore.categories[cKey].types as IProductType[])[tKey]
    ) {
      const type = (ShopStore.categories[cKey].types as IProductType[])[tKey];
      this.loadProducts({ type: type.tag });
      return type;
    } else {
      return null;
    }
  }

  get appLang() {
    return AppStore.lang;
  }

  async loadProducts(_params: IPaginatedTypeProductsParam) {
    try {
      this.emptyInventary = true;
      this.loadingCard = true;
      await ShopStore.getProductsByType(_params);
      if (ShopStore.products[_params.type].length) {
        this.products = ShopStore.products[_params.type];
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