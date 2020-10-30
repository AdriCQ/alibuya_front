<template>
  <v-form @submit.prevent="register">
    <v-card>
      <v-card-title>
        <span class="headline"
          ><v-icon class="mr-2">mdi-account-plus</v-icon>Registro de
          usuarios</span
        >
      </v-card-title>
      <v-card-text>
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                v-model="form.first_name"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field v-model="form.last_name" label="Apellidos" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.email" label="Email*" required />
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                v-model="form.password"
                label="Contraseña*"
                :type="passwordType"
                required
              >
                <template v-slot:append>
                  <v-icon
                    v-if="!showPassword"
                    @click="showPassword = !showPassword"
                  >
                    mdi-eye-outline
                  </v-icon>
                  <v-icon v-else @click="showPassword = !showPassword">
                    mdi-eye-off-outline
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                label="Confirmar Contraseña*"
                v-model="form.password_confirmation"
                :type="passwordConfirmatiionType"
                required
              >
                <template v-slot:append>
                  <v-icon
                    v-if="!showPasswordConfirmation"
                    @click="
                      showPasswordConfirmation = !showPasswordConfirmation
                    "
                  >
                    mdi-eye-outline
                  </v-icon>
                  <v-icon
                    v-else
                    @click="
                      showPasswordConfirmation = !showPasswordConfirmation
                    "
                  >
                    mdi-eye-off-outline
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex align-center">
            <v-checkbox v-model="licenceAgree">
              <template v-slot:label>
                <span>Acepto los </span>
              </template>
            </v-checkbox>
            <!-- TODO: Terms and conditions -->
            <router-link
              tag="a"
              class="ml-1 cursor-pointer"
              :to="{ name: 'main.home' }"
              >Términos y Condiciones</router-link
            >
          </div>
          <v-card-text
            class="info--text cursor-pointer"
            @click="$emit('toggle')"
          >
            Ya tengo usuario
          </v-card-text>
        </v-container>
      </v-card-text>
      <v-card-actions class="mt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closePopup"> Cancelar </v-btn>
        <v-btn color="primary" type="submit"> Registrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { IRegisterParams } from "@/types";
import { UserStore, PopupStore } from "@/store";

@Component
export default class RegisterForm extends Vue {
  form: IRegisterParams = {
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  };
  showPassword = false;
  showPasswordConfirmation = false;
  licenceAgree = false;

  /**
   *
   */
  get passwordType() {
    return this.showPassword ? "text" : "password";
  }
  /**
   *
   */
  get passwordConfirmatiionType() {
    return this.showPasswordConfirmation ? "text" : "password";
  }

  closePopup() {
    PopupStore.auth = false;
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
        this.closePopup();
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