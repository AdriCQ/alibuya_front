<template>
  <v-app-bar
    id="app-bar-full"
    :absolute="!lgAndUp"
    :app="lgAndUp"
    color="secondary"
    extension-height="auto"
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
            src="img/logos/logo_white_148x37.png"
            :width="smAndUp ? '7rem' : '6.5rem'"
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
            <!-- <b v-if="smAndUp"> Mi Carrito </b> -->
            <!-- <v-icon
              :size="iconSize"
              :class="cartClass"
              @mouseover="shakeCartIcon"
              >mdi-cart-outline</v-icon
            > -->
            <v-img
              src="img/icons/shopping-cart/shopping-cart_168x168.png"
              alt="Shopping Cart"
              width="22px"
            />
          </v-badge>
          <div v-else style="width: 22px">
            <!-- <b v-if="smAndUp"> Mi Carrito </b> -->
            <!-- <v-icon
              :size="iconSize"
              :class="cartClass"
              @mouseover="shakeCartIcon"
              >mdi-cart-outline</v-icon
            > -->
            <v-img
              src="img/icons/shopping-cart/shopping-cart_168x168.png"
              alt="Shopping Cart"
              width="100%"
            />
          </div>
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
      <v-tabs
        :height="tabsHeight"
        :show-arrows="$vuetify.breakpoint.smAndUp"
        optional
        :centered="$vuetify.breakpoint.mdAndUp"
        id="app-bar-tabs"
      >
        <!-- CATEGORIES_PLUS -->
        <template v-if="typeTabs === 'CATEGORIES_PLUS'">
          <v-tab
            v-for="(cat, key) in categories"
            :key="key"
            exact
            link
            :to="cat.to"
          >
            <span class="text-transform-none">
              {{ cat.labelLang[appLang] }}
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
import { VENDOR_PAGES } from "@/utils/const";
import { AppStore, UserStore, PackStore, ShopStore } from "@/store";
import { Dictionary } from "vue-router/types/router";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Vue {
  cartClass = "";
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

  get categories() {
    return ShopStore.categoriesLink;
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

  shakeCartIcon() {
    const shakeInterval = window.setInterval(() => {
      if (this.cartClass === "mdi-rotate-45") this.cartClass = "";
      else this.cartClass = "mdi-rotate-45";
    }, 100);
    window.setTimeout(() => {
      window.clearInterval(shakeInterval);
      this.cartClass = "";
    }, 700);
  }

  /**
   *
   */
  goToRoute(_name: string, _query: Dictionary<string> = {}) {
    if (this.$route.name !== _name && _query !== this.$route.query) {
      this.$router.push({
        name: _name,
        query: _query,
      });
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

<style lang="scss" scoped>
.transition {
  transition: 0.5s ease-in-out 0.4s;
}
</style>