<template>
  <v-card max-width="400" elevation="5" class="mx-2" :loading="loading">
    <form-login @loading:update="changeLoading" vertical />
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "form-login": () => import("@/components/forms/auth/Login.vue"),
  },
})
export default class Login extends Vue {
  loading = false;

  changeLoading(_value: boolean) {
    this.loading = _value;
  }
}
</script>