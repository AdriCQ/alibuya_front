<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="form.email"
      label="Su Email"
      placeholder="Dirección de Correo"
    />
    <v-text-field v-model="form.subject" label="Asunto" placeholder="Asunto" />
    <v-textarea v-model="form.message" label="Mensaje" />
    <v-btn type="submit" color="primaryAlpha">
      <v-icon>mdi-send</v-icon>
      <span class="ml-2">Enviar</span>
    </v-btn>
  </v-form>
</template>

<script lang='ts'>
import { UserStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ContactForm extends Vue {
  mounted() {
    this.form.email = UserStore.profile?.email;
  }

  form = {
    email: "",
    message: "",
    subject: "",
  };

  get isValid() {
    return true;
  }

  submit() {
    if (this.isValid) {
      alert("Submit");
    }
  }
}
</script>