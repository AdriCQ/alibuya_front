<template>
  <v-form>
    <v-card-title>
      <span class="title">Inicio de sesión</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row :no-gutters="vertical">
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="form.email"
            color="black"
            :error-messages="emailErrors"
            label="Email*"
            dense
            outlined
            name="login_email_input"
            @change="$v.form.email.$touch()"
          />
        </v-col>

        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            color="black"
            v-model="form.password"
            :error-messages="passwordErrors"
            :type="passwordType"
            label="Contraseña*"
            dense
            outlined
            name="login_password_input"
            @change="$v.form.password.$touch()"
          />

          <!-- Toggle show password -->
          <v-checkbox
            on-icon="mdi-check-circle"
            off-icon="mdi-circle-outline"
            v-model="showPassword"
            dense
            class="no-hint"
          >
            <template v-slot:label>
              <span class="black--text text-body-2">Mostrar contraseña </span>
            </template>
          </v-checkbox>

          <!-- / Toggle show password -->
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
              @click.prevent="login"
            >
              Entrar
            </v-btn>
          </v-col>

          <v-col cols="6" class="mt-3">
            <span
              class="text-link text-body-2"
              @click="$router.push({ name: 'auth.register' })"
            >
              No tengo usuario</span
            >
          </v-col>
          <v-col cols="6" class="mt-3 text-rigth">
            <span
              class="text-link text-body-2"
              @click="
                $router.push({
                  name: 'auth.forgot_password',
                })
              "
            >
              Olvidé mi contraseña</span
            >
          </v-col>
        </v-row>
      </v-card-actions>
      <!-- / Actions -->
    </v-card-text>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
// types
import { ILoginParams } from "@/types";
// store
import { UserStore, PopupStore } from "@/store";
// vuelidate
import { required, email, minLength } from "vuelidate/lib/validators";

@Component({
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        noWhiteSpaces: (_value) => _value.indexOf(" ") == -1,
      },
    },
  },
})
export default class LoginForm extends Vue {
  @Prop({ type: Boolean, default: false }) vertical!: boolean;

  showPassword = false;

  form: ILoginParams = {
    email: "",
    password: "",
  };

  // error messages in inputs validations
  get emailErrors() {
    const errors: string[] = [];
    if (!this.$v.form.email?.$dirty) return errors;
    if (!this.$v.form.email?.required) errors.push("Email es requerido.");
    if (!this.$v.form.email?.email) errors.push("Email inválido.");
    return errors;
  }

  get passwordErrors() {
    const errors: string[] = [];
    if (!this.$v.form.password?.$dirty) return errors;
    if (!this.$v.form.password.required)
      errors.push("Contraseña es requerido.");
    if (!this.$v.form.password.minLength)
      errors.push(
        `Contraseña debe tener al menos ${this.$v.form.password.$params.minLength.min} caracteres.`
      );
    if (!this.$v.form.password.noWhiteSpaces)
      errors.push("Contraseña no debe contener espacios en blanco.");
    return errors;
  }

  /**
   *
   */
  get passwordType() {
    return this.showPassword ? "text" : "password";
  }

  /**
   *
   */
  login() {
    this.$v.form.$touch();
    if (!this.$v.form.$invalid) {
      this.$emit("loading:update", true);
      UserStore.login(this.form)
        .then(() => {
          PopupStore.addNotification(
            [
              `Bienvenido ${UserStore.profile.first_name} ${UserStore.profile.last_name}`,
            ],
            "success"
          );
          UserStore.storeOnLocalStorage();
          this.$emit("redirect");
        })
        .catch((error) => {
          PopupStore.addNotification(error);
        })
        .finally(() => {
          this.$emit("loading:update", false);
        });
    }
  }
}
</script>