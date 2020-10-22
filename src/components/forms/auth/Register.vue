<template>
  <v-form @submit.prevent="register">
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
              type="password"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              label="Confirmar Contraseña*"
              v-model="form.password_confirmation"
              type="password"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-card-text
              class="info--text cursor-pointer"
              @click="$emit('toggle')"
              >Ya tengo usuario</v-card-text
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="mt-0">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="closePopup"> Cancelar </v-btn>
      <v-btn color="primary" type="submit"> Registrar </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";
import { IRegisterParams } from "@/types";
import { AuthStore } from "@/store/Auth";

@Component
export default class RegisterForm extends Vue {
  form: IRegisterParams = {
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  };

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
        await AuthStore.register(this.form);
        PopupStore.addNotification(
          ["Bienvenido " + AuthStore.profile.first_name],
          "info"
        );
        this.closePopup();
      } catch (err) {
        PopupStore.addNotification(err);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>