<template>
  <v-app-bar tag="div" dense color="primary" dark>
    <!-- Social -->
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
    </template>
    <v-spacer></v-spacer>

    <!-- Social -->
    <v-divider vertical />

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
    <v-divider vertical />

    <!-- Accounts -->
    <template v-if="isLogged">
      <v-btn text>
        <v-icon>mdi-account-circle</v-icon>
        <span class="ml-1" v-if="$vuetify.breakpoint.smAndUp">Perfil</span>
      </v-btn>
    </template>
    <template v-else>
      <v-btn text @click="openRegisterPopup">
        <v-icon>mdi-account-plus</v-icon>
        <span class="ml-1" v-if="$vuetify.breakpoint.smAndUp">Registro</span>
      </v-btn>
      <v-btn text @click="openLoginPopup">
        <v-icon>mdi-account-arrow-right</v-icon>
        <span class="ml-1" v-if="$vuetify.breakpoint.smAndUp">Login</span>
      </v-btn>
    </template>
    <!-- / Accounts -->
    <v-spacer v-if="!$vuetify.breakpoint.smAndUp"></v-spacer>
  </v-app-bar>
</template>

<script lang='ts'>
import { AppStore } from "@/store/App";
import { PopupStore } from "@/store/Poups";
import { LANG } from "@/utils/const";
import { Vue, Component } from "vue-property-decorator";
import { TLang } from "@/types";
import { AuthStore } from "@/store/Auth";

@Component
export default class AppBarSocial extends Vue {
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
  openRegisterPopup() {
    PopupStore.auth.register = true;
  }
  /**
   *
   */
  openLoginPopup() {
    PopupStore.auth.login = true;
  }
  /**
   *
   */
  setLang(lang: TLang) {
    AppStore.lang = lang;
  }
}
</script>