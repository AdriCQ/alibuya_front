<template>
  <v-form>
    <v-text-field
      v-model="form.email"
      label="Su Email"
      placeholder="Dirección de Correo"
    />
    <v-text-field v-model="form.subject" label="Asunto" placeholder="Asunto" />
    <v-textarea v-model="form.message" label="Mensaje" />
  </v-form>
</template>

<script lang='ts'>
import { AuthStore } from "@/store/Auth";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ContactForm extends Vue {
  mounted() {
    this.form.email = AuthStore.profile?.email;
  }

  form = {
    email: "",
    message: "",
    subject: "",
  };
}
</script>