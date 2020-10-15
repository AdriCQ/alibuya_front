<template>
  <v-app-bar
    color="secondary"
    tag="div"
    dense
    :fixed="fixed"
    :app="app"
    style="height: 4rem; padding: 0.5rem"
    dark
  >
    <v-app-bar-nav-icon @click="toggleSidebarLeft" />
    <template>
      <span>Alibuya Logo</span>
    </template>
    <v-spacer />

    <!-- Page Links -->
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-tabs background-color="secondary" dark>
        <v-tab exact :to="{ name: 'main.home' }">Inicio</v-tab>
        <v-tab exact :to="{ name: 'shop.cart' }"
          ><v-badge content="3">Mis Pedidos</v-badge></v-tab
        >
        <v-tab>Contacto</v-tab>
        <v-tab @click="openAuthPopup">Perfil</v-tab>
      </v-tabs>
    </div>
    <!-- / Page Links -->

    <v-spacer />
    <template v-if="$vuetify.breakpoint.smAndUp">
      <!-- Lanuage -->
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-flag</v-icon>
            <span>{{ lang.toLocaleUpperCase() }}</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(lang, key) in allLang"
            :key="key"
            @click="setLang(lang.tag)"
          >
            <v-list-item-title
              ><span>{{ lang.tag.toLocaleUpperCase() }}</span
              ><v-img :src="lang.flag"></v-img
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- / Lanuage -->
      <v-btn icon @click="openAuthPopup">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <template v-if="$vuetify.breakpoint.mdAndDown">
      <v-btn icon>
        <v-badge content="1">
          <v-icon>mdi-heart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon :to="{ name: 'shop.cart' }">
        <v-badge content="3">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store/App";
import { PopupStore } from "@/store/Poups";
import { LANG } from "@/utils/const";
import { AuthStore } from "@/store/Auth";
import { TLang } from "@/types";

@Component
export default class AppBarPages extends Vue {
  mounted() {
    window.onscroll = () => {
      if (!this.app) this.onScroll();
    };
  }

  fixed = false;

  get app() {
    return AppStore.sidebarLeft;
  }

  get isLogged() {
    return AuthStore.isLogged;
  }

  get allLang() {
    return LANG;
  }

  get lang() {
    return AppStore.lang;
  }

  /**
   *
   */
  openAuthPopup() {
    PopupStore.auth = true;
  }

  /**
   *
   */
  setLang(lang: TLang) {
    AppStore.lang = lang;
  }
  /**
   *
   */
  onScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  }
  /**
   *
   */
  toggleSidebarLeft() {
    AppStore.sidebarLeft = !AppStore.sidebarLeft;
  }
}
</script>