<template>
  <v-app style="min-width: 256px">
    <router-view />
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore, AppStore, ShopStore } from "@/store";

@Component
export default class App extends Vue {
  created() {
    this.getAsyncData();

    AppStore.getFromLocalStorage();
    UserStore.getFromLocalStorage();
  }

  async getAsyncData() {
    try {
      await ShopStore.getSuggestedProducts();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>