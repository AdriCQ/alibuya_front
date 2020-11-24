<template>
  <v-form @submit.prevent="register">
    <v-card>
      <v-card-title>
        <span class="headline">Registro de usuarios</span>
      </v-card-title>
      <v-card-text>
        <v-container class="py-0">
          <v-row :no-gutters="vertical">
            <v-col cols="12" :sm="vertical ? 12 : 6">
              <v-text-field
                v-model="form.first_name"
                color="black"
                label="Nombre"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" :sm="vertical ? 12 : 6">
              <v-text-field
                v-model="form.last_name"
                color="black"
                label="Apellidos"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                color="black"
                label="Email*"
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" :sm="vertical ? 12 : 6">
              <v-text-field
                v-model="form.password"
                color="black"
                label="Contraseña*"
                :type="passwordType"
                outlined
                dense
                required
              />
            </v-col>
            <v-col cols="12" :sm="vertical ? 12 : 6">
              <v-text-field
                v-model="form.password_confirmation"
                color="black"
                label="Confirmar Contraseña*"
                :type="passwordType"
                outlined
                dense
                required
              />

              <v-switch class="mt-0" v-model="showPasswords">
                <template v-slot:label>
                  <span style="font-size: 15px">Mostrar contraseña. </span>
                </template>
              </v-switch>
            </v-col>
          </v-row>
          <div class="d-flex align-center">
            <v-checkbox v-model="licenceAgree" dense />
            <!-- TODO: Terms and conditions -->
            <span class="black--text">Acepto los </span>
            <router-link
              class="ml-1 cursor-pointer"
              style="font-size: 1rem"
              :to="{ name: 'main.home' }"
              >Términos y Condiciones</router-link
            >
          </div>

          <!-- Actions -->
          <v-card-actions class="px-0">
            <v-row>
              <v-col>
                <v-btn
                  text
                  block
                  class="btn-border-black"
                  @click="$emit('toggle')"
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
                >
                  Registrar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <!-- / Actions -->
        </v-container>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IRegisterParams } from "@/types";
import { UserStore, PopupStore } from "@/store";

@Component
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
  licenceAgree = false;

  /**
   *
   */
  get passwordType() {
    return this.showPasswords ? "text" : "password";
  }
  /**
   *
   */
  get isValid() {
    return true;
  }
  /**
   *
   */
  async register() {
    if (this.isValid) {
      this.$emit("loading:update", true);

      try {
        await UserStore.register(this.form);
        PopupStore.addNotification(
          [
            `Bienvenido ${UserStore.profile.first_name} ${UserStore.profile.last_name}`,
          ],

          "info"
        );

        UserStore.storeOnLocalStorage();
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