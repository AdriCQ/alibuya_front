<template>
  <v-navigation-drawer dark color="primary" :value="sidebarLeft" @input="onInput" app>
    <!-- Pages -->
    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Perfil</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-earth</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lenguage</v-list-item-title>
        <v-list-item-subtitle>Español</v-list-item-subtitle>
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
import { DEPARTMENTS } from "@/utils/const";

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

  get sidebarLeft() {
    return AppStore.sidebarLeft;
  }

  onInput(input: boolean) {
    AppStore.sidebarLeft = input;
  }
}
</script>