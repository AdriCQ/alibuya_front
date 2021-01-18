<template>
  <div id="shop-types-view" class="view-container">
    <v-section fluid>
      <v-card flat :loading="loadingCard">
        <!-- Title -->
        <v-card-title v-if="type">
          {{ type.title[appLang] }}
        </v-card-title>
        <!-- / Title -->

        <v-card-text v-if="emptyInventary">
          <!-- Empty Inventary -->
          <div class="w-100 max-w-30">
            <v-img src="img/png/empty-cart.png" />
          </div>
          <!-- Empty Inventary -->
        </v-card-text>

        <product-grid
          v-else
          :products="products"
          :product-props="{
            showTitle: true,
            showPrice: true,
            showRating: true,
            cardProps: {
              outlined: true,
            },
            bodyClass: 'pa-2',
          }"
        />

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
    "product-grid": () => import("@/components/widgets/products/Grid.vue"),
  },
})
export default class ShopType extends Vue {
  products: IProduct[] = [];
  emptyInventary = false;
  loadingCard = false;

  beforeMount() {
    this.type;
  }

  destroyed() {
    ScrollTop();
  }

  get type() {
    ScrollTop();
    this.cleanState();
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
      // Show message
      console.log("This type or category is not valid.");
      this.products = [];
      return null;
    }
  }

  get appLang() {
    return AppStore.lang;
  }

  async loadProducts(_params: IPaginatedTypeProductsParam) {
    try {
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

  /**
   * State before loads
   */
  cleanState() {
    this.products = [];
    this.emptyInventary = false;
    this.loadingCard = false;
  }
}
</script>