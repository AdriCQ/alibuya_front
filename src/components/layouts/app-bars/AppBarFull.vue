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
        <!-- Toggle Sidebar Button -->
        <v-app-bar-nav-icon v-bind="buttonSize" @click="toggleSidebarLeft">
          <v-icon :size="iconSize"> mdi-menu </v-icon>
        </v-app-bar-nav-icon>
        <!-- / Toggle Sidebar Button -->

        <!-- Logo -->
        <v-btn
          :small="!smAndUp"
          text
          @click="RouterMixin_goto({ name: 'main.home' })"
          class="px-md-1"
        >
          <v-img
            src="img/logos/logo_white_148x37.png"
            :width="smAndUp ? '7rem' : '6.5rem'"
          />
        </v-btn>
        <!-- / Logo -->

        <v-spacer />

        <template v-if="mdAndUp">
          <search-product-form style="max-width: 30rem" />
          <v-spacer />
        </template>

        <!-- Auth button -->
        <v-btn
          :small="!smAndUp"
          text
          @click="RouterMixin_saveRouteAndGoto({ name: 'auth.login' })"
          v-if="!isLogged"
        >
          <b> Identifícate </b>
        </v-btn>
        <!-- / Auth button -->

        <template v-else>
          <!-- Dropdown with link to view account and logout link -->
          <v-menu transition="scale-transition" offset-y>
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
              <v-list-item link @click="UserMixin_logout">
                <v-list-item-title> Salir </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- / Dropdown with link to view account and logout link -->

          <!-- Link to Cart -->
          <v-badge :value="cartCantProducts" offset-y="15" offset-x="15">
            <template #badge>
              {{ cartCantProducts }}
            </template>
            <v-btn
              v-bind="!smAndUp ? buttonSize : undefined"
              text
              @click="RouterMixin_goto({ name: 'shop.cart' })"
            >
              <v-img
                src="img/icons/shopping-cart/shopping-cart_168x168.png"
                alt="Shopping Cart"
                :max-width="imgCartShopSize"
              />
            </v-btn>
          </v-badge>
          <!-- / Link to Cart -->
        </template>
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
import { Component, Mixins } from "vue-property-decorator";
import { VENDOR_PAGES } from "@/utils/const";
import { AppStore, UserStore, CartStore, ShopStore } from "@/store";
import { GettersBreakpointsMixin, RouterMixin, UserMixin } from "@/mixins";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Mixins(
  RouterMixin,
  GettersBreakpointsMixin,
  UserMixin
) {
  cartClass = "";
  /**
   * Getters
   */

  /**
   * Styles
   */
  get tabsHeight() {
    return this.smAndUp ? 34 : 28;
  }

  get buttonSize() {
    return {
      width: this.smAndUp ? 40 : 33,
      height: this.smAndUp ? 40 : 33,
    };
  }

  get imgCartShopSize() {
    return this.mdAndUp ? 30 : 25;
  }

  get iconSize() {
    return this.smAndUp ? 24 : 22;
  }

  /**
   *
   */
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

  get cartCantProducts() {
    return CartStore.cantProducts;
  }

  /**
   *
   */
  get typeTabs() {
    return this.$route.path.includes("vendor") ? "vendor" : "CATEGORIES_PLUS";
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
}
</script>

<style lang="scss" scoped>
.transition {
  transition: 0.5s ease-in-out 0.4s;
}
</style>