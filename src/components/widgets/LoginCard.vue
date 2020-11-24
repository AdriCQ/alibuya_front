<template>
  <div>
    <v-card light>
      <v-card-text class="pb-0">
        <p class="text-center title black--text">
          Inicia sesión para vivir tu mejor experiencia
        </p>
      </v-card-text>
      <v-card-text class="mt-0">
        <v-btn
          block
          class="btn-primary-alpha-gradient"
          @click="openAuthPopup('login')"
        >
          Iniciar Sesión
        </v-btn>
        <p
          class="black--text pt-2 cursor-pointer"
          @click="openAuthPopup('register')"
        >
          Registrar Cuenta
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { PopupStore, UserStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoginCard extends Vue {
  get isLogged() {
    return UserStore.isLogged;
  }

  openAuthPopup(type: "register" | "login") {
    PopupStore.openAuth(type);
  }
}
</script>