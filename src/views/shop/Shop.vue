<template>
  <div id="shop-view" class="view-container">
    <v-section>
      <v-container>
        <v-card flat>
          <v-card-title>Todos los departamentos</v-card-title>
          <v-card-text>
            <v-row justify="space-between">
              <v-col cols="3" v-for="(dep, key) in departments" :key="key">
                <v-card flat class="cursor-pointer" width="12rem" :to="dep.to">
                  <div class="text-center">
                    <v-sheet color="secondaryBetha" class="pa-8">
                      <v-icon x-large color="primary">{{ dep.icon }}</v-icon>
                    </v-sheet>
                  </div>
                  <v-card-text class="text-center title">{{
                    dep.labelLang.es
                  }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils";

@Component
export default class ShopHome extends Vue {
  get departments() {
    return DEPARTMENTS;
  }
}
</script>