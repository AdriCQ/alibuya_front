<template>
  <v-form>
    <v-card-title>
      <span class="title">Cambiar Contraseña</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <p>{{ this.form.email }}</p>

      <v-row :no-gutters="vertical">
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
              @click.prevent="resetPassword"
            >
              Cambiar
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
        </v-row>
      </v-card-actions>
      <!-- / Actions -->
    </v-card-text>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

// vuelidate
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { UserStore, PopupStore } from "@/store";
import { IResetPasswordParams } from "@/types";

@Component({
  validations: {
    form: {
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
export default class ResetPasswordForm extends Vue {
  mounted() {
    console.log("QUery", this.$route.query);
    if (this.$route.query.email)
      this.form.email = this.$route.query.email as string;
    if (this.$route.query.token)
      this.form.token = this.$route.query.token as string;
  }

  @Prop({ type: Boolean, default: false }) vertical!: boolean;

  showPasswords = false;

  form: IResetPasswordParams = {
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  };

  get formExtraData() {
    console.log("Query", this.$route.query);
    if (this.$route.query.email)
      this.form.email = this.$route.query.email as string;
    if (this.$route.query.token)
      this.form.token = this.$route.query.token as string;
    return {
      email: this.form.email,
      token: this.form.token,
    };
  }

  /**
   *
   */
  get passwordType() {
    return this.showPasswords ? "text" : "password";
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

  async resetPassword() {
    this.$v.form.$touch();
    if (!this.$v.form.$invalid) {
      this.$emit("loading:update", true);
      try {
        await UserStore.resetPasword(this.form);
        PopupStore.addNotification(
          [`Contraseña cambiada correctamente`],

          "info"
        );

        UserStore.storeOnLocalStorage();
        // this.redirect();
        this.$emit("redirect", this.$route.name);
      } catch (error) {
        PopupStore.addNotification(error);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>