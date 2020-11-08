<template>
  <div id="account-view">
    <v-section class="pt-2">
      <v-card>
        <v-card-title>
          <v-tabs v-model="tabActive" @change="tabsChange($event)">
            <v-tab v-for="(tab, key) in tabs" :key="`account-tab-${key}`">
              {{ tab }}
            </v-tab>
            <v-tabs-slider color="primary" />
          </v-tabs>
        </v-card-title>

        <v-tabs-items v-model="tabActive">
          <v-tab-item
            v-for="(component, key) in components"
            :key="`account-tab-items-${key}`"
          >
            <div class="px-2 px-md-4 px-lg-5">
              <v-container>
                <keep-alive>
                  <component
                    :is="component"
                    @change:component="change(key, $event)"
                /></keep-alive>
              </v-container>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "account-details": () =>
      import("@/components/parts/setting/AccountDetails.vue"),
    "account-edit": () => import("@/components/forms/setting/AccountEdit.vue"),
    "account-contacts": () =>
      import("@/components/parts/setting/AccountContacts.vue"),
  },
})
export default class AccountView extends Vue {
  tabActive = 0;
  tabs = ["Cuenta", "Contactos"];
  components = ["account-details", "account-contacts"];

  change(_idx: number, _component: string) {
    Vue.set(this.components, _idx, _component);
  }

  tabsChange(_id: number) {
    if (this.tabs[_id] == "Cuenta") {
      Vue.set(this.components, _id, "account-details");
    }
  }
}
</script>