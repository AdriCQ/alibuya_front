<template>
  <div id="shop-category-view" class="view-container">
    <v-section v-if="category" fluid>
      <v-card flat :loading="loadingCard">
        <!-- Title -->
        <v-card-title v-if="category" class="d-block text-center pb-1">
          {{ category.title[appLang] }}
        </v-card-title>
        <!-- /  Title -->

        <!-- Subcategories Navigation -->
        <v-card-title v-if="subcategories" class="text-color-body pt-1">
          <subcategories-nav :subcategories="subcategories" justify="center" />
        </v-card-title>
        <!-- / Subcategories Navigation -->
      </v-card>
    </v-section>

    <v-section fluid v-if="emptyInventary || products.length">
      <v-card flat :loading="loadingCard">
        <!-- Empty Inventary -->
        <v-card-text v-if="emptyInventary">
          <div class="w-100 max-w-30">
            <v-img src="img/png/empty-cart.png" />
          </div>
        </v-card-text>
        <!-- / Empty Inventary -->

        <!-- Products Grid -->
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
        <!-- Products Grid -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { GettersBreakpoints } from "@/mixins/utils";
import { AppStore, ShopStore } from "@/store";
import {
  IProduct,
  IProductCategory,
  IProductTypeLink,
  IPaginatedCategoryProductsParam,
} from "@/types";

@Component({
  components: {
    "subcategories-nav": () =>
      import("@/components/parts/shop/SubcategoriesNav.vue"),
    "product-grid": () => import("@/components/widgets/products/Grid.vue"),
  },
})
export default class ShopCategory extends mixins(GettersBreakpoints) {
  products: IProduct[] = [];
  category: IProductCategory | null = null;
  subcategories: IProductTypeLink[] = [];
  emptyInventary = false;
  loadingCard = false;
  currentPage = 1;

  created() {
    this.cleanState();
    this.setState();
  }

  get appLang() {
    return AppStore.lang;
  }

  @Watch("$route.query.category")
  onRouteChange() {
    this.cleanState();
    this.setState();
  }

  async loadProducts(_params: IPaginatedCategoryProductsParam) {
    try {
      this.loadingCard = true;
      await ShopStore.getProductsByCategory(_params);
      if (ShopStore.products[_params.category].length) {
        this.products = ShopStore.products[_params.category];
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
   * Set subcategories
   */
  setSubcategories(_tag: string) {
    this.subcategories = ShopStore.getSubcategoriesByTag(
      _tag,
      true
    ) as IProductTypeLink[];
  }

  /**
   * Set the values for: category, subcategories and products
   * @param _setSubcategories
   */
  setState(_setSubcategories = true) {
    if (
      this.$route.query.category &&
      ShopStore.categories[Number(this.$route.query.category)]
    ) {
      this.category = ShopStore.categories[Number(this.$route.query.category)];
      if (_setSubcategories) this.setSubcategories(this.category.tag);
      this.loadProducts({
        category: this.category.tag,
        page: this.currentPage,
      });
    } else {
      this.emptyInventary = true;
    }
  }

  nextPage() {
    this.currentPage++;
    this.setState(false);
  }

  /**
   * State before loads
   */
  cleanState() {
    this.emptyInventary = false;
    this.products = [];
    this.category = null;
    this.subcategories = [];
  }
}
</script>