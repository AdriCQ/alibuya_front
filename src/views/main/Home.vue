<template>
  <div class="view-container">
    <v-section
      fluid
      v-for="(ann, annKey) in announcements"
      :key="`announcement-${annKey}`"
    >
      <!-- Product Group -->
      <products-group
        v-if="ann.type === 'group'"
        :title="ann.title[appLang]"
        :products="ann.products.slice(0, 6)"
        single
        show-title
        show-price
      />
      <!-- /Product Group -->

      <!-- Product Slider -->
      <products-collection-slider
        v-if="ann.type === 'slider'"
        :title="ann.title[appLang]"
        :products="ann.products"
        link
        show-title
        show-price
      />
      <!-- / Product Slider -->

      <!-- Product Grid -->
      <product-grid
        v-if="ann.type === 'grid'"
        :title="ann.title[appLang]"
        :products="ann.products"
        show-price
        large
      />
      <!-- / Product Grid -->

      <!-- Announcement Row -->
      <v-row v-if="ann.type === 'row'">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(col, colKey) in ann.cols"
          :key="`col-${colKey}`"
        >
          <product-offer
            v-if="col.type === 'offer'"
            :title="col.title[appLang]"
            :product="col.products"
            show-price
            large
          />
          <!-- Product Grid -->
          <product-grid
            v-if="col.type === 'grid'"
            :title="col.title[appLang]"
            :products="col.products"
            show-price
            large
          />
          <!-- / Product Grid -->
        </v-col>
      </v-row>
      <!-- / Announcement Row -->
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore, AnnouncementStore, AppStore } from "@/store";

@Component({
  components: {
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
    "products-collection-slider": () =>
      import("@/components/sliders/ProductsCollectionSlider.vue"),
    // test
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
    "product-offer": () => import("@/components/widgets/products/Offer.vue"),
    "product-grid": () =>
      import("@/components/widgets/products/ProductGrid.vue"),
  },
})
export default class HomeMainView extends Vue {
  created() {
    AnnouncementStore._getHomeAnnouncements();
  }

  get announcements() {
    return AnnouncementStore.home;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  get appLang() {
    return AppStore.lang;
  }
}
</script>