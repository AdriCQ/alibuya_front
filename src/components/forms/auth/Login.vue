<template>
  <v-form>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row :no-gutters="vertical">
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="form.email"
            :error-messages="emailErrors"
            label="Email*"
            color="black"
            width="10"
            dense
            outlined
            @change="$v.form.email.$touch()"
          />
        </v-col>

        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            v-model="form.password"
            :error-messages="passwordErrors"
            :type="passwordType"
            label="Contraseña*"
            color="black"
            dense
            outlined
            @change="$v.form.password.$touch()"
          />
          <!-- Toggle show password -->

          <v-switch v-model="showPassword" class="no-hint">
            <template v-slot:label>
              <span class="black--text">Mostrar contraseña. </span>
            </template>
          </v-switch>

          <!-- / Toggle show password -->
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
              @click="
                $router.push({ name: 'auth.register', query: $route.query })
              "
            >
              No tengo Usuario
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="btn-primary-alpha-gradient"
              color="primaryAlpha"
              type="submit"
              block
              @click.prevent="login"
            >
              Entrar
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
  async login() {
    this.$v.form.$touch();
    if (!this.$v.form.$invalid) {
      this.$emit("loading:update", true);
      try {
        await UserStore.login(this.form);
        PopupStore.addNotification(
          [
            `Bienvenido ${UserStore.profile.first_name} ${UserStore.profile.last_name}`,
          ],
          "success"
        );
        UserStore.storeOnLocalStorage();
        this.redirect();
      } catch (error) {
        PopupStore.addNotification(error);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>