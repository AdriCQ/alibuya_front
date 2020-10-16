<template>
  <v-app-bar
    :absolute="!$vuetify.breakpoint.lgAndUp"
    :app="$vuetify.breakpoint.lgAndUp"
    color="secondary"
    dark
    shrink-on-scroll
    height="auto"
  >
    <div class="d-block" style="width: 100%">
      <div class="h-3 d-flex align-center">
        <v-app-bar-nav-icon @click="toggleSidebarLeft" />

        <div>ALIBUYA</div>
        <v-spacer />
        <v-btn text @click="openAuthPopup">
          Identifícate
          <v-icon class="ml-2" v-if="$vuetify.breakpoint.smAndUp"
            >mdi-account-circle</v-icon
          >
        </v-btn>
      </div>

      <div class="h-3 d-flex align-center">
        <v-spacer />
        <search-product-form style="max-width: 50rem" />
        <v-spacer />
      </div>
    </div>

    <template v-slot:extension>
      <v-tabs show-arrows centered>
        <v-tab v-for="(dep, key) in departments" :key="key">{{
          dep.label[appLang]
        }}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store/App";
import { PopupStore } from "@/store/Poups";

@Component({
  components: {
    "search-product-form": () =>
      import("@/components/forms/shop/SearchProductInline.vue"),
  },
})
export default class AppBarFull extends Vue {
  get departments() {
    return DEPARTMENTS;
  }

  get appLang() {
    return AppStore.lang;
  }

  /**
   *
   */
  toggleSidebarLeft() {
    AppStore.sidebarLeft = !AppStore.sidebarLeft;
  }

  /**
   *
   */
  openAuthPopup() {
    PopupStore.openAuth("login");
  }
}
</script>