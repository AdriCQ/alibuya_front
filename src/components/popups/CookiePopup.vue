<template>
  <v-bottom-sheet :value="show" persistent hide-overlay>
    <v-card>
      <v-container>
        <v-card-title class="font-weight-bold subtitle-1">
          <div>Selecciona Tus Preferencias de Cookies</div>
        </v-card-title>

        <v-card-text>
          Utilizamos cookies y herramientas similares para mejorar tu
          experiencia de compra, prestar nuestros servicios, entender cómo los
          utilizas para poder mejorarlos, y para mostrarte anuncios.
        </v-card-text>

        <v-card-actions>
          <v-container class="pt-0 text-sm-center">
            <v-btn
              color="primary"
              class="mb-2 mb-sm-0 mr-sm-2"
              :block="!smAndUp"
              small
              @click="updateCookieStatus(true)"
              >Aceptar</v-btn
            >
            <v-btn
              color="primary"
              outlined
              :block="!smAndUp"
              small
              @click="close"
              >Cancelar</v-btn
            >
          </v-container>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-bottom-sheet>

  <!--
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
        <v-icon>mdi-checkbox-marked</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
  -->
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { AppStore } from "@/store";

@Component
export default class CookiePopup extends Vue {
  active = true;

  get show() {
    return this.active && this.cookieStatusActive;
  }

  get cookieStatusActive() {
    return !AppStore.cookieAcceted;
  }

  get smAndUp() {
    return this.$vuetify.breakpoint.smAndUp;
  }

  close() {
    this.active = false;
  }

  updateCookieStatus(_input: boolean) {
    AppStore.cookieAcceted = _input;
    AppStore.storeOnLocalStorage();
  }
}
</script>
