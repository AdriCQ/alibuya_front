<template>
  <v-navigation-drawer
    dark
    color="primary"
    :value="sidebarLeft"
    @input="onInput"
    app
  >
    <!-- Pages -->
    <v-list nav dense>
      <template v-if="isLogged">
        <!-- Profile -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <!-- / Profile -->
        <!-- Logout -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-cancel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <!-- / Logout -->
      </template>
      <template v-else>
        <!-- Register -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Registro</v-list-item-title>
        </v-list-item>
        <!-- / Register -->
        <!-- Login -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <!-- / Login -->
      </template>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-earth</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lenguage</v-list-item-title>
        <v-list-item-subtitle>{{ langLabel }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <!-- / Pages -->
    <v-divider />

    <!-- Pages -->
    <v-list nav dense>
      <v-list-item>
        <v-list-item-title class="text-center">Páginas</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="(link, key) in links" :key="key" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- / Pages -->

    <v-divider />
    <!-- Departments -->
    <v-list nav dense>
      <v-list-item>
        <v-list-item-title class="text-center">Departamentos</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="(link, key) in departments" :key="key" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- / Departments -->
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store/App";
import { ILinkIconLabel } from "@/types";
import { DEPARTMENTS, LANG } from "@/utils/const";
import { AuthStore } from "@/store/Auth";

@Component
export default class AppSidebarLeft extends Vue {
  created() {
    for (const key in DEPARTMENTS) {
      this.departments.push({
        icon: DEPARTMENTS[key as keyof typeof DEPARTMENTS].icon,
        label: DEPARTMENTS[key as keyof typeof DEPARTMENTS].label[this.appLang],
      });
    }
  }
  items = [
    {
      action: "local_activity",
      title: "Attractions",
      items: [{ title: "List Item" }],
    },
  ];

  departments: ILinkIconLabel[] = [];

  links: ILinkIconLabel[] = [
    {
      to: "main.home",
      label: "Inicio",
      icon: "mdi-home",
    },
    {
      to: "main.home",
      label: "Tienda",
      icon: "mdi-basket",
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

  onInput(input: boolean) {
    AppStore.sidebarLeft = input;
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
}
</script>