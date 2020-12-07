<template>
  <div id="shop-all-view" class="view-container">
    <v-section>
      <v-card
        v-for="(pGroup, pgKey) in products"
        :key="pgKey"
        :loading="loading"
      >
        <v-card-title>{{ category(pgKey) }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="6"
              sm="4"
              md="3"
              lg="2"
              xl="2"
              v-for="(product, pKey) in pGroup"
              :key="pKey"
            >
              <product-basic
                :product="product"
                link
                bodyClass="pa-0"
                titleClass="pa-1"
                show-price
              />
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer /><v-btn link @click="gotoCategory(pgKey)" x-small text
              >Ver Más</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { ShopStore, AppStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";
import { IProductCategory } from "@/types";
import { ScrollTop } from "@/utils";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ShopAllView extends Vue {
  created() {
    this.loadAllProducts();
  }
  mounted() {
    ScrollTop();
  }
  updated() {
    ScrollTop();
  }
  loading = false;

  get categories() {
    return ShopStore.categories;
  }

  get products() {
    return ShopStore.products;
  }

  get appLang() {
    return AppStore.lang;
  }

  /**
   * Load all products
   */
  async loadAllProducts() {
    this.loading = true;

    try {
      await this.categories.forEach((cat) => {
        ShopStore.getProductsByCategory(cat.tag);
      });
    } catch (error) {
      // TODO: HAndle error
      console.log("All View", error);
    }
    this.loading = false;
  }

  category(_cTag: string, _key = false) {
    let resp!: string;
    let key!: number;
    this.categories.forEach((cat, ckey) => {
      if (cat.tag === _cTag) {
        resp = cat.title[this.appLang] as string;
        key = ckey;
        return;
      }
    });
    return _key ? key : resp;
  }

  gotoCategory(_category: string) {
    const key = this.category(_category, true);
    this.$router.push({
      name: "shop.category",
      query: {
        category: key.toString(),
      },
    });
  }
}
</script>