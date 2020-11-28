<template>
  <v-form>
    <v-card-title>
      <span class="headline">Registro de usuario</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row :no-gutters="vertical">
        <!-- First Name -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="registerForm.first_name"
            :error-messages="firstNameErrors"
            color="black"
            label="Nombre"
            outlined
            dense
            @change="$v.registerForm.first_name.$touch()"
          />
        </v-col>

        <!-- Last Name -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="registerForm.last_name"
            :error-messages="lastNameErrors"
            color="black"
            label="Apellidos"
            outlined
            dense
            @change="$v.registerForm.last_name.$touch()"
          />
        </v-col>
        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            v-model="registerForm.email"
            :error-messages="emailErrors"
            color="black"
            label="Email*"
            outlined
            dense
            @change="$v.registerForm.email.$touch()"
          />
        </v-col>
        <!-- Password -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="registerForm.password"
            :error-messages="passwordErrors"
            color="black"
            label="Contraseña*"
            :type="passwordType"
            outlined
            dense
            @change="$v.registerForm.password.$touch()"
          />
        </v-col>
        <!-- Password Confirmation -->
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="registerForm.password_confirmation"
            :error-messages="passwordConfirmationErrors"
            color="black"
            label="Confirmar Contraseña*"
            :type="passwordType"
            outlined
            dense
            @change="$v.registerForm.password_confirmation.$touch()"
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="mb-2">
          <v-switch v-model="showPasswords" dense class="no-hint">
            <template v-slot:label>
              <span class="black--text">Mostrar contraseña. </span>
            </template>
          </v-switch>
        </v-col>

        <!-- Check Licence Agree -->
        <v-col cols="12">
          <v-checkbox
            v-model="licenceAgree"
            :error-messages="licenceAgreeErrors"
            dense
          >
            <template v-slot:label>
              <span class="black--text">Acepto los </span>
              <router-link
                class="ml-1 cursor-pointer"
                :to="{ name: 'main.home' }"
                >Términos y Condiciones</router-link
              >
            </template>
          </v-checkbox>
        </v-col>
      </v-row>

      <!-- Actions -->
      <v-card-actions class="px-0">
        <v-row>
          <v-col>
            <v-btn
              text
              block
              class="btn-primary-betha-gradient"
              @click="$router.push({ name: 'auth.login' })"
            >
              Ya tengo usuario</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              color="primaryAlpha"
              class="btn-primary-alpha-gradient"
              type="submit"
              block
              @click.prevent="register"
            >
              Registrar
            </v-btn>
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
    registerForm: {
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
    licenceAgree: {
      check: (_value) => _value,
    },
    form: ["registerForm", "licenceAgree"],
  },
})
export default class RegisterForm extends Vue {
  @Prop({ type: Boolean, default: false }) vertical!: boolean;

  registerForm: IRegisterParams = {
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  };

  showPasswords = false;
  licenceAgree = false;

  /**
   *
   */
  get passwordType() {
    return this.showPasswords ? "text" : "password";
  }

  // error messages in inputs validations
  get firstNameErrors() {
    const errors: string[] = [];
    if (!this.$v.registerForm.first_name?.$dirty) return errors;
    if (!this.$v.registerForm.first_name.required)
      errors.push(`Nombre es requerido.`);
    return errors;
  }

  get emailErrors() {
    const errors: string[] = [];
    if (!this.$v.registerForm.email?.$dirty) return errors;
    if (!this.$v.registerForm.email?.required)
      errors.push("Email es requerido.");
    if (!this.$v.registerForm.email?.email) errors.push("Email inválido.");
    return errors;
  }

  get lastNameErrors() {
    const errors: string[] = [];
    if (!this.$v.registerForm.last_name?.$dirty) return errors;
    if (!this.$v.registerForm.last_name.required)
      errors.push(`Apellidos es requerido.`);
    return errors;
  }

  get passwordErrors() {
    const errors: string[] = [];
    if (!this.$v.registerForm.password?.$dirty) return errors;
    if (!this.$v.registerForm.password.required)
      errors.push("Contraseña es requerido.");
    if (!this.$v.registerForm.password.minLength)
      errors.push(
        `Contraseña debe tener al menos ${this.$v.registerForm.password.$params.minLength.min} caracteres.`
      );
    if (!this.$v.registerForm.password.noWhiteSpaces)
      errors.push("Contraseña no debe contener espacios en blanco.");
    return errors;
  }

  get passwordConfirmationErrors() {
    const errors: string[] = [];
    if (!this.$v.registerForm.password_confirmation?.$dirty) return errors;
    if (!this.$v.registerForm.password_confirmation.required)
      errors.push("Confirmar contraseña es requerido.");
    if (!this.$v.registerForm.password_confirmation.sameAsPassword)
      errors.push("Contraseñas deben ser idénticas.");
    return errors;
  }

  get licenceAgreeErrors() {
    const errors: string[] = [];
    if (!this.$v.licenceAgree.$dirty) return errors;
    if (!this.$v.licenceAgree.check) errors.push("Debes aceptar la licencia.");
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
      this.$router.back();
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
        await UserStore.register(this.registerForm);
        PopupStore.addNotification(
          [
            `Bienvenido ${UserStore.profile.first_name} ${UserStore.profile.last_name}`,
          ],

          "info"
        );

        UserStore.storeOnLocalStorage();
        this.redirect();
      } catch (err) {
        PopupStore.addNotification(err);
      }
      this.$emit("loading:update", false);
    }
  }

  terms() {
    console.log("terms");
  }
}
</script>