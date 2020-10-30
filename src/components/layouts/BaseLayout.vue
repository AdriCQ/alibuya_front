<template>
  <div>
    <!-- Popups -->
    <popup-auth />
    <popup-notification />
    <popup-product-details />

    <!--/  Popups -->

    <app-sidebar-left />
    <app-header class="pa-2" />

    <!-- Sizes your content based upon application components -->
    <v-main id="app-content">
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <router-view class="min-main-content" />

      <v-snackbar
        app
        :value="cookieStatusActive"
        color="secondary"
        bottom
        width="100%"
        @input="updateCookieStatus"
        timeout="-1"
      >
        <p>
          Éste sitio utiliza cookies para mejorar su experiencia de usuario.
        </p>
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="updateCookieStatus(true)">
            <!-- <span class="mr-1">Aceptar</span> -->
            <v-icon>mdi-checkbox-marked</v-icon>
          </v-btn>
          <v-btn icon v-bind="attrs" @click="updateCookieStatus(false)">
            <!-- <span class="mr-1">Cancelar</span> -->
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <app-footer />
    </v-main>
  </div>
</template>

<script lang='ts'>
import { AppStore } from "@/store";
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
    "popup-notification": () =>
      import("@/components/popups/NotificationPopup.vue"),
    "popup-product-details": () =>
      import("@/components/popups/ProductDetails.vue"),
  },
})
export default class BaseLayout extends Vue {
  get cookieStatusActive() {
    return !AppStore.cookieAcceted;
  }

  updateCookieStatus(_input: boolean) {
    AppStore.cookieAcceted = _input;
  }
}
</script>