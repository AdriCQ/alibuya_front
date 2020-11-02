<template>
  <div id="account-view">
    <v-section class="pt-2">
      <v-card>
        <v-card-title>
          <v-tabs v-model="tabActive">
            <v-tab v-for="(tab, key) in tabs" :key="`account-tab-${key}`">
              {{ tab }}
            </v-tab>
            <v-tabs-slider color="primary"></v-tabs-slider>
          </v-tabs>
        </v-card-title>

        <v-tabs-items v-model="tabActive">
          <v-tab-item
            v-for="(tab, key) in tabs"
            :key="`account-tab-items-${key}`"
          >
            <v-container class="py-0">
              <keep-alive>
                <component :is="'account-form'"></component
              ></keep-alive>
            </v-container>
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
    "account-form": () => import("@/components/forms/setting/Account.vue"),
  },
})
export default class AccountView extends Vue {
  tabActive = 0;
  tabs = ["Cuenta"];
}
</script>