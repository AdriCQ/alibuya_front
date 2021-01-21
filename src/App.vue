<template>
  <v-app style="min-width: 256px">
    <!-- Global Popups -->
    <popup-notification />
    <!-- / Global Popups -->

    <router-view />
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore, AppStore, ShopStore, AnnouncementStore } from "@/store";

// excecuted this before pre-route guards
UserStore.getFromLocalStorage();

@Component({
  components: {
    "popup-notification": () =>
      import("@/components/popups/NotificationPopup.vue"),
  },
})
export default class App extends Vue {
  created() {
    this.getAsyncData();
    AppStore.getFromLocalStorage();
  }

  async getAsyncData() {
    try {
      await ShopStore.startup();
      await AnnouncementStore.startup();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>