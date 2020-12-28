<template>
  <v-alert id="email-verification" type="info"
    >Le hemos enviado un email de confirmación a {{ userEmail }}. Por favor
    verifíquelo antes de continuar.</v-alert
  >
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore } from "@/store";

@Component
export default class EmailVerification extends Vue {
  get userEmail() {
    return UserStore.profile.email;
  }
}
</script>