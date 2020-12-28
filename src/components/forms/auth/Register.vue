<template>
  <v-form>
    <v-card-title>
      <span class="title">Registro de usuario</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row>
        <!-- First Name -->
        <v-col cols="12" :sm="vertical ? 6 : 6" class="py-0">
          <v-text-field
            v-model="form.first_name"
            :error-messages="firstNameErrors"
            label="Nombre"
            outlined
            dense
            color="black"
            @change="$v.form.first_name.$touch()"
          />
        </v-col>

        <!-- Last Name -->
        <v-col cols="12" :sm="vertical ? 6 : 6" class="py-0">
          <v-text-field
            v-model="form.last_name"
            :error-messages="lastNameErrors"
            label="Apellidos"
            outlined
            dense
            color="black"
            @change="$v.form.last_name.$touch()"
          />
        </v-col>
      </v-row>

      <v-row :no-gutters="vertical">
        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            :error-messages="emailErrors"
            label="Email*"
            outlined
            dense
            color="black"
            @change="$v.form.email.$touch()"
          />
        </v-col>
        <!-- Password -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="form.password"
            :error-messages="passwordErrors"
            label="Contraseña*"
            :type="passwordType"
            outlined
            dense
            color="black"
            @change="$v.form.password.$touch()"
          />
        </v-col>

        <!-- Password Confirmation -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="form.password_confirmation"
            :error-messages="passwordConfirmationErrors"
            label="Confirmar Contraseña*"
            :type="passwordType"
            outlined
            dense
            color="black"
            @change="$v.form.password_confirmation.$touch()"
          />

          <!-- Toggle show password -->
          <v-checkbox
            on-icon="mdi-check-circle"
            off-icon="mdi-circle-outline"
            v-model="showPasswords"
            dense
            color="black"
            class="no-hint"
          >
            <template v-slot:label>
              <span class="black--text text-body-2">Mostrar contraseñas </span>
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
              @click.prevent="register"
            >
              Registrar
            </v-btn>
          </v-col>

          <v-col cols="auto" class="mt-3 text-body-2">
            Al registrarse usted acepta nuestros
            <span class="text-link" @click="showTerms">
              términos y condiciones</span
            >.
          </v-col>

          <v-col cols="6" class="mt-3">
            <span
              class="text-link text-body-2"
              @click="$router.push({ name: 'auth.login', query: $route.query })"
            >
              Ya tengo Usuario</span
            >
          </v-col>
          <v-col cols="6" class="mt-3 text-rigth">
            <span
              class="text-link text-body-2"
              @click="
                $router.push({
                  name: 'auth.forgot_password',
                  query: $route.query,
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
import { IRegisterParams } from "@/types";
// store
import { UserStore, PopupStore } from "@/store";
// vuelidate
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

@Component({
  validations: {
    form: {
      first_name: { required },
      email: { required, email },
      last_name: { required },
      password: {
        required,
        minLength: minLength(6),
        noWhiteSpaces: (_value) => _value.indexOf(" ") == -1,
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
})
export default class RegisterForm extends Vue {
  @Prop({ type: Boolean, default: false }) vertical!: boolean;

  form: IRegisterParams = {
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  };

  showPasswords = false;

  /**
   *
   */
  get passwordType() {
    return this.showPasswords ? "text" : "password";
  }

  // error messages in inputs validations
  get firstNameErrors() {
    const errors: string[] = [];
    if (!this.$v.form.first_name?.$dirty) return errors;
    if (!this.$v.form.first_name.required) errors.push(`Nombre es requerido.`);
    return errors;
  }

  get emailErrors() {
    const errors: string[] = [];
    if (!this.$v.form.email?.$dirty) return errors;
    if (!this.$v.form.email?.required) errors.push("Email es requerido.");
    if (!this.$v.form.email?.email) errors.push("Email inválido.");
    return errors;
  }

  get lastNameErrors() {
    const errors: string[] = [];
    if (!this.$v.form.last_name?.$dirty) return errors;
    if (!this.$v.form.last_name.required)
      errors.push(`Apellidos es requerido.`);
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

  get passwordConfirmationErrors() {
    const errors: string[] = [];
    if (!this.$v.form.password_confirmation?.$dirty) return errors;
    if (!this.$v.form.password_confirmation.required)
      errors.push("Confirmar contraseña es requerido.");
    if (!this.$v.form.password_confirmation.sameAsPassword)
      errors.push("Contraseñas deben ser idénticas.");
    return errors;
  }

  /**
   *
   */
  redirect() {
    const name = this.$route.query.redirect;
    if (name != null) {
      this.$router.push({ name: name as string });
    } else {
      // if (this.$route.name !== "auth.register") this.$router.back();
      this.$router.push("main.home");
    }
  }

  /**
   *
   */
  async register() {
    this.$v.form.$touch();
    if (!this.$v.form.$invalid) {
      this.$emit("loading:update", true);

      try {
        await UserStore.register(this.form);
        UserStore.storeOnLocalStorage();
        this.$emit("redirect", "auth.email_verification");
      } catch (err) {
        PopupStore.addNotification(err);
      }
      this.$emit("loading:update", false);
    } else {
      console.log("Invalid Form");
    }
  }

  showTerms() {
    console.log("terms");
  }
}
</script>