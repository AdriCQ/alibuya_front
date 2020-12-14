<template>
  <v-form>
    <v-alert color="info" v-if="showAlert">
      <p class="white--text">
        Le hemos enviado un email a {{ form.email }} para reiniciar su
        contraseña
      </p>
    </v-alert>
    <template v-else>
      <v-card-title>
        <span class="title">Recuperar Contraseña</span>
      </v-card-title>

      <v-card-text class="pb-0">
        <p>Escriba el email que utilizó para registrar su cuenta</p>

        <v-row :no-gutters="vertical">
          <v-col cols="12" :sm="vertical ? 12 : 6">
            <v-text-field
              v-model="form.email"
              :error-messages="emailErrors"
              label="Email*"
              color="black"
              dense
              outlined
              @change="$v.form.email.$touch()"
            />
          </v-col>
        </v-row>

        <!-- Actions -->
        <v-card-actions class="px-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                color="primaryAlpha"
                type="submit"
                block
                class="text-transform-none btn-primary-alpha-gradient"
                @click.prevent="forgotPassword"
              >
                Continuar
              </v-btn>
            </v-col>

            <v-col cols="6" class="mt-3">
              <span
                class="text-link text-body-2"
                @click="
                  $router.push({ name: 'auth.register', query: $route.query })
                "
              >
                No tengo usuario</span
              >
            </v-col>
            <v-col cols="6" class="mt-3 text-rigth">
              <span
                class="text-link text-body-2"
                @click="
                  $router.push({
                    name: 'auth.login',
                    query: $route.query,
                  })
                "
              >
                Iniciar Sesión</span
              >
            </v-col>
          </v-row>
        </v-card-actions>
        <!-- / Actions -->
      </v-card-text>
    </template>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

// vuelidate
import { required, email } from "vuelidate/lib/validators";
import { UserStore, PopupStore } from "@/store";

@Component({
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
})
export default class ForgotPasswordForm extends Vue {
  @Prop({ type: Boolean, default: false }) vertical!: boolean;

  showPassword = false;
  showAlert = false;

  form = {
    email: "",
  };

  // error messages in inputs validations
  get emailErrors() {
    const errors: string[] = [];
    if (!this.$v.form.email?.$dirty) return errors;
    if (!this.$v.form.email?.required) errors.push("Email es requerido.");
    if (!this.$v.form.email?.email) errors.push("Email inválido.");
    return errors;
  }

  async forgotPassword() {
    this.$v.form.$touch();
    if (!this.$v.form.$invalid) {
      this.$emit("loading:update", true);
      try {
        await UserStore.requestResetPasswordEmail(this.form.email);
        // PopupStore.addNotification(
        //   [
        //     `Le hemos enviado un email a ${this.form.email} para reiniciar su contraseña`,
        //   ],
        //   "info"
        // );
        this.showAlert = true;
      } catch (error) {
        PopupStore.addNotification(error);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>