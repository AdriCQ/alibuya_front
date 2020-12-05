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
      <div class="d-flex align-center mb-2">
        <v-app-bar-nav-icon v-bind="buttonSize" @click="toggleSidebarLeft">
          <v-icon :size="iconSize"> mdi-menu </v-icon>
        </v-app-bar-nav-icon>

        <v-btn :small="!smAndUp" text @click="goToRoute('main.home')">
          <v-img
            src="img/logos/logo_white_550x178.png"
            :width="smAndUp ? '8rem' : '6.5rem'"
          />
        </v-btn>

        <v-spacer />

        <template v-if="mdAndUp">
          <search-product-form style="max-width: 30rem" />
          <v-spacer />
        </template>

        <!-- Auth buttons -->
        <v-btn
          :small="!smAndUp"
          text
          @click="goToRoute('auth.login')"
          v-if="!isLogged"
        >
          <b> Identifícate </b>
        </v-btn>

        <v-menu transition="scale-transition" offset-y v-else>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="body-2">
              <b>
                {{ userName }}
              </b>
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
          :icon="!smAndUp"
          v-bind="!smAndUp ? buttonSize : undefined"
          text
          @click="goToRoute('shop.cart')"
          class="ml-2 mr-2"
        >
          <v-badge
            v-if="shopingCartCounter"
            color="primary"
            :content="shopingCartCounter"
          >
            <b v-if="smAndUp"> Mi Carrito </b>
            <v-icon :size="iconSize">mdi-cart-outline</v-icon>
          </v-badge>
          <template v-else>
            <b v-if="smAndUp"> Mi Carrito </b>
            <v-icon :size="iconSize">mdi-cart-outline</v-icon>
          </template>
        </v-btn>
      </div>

      <div class="d-flex align-center mb-2" v-if="!mdAndUp">
        <search-product-form
          class="mx-auto input-small"
          style="max-width: 50rem"
          :small="!smAndUp"
        />
      </div>
    </div>

    <template v-slot:extension>
      <v-tabs :height="tabsHeight" optional centered id="app-bar-tabs">
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
import { AppStore, UserStore, PackStore } from "@/store";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Vue {
  // states in breakpoints
  get tabsHeight() {
    return this.smAndUp ? 34 : 28;
  }

  get buttonSize() {
    return {
      width: this.smAndUp ? 40 : 33,
      height: this.smAndUp ? 40 : 33,
    };
  }

  get iconSize() {
    return this.smAndUp ? 24 : 22;
  }

  /**
   *
   */

  get CATEGORIES_PLUS() {
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
    return PackStore.packsCounter;
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