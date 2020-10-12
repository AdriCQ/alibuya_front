<template>
  <v-app-bar
    color="primary"
    tag="div"
    dense
    :fixed="fixed"
    :app="app"
    style="height: 4rem; padding: 0.5rem"
    dark
  >
    <v-app-bar-nav-icon @click="toggleSidebarLeft" />
    <v-spacer></v-spacer>

    <!-- Page Links -->
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-tabs background-color="primary" dark>
        <v-tab>Inicio</v-tab>
        <v-tab>Tienda</v-tab>
        <v-tab>Contacto</v-tab>
      </v-tabs>
    </div>
    <!-- / Page Links -->
    <v-spacer></v-spacer>
    <div>
      <v-btn icon color="white">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon color="white">
        <v-badge color="green" content="6">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store/App";

@Component
export default class AppBarPages extends Vue {
  mounted() {
    window.onscroll = () => {
      this.onScroll();
    };
  }

  fixed = false;

  get app() {
    return AppStore.sidebarLeft;
  }

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

  toggleSidebarLeft() {
    AppStore.sidebarLeft = !AppStore.sidebarLeft;
  }
}
</script>