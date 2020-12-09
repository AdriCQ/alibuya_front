<template>
  <v-card v-bind="props">
    <v-card-title> Inicia sesión para vivir tu mejor experiencia </v-card-title>
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
        class="text-link text-body-1"
        @click="$router.push({ name: 'auth.register' })"
        >Registrar cuenta</span
      >
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class LoginCard extends Vue {
  @Prop(Object) readonly props!: object;
}
</script>