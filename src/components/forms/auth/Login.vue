<template>
  <v-form>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row :no-gutters="vertical">
        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            outlined
            color="black"
            label="Email*"
            width="10"
            v-model="form.email"
            dense
            required
          />
        </v-col>

        <v-col cols="12" :sm="vertical ? 12 : 6">
          <v-text-field
            outlined
            color="black"
            v-model="form.password"
            label="Contraseña*"
            :type="passwordType"
            dense
            required
          />
          <!-- Toggle show password -->
          <v-switch class="mt-0" v-model="showPassword">
            <template v-slot:label>
              <span style="font-size: 15px">Mostrar contraseña. </span>
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
              @click="$emit('toggle')"
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
import { ILoginParams } from "@/types";
import { UserStore, PopupStore } from "@/store";

@Component
export default class LoginForm extends Vue {
  @Prop({ type: Boolean, default: false }) vertical!: boolean;
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
  async login() {
    if (this.isValid) {
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
        this.$router.back();
      } catch (error) {
        PopupStore.addNotification(error);
      }
      this.$emit("loading:update", false);
    }
  }
}
</script>