<template>
  <div>
    <!-- Popups -->
    <popup-auth />
    <popup-product-details />

    <!--/  Popups -->

    <app-sidebar-left />
    <app-header />

    <!-- Sizes your content based upon application components -->
    <v-main id="app-content" style="min-height: 900px; padding-top: 0px">
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>

    <app-footer />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppFooter from "./Footer.vue";
import AppHeader from "./Header.vue";
import AppSidebarLeft from "./SidebarLeft.vue";

@Component({
  components: {
    AppFooter,
    AppHeader,
    AppSidebarLeft,
    "popup-auth": () => import("@/components/popups/AuthPopup.vue"),
    "popup-product-details": () =>
      import("@/components/popups/ProductDetails.vue"),
  },
})
export default class BaseLayout extends Vue {}
</script>