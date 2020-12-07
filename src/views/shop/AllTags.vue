<template>
  <div id="shop-all-tags" class="view-container">
    <v-section>
      <v-card flat>
        <v-row>
          <v-col
            xs="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(category, cKey) in categories"
            :key="cKey"
          >
            <v-list>
              <v-list-item
                link
                :to="category.to"
                style="font-size: 1rem; min-height: 1.8rem"
              >
                <v-list-item-title>
                  <b>{{ category.labelLang[appLang] }}</b>
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(type, cType) in category.types"
                :key="cType"
                link
                :to="type.to"
                style="font-size: 1rem; min-height: 1.5rem"
              >
                <v-list-item-title>
                  {{ type.labelLang[appLang] }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore, ShopStore } from "@/store";
import { IProductCategoryLink } from "@/types";

@Component
export default class ShopAllTags extends Vue {
  get categories() {
    const categories: IProductCategoryLink[] = [];
    ShopStore.categoriesLink.forEach((cat, key) => {
      if (key > 0) {
        categories.push(cat);
      }
    });
    return categories;
  }

  get appLang() {
    return AppStore.lang;
  }
}
</script>