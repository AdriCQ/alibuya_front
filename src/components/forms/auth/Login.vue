<template>
  <v-form>
    <v-card-title>
      <span class="headline"
        ><v-icon class="mr-2">mdi-account-arrow-right</v-icon>Login</span
      >
    </v-card-title>
    <v-card-text>
      <v-container class="py-0 my-0">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Email*" v-model="form.email" required />
          </v-col>
          <v-col cols="12" sm="6">
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
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <span class="info--text cursor-pointer" @click="$emit('toggle')">
              No tengo Usuario
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="closePopup"> Cancelar </v-btn>
      <v-btn color="primary" type="submit" @click.prevent="login">
        Login
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";
import { ILoginParams } from "@/types";
import { AuthStore } from "@/store/Auth";

@Component
export default class LoginForm extends Vue {
  showPassword = false;

  form: ILoginParams = {
    email: "",
    password: "",
  };
  /**
   *
   */
  get passwordType() {
    return this.showPassword ? "text" : "password";
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
  closePopup() {
    PopupStore.auth = false;
  }

  /**
   *
   */
  async login() {
    if (this.isValid) {
      this.$emit("loading:update", true);
      try {
        await AuthStore.login(this.form);
        PopupStore.addNotification(
          ["Bienvenido " + AuthStore.profile.first_name],
          "info"
        );
        this.closePopup();
      } catch (error) {
        PopupStore.addNotification(error);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>