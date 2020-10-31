<template>
  <div id="shop-tag-view" class="view-container">
    <v-section>
      <v-card>
        <!-- Section title -->
        <v-card-title>
          <v-icon class="mr-2">{{ departmentIcon }}</v-icon>
          Departamento de {{ departmentName }}
        </v-card-title>
        <!-- / Section title -->

        <v-card-subtitle class="mt-2 pb-0 mb-0">
          <search-inline :active-department="tag" />
        </v-card-subtitle>

        <!-- Section Content -->
        <template>
          <v-card>
            <v-card-subtitle>
              <v-btn icon @click="activeComponent = 'product-grid'">
                <v-icon>mdi-view-grid</v-icon>
              </v-btn>
              <v-btn icon @click="activeComponent = 'product-list'">
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
            </v-card-subtitle>

            <keep-alive>
              <component :is="activeComponent" :tag="tag" />
            </keep-alive>
          </v-card>
        </template>
        <!-- / Section Content -->
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store";

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

  get tag() {
    return this.$route.params.tag;
  }
  get departmentName(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return DEPARTMENTS[this.tag].labelLang[this.appLang];
  }

  get departmentIcon() {
    return DEPARTMENTS[this.tag].icon;
  }

  get appLang() {
    return AppStore.lang;
  }
}
</script>