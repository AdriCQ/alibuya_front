<template>
  <v-navigation-drawer
    :value="sidebarLeft"
    @input="onInput"
    app
    :hide-overlay="false"
  >
    <!-- Pages -->
    <v-list nav dense>
      <v-list-item @click="openAuthPopup">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="font-weight-bold"
          >Hola, Identifícate</v-list-item-title
        >
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

      <!-- DEPARTMENTS -->
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          DEPARTAMENTOS
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="(link, dKey) in departments"
        :key="`dep-${dKey}`"
        link
      >
        <!-- <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon> -->
        <v-list-item-title>{{ link.label }} </v-list-item-title>
      </v-list-item>
      <!-- / DEPARTMENTS -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store/App";
import { ILinkIconLabel } from "@/types";
import { DEPARTMENTS, LANG } from "@/utils/const";
import { AuthStore } from "@/store/Auth";
import { PopupStore } from "@/store/Poups";

@Component
export default class AppSidebarLeft extends Vue {
  created() {
    for (const key in DEPARTMENTS) {
      this.departments.push({
        icon: DEPARTMENTS[key as keyof typeof DEPARTMENTS].icon,
        // TODO: Remove TS IGNORE
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        label: DEPARTMENTS[key as keyof typeof DEPARTMENTS].label[this.appLang],
      });
    }
  }

  departments: ILinkIconLabel[] = [];

  pages: ILinkIconLabel[] = [
    {
      icon: "mdi-home",
      label: "Inicio",
      to: {
        name: "main.home",
      },
    },
    {
      icon: "mdi-account-circle",
      label: "Cuenta",
    },
    {
      icon: "mdi-account-circle",
      label: "Pedidos",
      to: { name: "shop.cart" },
    },
    {
      icon: "mdi-account-circle",
      label: "Comprar de nuevo",
    },
    {
      icon: "mdi-account-circle",
      label: "Listas",
    },
    {
      icon: "mdi-account-circle",
      label: "Atención al Cliente",
      to: { name: "main.contact" },
    },
  ];

  get appLang() {
    return AppStore.lang;
  }

  get isLogged() {
    return AuthStore.isLogged;
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

  /**
   *
   */
  openAuthPopup() {
    PopupStore.openAuth("login");
  }
}
</script>