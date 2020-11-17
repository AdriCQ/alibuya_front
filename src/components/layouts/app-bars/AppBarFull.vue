<template>
  <v-app-bar
    id="app-bar-full"
    :absolute="!lgAndUp"
    :app="lgAndUp"
    color="secondary"
    :extension-height="tabsHeight"
    height="auto"
    dark
    shrink-on-scroll
  >
    <div class="full-width">
      <div class="d-flex align-center mb-1">
        <v-app-bar-nav-icon @click="toggleSidebarLeft">
          <v-icon> mdi-menu </v-icon>
        </v-app-bar-nav-icon>

        <v-btn text @click="goToRoute('main.home')">
          <v-img src="img/logos/logo_text_white.png" width="5rem" />
        </v-btn>

        <v-spacer />

        <template v-if="mdAndUp">
          <search-product-form style="max-width: 30rem" />
          <v-spacer />
        </template>

        <!-- Auth buttons -->
        <v-btn text @click="openAuthPopup" v-if="!isLogged">
          <span> Identifícate </span>
          <v-icon v-if="smAndUp" class="ml-2"> mdi-account-circle </v-icon>
        </v-btn>

        <v-menu transition="scale-transition" offset-y v-else>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <span>
                {{ userName }}
              </span>
              <v-icon v-if="smAndUp"> mdi-account-circle </v-icon>
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

        <v-btn
          :fab="!smAndUp"
          :small="!smAndUp"
          text
          @click="goToRoute('shop.cart')"
          class="ml-2 mr-2"
        >
          <v-badge
            v-if="shopingCartCounter"
            color="primary"
            :content="shopingCartCounter"
          >
            <span v-if="smAndUp"> Mi Carrito </span>
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
          <template v-else>
            <span v-if="smAndUp"> Mi Carrito </span>
            <v-icon>mdi-cart-outline</v-icon>
          </template>
        </v-btn>
      </div>

      <div class="d-flex align-center mb-2" v-if="!mdAndUp">
        <search-product-form class="mx-auto" style="max-width: 50rem" />
      </div>
    </div>

    <template v-slot:extension>
      <v-tabs :height="tabsHeight" optional centered>
        <!-- CATEGORIES_PLUS -->
        <template v-if="typeTabs === 'CATEGORIES_PLUS'">
          <v-tab
            v-for="(dep, key) in CATEGORIES_PLUS"
            :key="key"
            exact
            link
            :to="dep.to"
          >
            <span class="text-transform-none">
              {{ dep.labelLang[appLang] }}
            </span>
          </v-tab>
        </template>
        <!-- / CATEGORIES_PLUS -->

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
import { CATEGORIES_PLUS, VENDOR_PAGES } from "@/utils/const";
import { AppStore, UserStore, PopupStore, ShopStore } from "@/store";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Vue {
  tabsHeight = 40;
  get CATEGORIES_PLUS() {
    console.log(CATEGORIES_PLUS);

    return CATEGORIES_PLUS;
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
  get typeTabs() {
    return this.$route.path.includes("vendor") ? "vendor" : "CATEGORIES_PLUS";
  }

  // breakpoints
  get smAndUp() {
    return this.$vuetify.breakpoint.smAndUp;
  }

  get mdAndUp() {
    return this.$vuetify.breakpoint.mdAndUp;
  }

  get lgAndUp() {
    return this.$vuetify.breakpoint.lgAndUp;
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