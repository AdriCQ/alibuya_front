<template>
  <v-card max-width="400" elevation="5" class="mx-2" :loading="loading">
    <component
      :is="activeComponent"
      @loading:update="changeLoading"
      vertical
      @redirect="redirect"
    />
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore } from "@/store";

@Component({
  components: {
    "email-verification": () =>
      import("@/components/forms/auth/EmailVerification.vue"),
    "forgot-password": () =>
      import("@/components/forms/auth/ForgotPassword.vue"),
    "login-form": () => import("@/components/forms/auth/Login.vue"),
    "register-form": () => import("@/components/forms/auth/Register.vue"),
    "reset-password": () => import("@/components/forms/auth/ResetPassword.vue"),
  },
})
export default class AuthView extends Vue {
  loading = false;

  get activeComponent():
    | "email-verification"
    | "login-form"
    | "register-form"
    | "forgot-password"
    | "reset-password" {
    switch (this.$route.name) {
      case "auth.register":
        return "register-form";
      case "auth.forgot_password":
        return "forgot-password";
      case "auth.reset_password":
        return "reset-password";
      case "auth.email_verification":
        return "email-verification";
      default:
        return "login-form";
    }
  }

  changeLoading(_value: boolean) {
    this.loading = _value;
  }

  redirect(_route: string) {
    if (_route) {
      this.$router.push({
        name: _route,
      });
    } else {
      if (UserStore.redirect) {
        this.$router.push({
          name: UserStore.redirect.name as string,
          query: UserStore.redirect.query,
        });
      } else {
        this.$router.push({
          name: "main.home",
        });
      }
    }
  }
}
</script>