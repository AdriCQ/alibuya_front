<template>
  <div id="shop-view">
    <v-section>
      <v-container>
        <v-card>
          <v-card-title>Departamento de {{ departmentName }}</v-card-title>
        </v-card>
      </v-container>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store";

@Component
export default class ShopHome extends Vue {
  get departmentName(): string {
    if (!this.tag) this.$router.push({ name: "main.home" });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return DEPARTMENTS[this.tag].labelLang[this.appLang];
  }

  get tag() {
    return this.$route.params.tag;
  }

  get appLang() {
    return AppStore.lang;
  }
}
</script>