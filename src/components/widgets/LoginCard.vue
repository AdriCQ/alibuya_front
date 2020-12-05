<template>
  <div>
    <v-card>
      <v-card-title>
        Inicia sesión para vivir tu mejor experiencia
      </v-card-title>
      <v-card-text>
        <v-btn
          color="primaryAlpha"
          block
          class="btn-primary-alpha-gradient text-transform-none mb-2"
          @click="$router.push({ name: 'auth.login' })"
        >
          Iniciar Sesión
        </v-btn>
        <span
          class="blue--text text--darken-2 cursor-pointer text-body-1"
          @click="$router.push({ name: 'auth.register' })"
          >Registrar cuenta</span
        >
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