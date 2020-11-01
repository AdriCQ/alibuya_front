<template>
  <v-snackbar
    app
    :value="snackbarActive"
    color="primary"
    light
    bottom
    width="100%"
    timeout="-1"
  >
    <p>Éste sitio utiliza cookies para mejorar su experiencia de usuario.</p>
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="updateCookieStatus(true)">
        <!-- <span class="mr-1">Aceptar</span> -->
        <v-icon>mdi-checkbox-marked</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store";

@Component
export default class CookiePopup extends Vue {
  active = true;

  get snackbarActive() {
    return this.active && this.cookieStatusActive;
  }

  get cookieStatusActive() {
    return !AppStore.cookieAcceted;
  }

  updateCookieStatus(_input: boolean) {
    AppStore.cookieAcceted = _input;
    AppStore.storeOnLocalStorage();
  }
}
</script>