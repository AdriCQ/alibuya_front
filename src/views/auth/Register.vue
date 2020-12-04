<template>
  <v-card max-width="400" elevation="5" class="mx-2" :loading="loading">
    <form-register @loading:update="changeLoading" vertical />
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "form-register": () => import("@/components/forms/auth/Register.vue"),
  },
})
export default class Register extends Vue {
  loading = false;

  changeLoading(_value: boolean) {
    this.loading = _value;
  }
}
</script>