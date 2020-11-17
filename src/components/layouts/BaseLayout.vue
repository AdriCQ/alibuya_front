<template>
  <div>
    <!-- Popups -->
    <popup-auth />
    <popup-notification />
    <!-- <popup-product-details /> -->
    <popup-cookie />
    <!--/  Popups -->

    <app-sidebar-left />
    <app-header class="pa-2" />

    <!-- Sizes your content based upon application components -->
    <v-main id="app-content">
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <router-view class="min-main-content" />

      <app-footer />
    </v-main>
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
    "popup-cookie": () => import("@/components/popups/CookiePopup.vue"),
    "popup-notification": () =>
      import("@/components/popups/NotificationPopup.vue"),
    // "popup-product-details": () =>
    //   import("@/components/popups/ProductDetails.vue"),
  },
})
export default class BaseLayout extends Vue {}
</script>