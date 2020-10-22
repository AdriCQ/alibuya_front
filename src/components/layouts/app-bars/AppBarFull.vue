<template>
  <v-app-bar
    :absolute="!$vuetify.breakpoint.lgAndUp"
    :app="$vuetify.breakpoint.lgAndUp"
    color="secondary"
    dark
    shrink-on-scroll
    height="auto"
  >
    <div class="d-block" style="width: 100%">
      <div class="h-3 d-flex align-center">
        <v-app-bar-nav-icon @click="toggleSidebarLeft" />

        <div @click="goToRoute('main.home')" class="cursor-pointer">
          ALIBUYA
        </div>
        <v-spacer />
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <search-product-form style="max-width: 30rem" />
          <v-spacer />
        </template>
        <!-- Auth buttons -->
        <v-btn text @click="openAuthPopup" v-if="!isLogged">
          <span v-if="$vuetify.breakpoint.smAndUp" class="mr-2">
            Identifícate
          </span>
          <v-icon class="ml-2">mdi-account-circle</v-icon>
        </v-btn>

        <v-menu v-else>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <span v-if="$vuetify.breakpoint.smAndUp" class="mr-2">
                {{ userName }}
              </span>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link>
              <v-list-item-title> Mi Cuenta </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title> Salir </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- / Auth buttons -->
        <v-btn text @click="goToRoute('shop.cart')">
          <v-badge
            v-if="shopingCartCounter"
            color="primary"
            :content="shopingCartCounter"
          >
            <span v-if="$vuetify.breakpoint.smAndUp" class="mr-2">
              Mi Carrito
            </span>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <template v-else>
            <span v-if="$vuetify.breakpoint.smAndUp" class="mr-2">
              Mi Carrito
            </span>
            <v-icon>mdi-cart</v-icon>
          </template>
        </v-btn>
      </div>

      <div class="h-3 d-flex align-center" v-if="!$vuetify.breakpoint.mdAndUp">
        <v-spacer />
        <search-product-form style="max-width: 50rem" />
        <v-spacer />
      </div>
    </div>

    <template v-slot:extension>
      <v-tabs centered>
        <v-tab v-for="(dep, key) in departments" :key="key">{{
          dep.labelLang[appLang]
        }}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store/App";
import { PopupStore } from "@/store/Popups";
import { AuthStore } from "@/store/Auth";
import { ShopStore } from "@/store/Shop";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Vue {
  get departments() {
    return DEPARTMENTS;
  }

  get appLang() {
    return AppStore.lang;
  }

  get isLogged() {
    return AuthStore.isLogged;
  }

  get userName() {
    return AuthStore.profile.first_name;
  }

  get shopingCartCounter() {
    return ShopStore.shoppingCartCounter;
  }

  /**
   *
   */
  toggleSidebarLeft() {
    AppStore.sidebarLeft = !AppStore.sidebarLeft;
  }

  /**
   *
   */
  openAuthPopup() {
    PopupStore.openAuth("login");
  }

  goToRoute(_name: string) {
    if (this.$route.name !== _name) {
      this.$router.push({ name: _name });
    }
  }

  logout() {
    AuthStore.logout();
  }
}
</script>