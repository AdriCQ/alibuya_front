<template>
  <v-form>
    <v-text-field label="Su Email" placeholder="Dirección de Correo" />
    <v-text-field label="Asunto" placeholder="Asunto" />
    <v-textarea label="Mensaje" />
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ContactForm extends Vue {}
</script>