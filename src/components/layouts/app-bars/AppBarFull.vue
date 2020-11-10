<template>
  <v-app-bar
    :absolute="!$vuetify.breakpoint.lgAndUp"
    :app="$vuetify.breakpoint.lgAndUp"
    color="tertiary"
    dark
    shrink-on-scroll
    height="auto"
    id="app-bar-full"
  >
    <div class="d-block" style="width: 100%">
      <div class="h-3 d-flex align-center">
        <v-app-bar-nav-icon @click="toggleSidebarLeft" />

        <v-btn
          text
          @click="goToRoute('main.home')"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <v-img width="5rem" src="img/logos/logo_text_white.png" />
        </v-btn>
        <v-spacer />
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <search-product-form style="max-width: 30rem" />
          <v-spacer />
        </template>
        <!-- Auth buttons -->
        <v-btn text @click="openAuthPopup" v-if="!isLogged">
          <span> Identifícate </span>
          <v-icon v-if="$vuetify.breakpoint.smAndUp" class="ml-2">
            mdi-account-circle
          </v-icon>
        </v-btn>

        <v-menu v-else>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <span>
                {{ userName }}
              </span>
              <v-icon v-if="$vuetify.breakpoint.smAndUp">
                mdi-account-circle
              </v-icon>
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

        <v-btn text @click="goToRoute('shop.cart')" class="ml-2 mr-2">
          <v-badge
            v-if="shopingCartCounter"
            color="primary"
            :content="shopingCartCounter"
          >
            <span v-if="$vuetify.breakpoint.smAndUp"> Mi Carrito </span>
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
          <template v-else>
            <span v-if="$vuetify.breakpoint.smAndUp"> Mi Carrito </span>
            <v-icon>mdi-cart-outline</v-icon>
          </template>
        </v-btn>
      </div>

      <div class="h-3 d-flex align-center" v-if="!$vuetify.breakpoint.mdAndUp">
        <v-spacer />
        <search-product-form class="px-2" style="max-width: 50rem" />
        <v-spacer />
      </div>
    </div>

    <template v-slot:extension>
      <v-tabs centered>
        <!-- Departments -->
        <template v-if="activeTab === 'departments'">
          <v-tab
            v-for="(dep, key) in departments"
            :key="key"
            exact
            link
            :to="dep.to"
          >
            {{ dep.labelLang[appLang] }}
          </v-tab>
        </template>
        <!-- / Departments -->
        <template v-else>
          <v-tab
            v-for="(link, key) in vendorPages"
            :key="key"
            exact
            link
            :to="link.to"
          >
            {{ link.label }}
          </v-tab>
        </template>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS, VENDOR_PAGES } from "@/utils/const";
import { AppStore, UserStore, PopupStore, ShopStore } from "@/store";

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

  get vendorPages() {
    return VENDOR_PAGES;
  }

  get appLang() {
    return AppStore.lang;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  get userName() {
    return UserStore.profile.first_name;
  }

  get shopingCartCounter() {
    return ShopStore.countAll;
  }

  /**
   *
   */
  get activeTab() {
    return this.$route.path.includes("vendor") ? "vendor" : "departments";
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

  /**
   *
   */
  goToRoute(_name: string) {
    if (this.$route.name !== _name) {
      this.$router.push({ name: _name });
    }
  }

  /**
   *
   */
  logout() {
    UserStore.logout();
  }
}
</script>