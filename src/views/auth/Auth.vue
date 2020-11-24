<template>
  <v-card max-width="450" elevation="10" :loading="loading">
    <keep-alive>
      <component
        :is="component"
        @toggle="changeComponent"
        @loading:update="changeLoading"
        vertical
      />
    </keep-alive>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { UserStore } from "@/store";

@Component({
  components: {
    "form-login": () => import("@/components/forms/auth/Login.vue"),
    "form-register": () => import("@/components/forms/auth/Register.vue"),
  },

  // guard when change component
  beforeRouteUpdate(to, from, next) {
    if (UserStore.isLogged) next({ name: "main.home" });
    else next();
  },
})
export default class Login extends Vue {
  loading = false;
  component: "form-register" | "form-login" = "form-login";

  get isLogged() {
    return UserStore.isLogged;
  }

  changeComponent() {
    this.component =
      this.component === "form-login" ? "form-register" : "form-login";
  }

  changeLoading(_value: boolean) {
    this.loading = _value;
  }
}
</script>