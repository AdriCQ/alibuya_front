<template>
  <v-navigation-drawer
    :value="sidebarLeft"
    @input="onInput"
    app
    :hide-overlay="false"
  >
    <!-- Pages -->
    <v-list nav dense>
      <v-list-item @click="openProfile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="font-weight-bold">
          Hola,
          <span v-if="!userName">Identifícate</span>
          <span else>{{ userName }}</span>
        </v-list-item-title>
      </v-list-item>

      <v-divider />

      <!-- Pages -->
      <v-list-item v-for="(link, key) in pages" :key="key" link :to="link.to">
        <!-- <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon> -->
        <v-list-item-title>{{ link.label }} </v-list-item-title>
      </v-list-item>
      <!-- / Pages -->

      <v-divider />

      <!-- CATEGORIES_PLUS -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          DEPARTAMENTOS
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="(link, dKey) in CATEGORIES_PLUS"
        :key="`dep-${dKey}`"
        link
        :to="link.to"
      >
        <!-- <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon> -->
        <v-list-item-title>{{ link.label }} </v-list-item-title>
      </v-list-item>
      <!-- / CATEGORIES_PLUS -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/ban-ts-ignore */

import { Vue, Component } from "vue-property-decorator";
import { AppStore, UserStore } from "@/store";
import { ILinkIconLabel } from "@/types";
import { CATEGORIES_PLUS, LANG, WEB_PAGES } from "@/utils";

@Component
export default class AppSidebarLeft extends Vue {
  created() {
    for (const key in CATEGORIES_PLUS) {
      this.CATEGORIES_PLUS.push({
        // @ts-ignore
        icon: CATEGORIES_PLUS[key].icon,
        // @ts-ignore
        label: CATEGORIES_PLUS[key].labelLang[this.appLang],
        // @ts-ignore
        to: CATEGORIES_PLUS[key as keyof typeof CATEGORIES_PLUS].to,
      });
    }
  }

  CATEGORIES_PLUS: ILinkIconLabel[] = [];

  get pages() {
    return WEB_PAGES;
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

  get allLang() {
    return LANG;
  }

  get sidebarLeft() {
    return AppStore.sidebarLeft;
  }

  get langLabel() {
    let label = "";
    this.allLang.forEach((langIterator) => {
      if (langIterator.tag === this.appLang) {
        label = langIterator.label;
      }
    });
    return label;
  }

  onInput(input: boolean) {
    AppStore.sidebarLeft = input;
  }

  openProfile() {
    if (this.isLogged) {
      if (this.$route.name !== "settings.account") {
        this.$router.push({
          name: "settings.account",
        });
      }
    } else {
      this.$router.push({ name: "auth.login" });
    }
  }
}
</script>