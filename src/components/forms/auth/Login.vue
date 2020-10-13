<template>
  <v-form>
    <v-card>
      <v-card-title>
        <span class="headline"
          ><v-icon class="mr-2">mdi-account-arrow-right</v-icon>Login</span
        >
      </v-card-title>
      <v-card-text>
        <v-container class="py-0 my-0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Contraseña*"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <span class="info--text cursor-pointer" @click="$emit('toggle')"
                >No tengo Usuario</span
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closePopup"> Cancelar </v-btn>
        <v-btn color="primary" @click="closePopup"> Login </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component
export default class LoginForm extends Vue {
  closePopup() {
    PopupStore.auth = false;
  }
}
</script>