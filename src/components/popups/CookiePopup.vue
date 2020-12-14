<template>
  <v-bottom-sheet :value="show" persistent hide-overlay fixed dark>
    <!-- TODO: Fix Cookies bar moves on mobile -->
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
              :block="!smAndUp"
              class="btn-primary-alpha-gradient"
              @click="updateCookieStatus(true)"
              >Aceptar</v-btn
            >
            <v-btn
              class="btn-primary-betha-gradient"
              :block="!smAndUp"
              @click="close"
              >Cancelar</v-btn
            >
          </v-container>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-bottom-sheet>
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
