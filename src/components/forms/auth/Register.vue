<template>
  <v-form>
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
              <v-text-field label="Nombre" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                label="Apellidos"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                label="Contraseña*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                label="Confirmar Contraseña*"
                type="password"
                required
              ></v-text-field>
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
        <v-btn color="primary" @click="closePopup"> Registrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component
export default class RegisterForm extends Vue {
  closePopup() {
    PopupStore.auth = false;
  }
}
</script>