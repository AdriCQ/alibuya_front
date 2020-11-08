<template>
  <v-form class="account-edit">
    <v-row align="center" no-gutters>
      <v-col cols="12" sm="5" md="4" class="mb-4">
        <!-- Account Image -->
        <v-sheet
          color="white"
          class="position-relative mx-auto"
          elevation="10"
          rounded="circle"
          :height="imageSize"
          :width="imageSize"
        >
          <!-- Edit Image Button -->
          <v-btn
            color="primary"
            class="position-top-right"
            fab
            absolute
            dark
            small
          >
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-sheet>
        <!-- / Account Image -->
      </v-col>

      <v-col cols="12" sm>
        <v-row :no-gutters="smAndDown">
          <!--- Name Input -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Nombre"
              v-model="form.first_name"
              prepend-icon="mdi-account"
              dense
            />
          </v-col>

          <!--- Last Name Input -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Apellidos"
              v-model="form.last_name"
              prepend-icon="mdi-account-plus"
              dense
            />
          </v-col>
        </v-row>

        <v-row :no-gutters="smAndDown">
          <!--- Email Input -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Email"
              v-model="form.email"
              prepend-icon="mdi-mail"
              dense
            />
          </v-col>
          <!--- Phone Number Input -->
          <v-col cols="12" md="6">
            <v-text-field
              label="Número de Teléfono"
              prepend-icon="mdi-phone"
              v-model="form.phone_number"
              dense
            />
          </v-col>
        </v-row>

        <v-row :no-gutters="smAndDown">
          <!--- Country Input -->
          <v-col cols="12" md="6">
            <v-select
              label="País"
              :items="itemsCountry"
              v-model="form.country"
              prepend-icon="mdi-flag"
              item-text="text"
              item-value="value"
              dense
            />
          </v-col>

          <!--- Address Input -->
          <v-col cols="12" lg="6">
            <v-text-field
              label="Dirección"
              v-model="form.address"
              prepend-icon="mdi-map-marker"
              dense
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row :no-gutters="smAndDown">
      <v-col cols="auto">
        <v-checkbox v-model="editPassword" label="Cambiar contraseña" />
      </v-col>
    </v-row>

    <v-row v-if="editPassword" :no-gutters="smAndDown">
      <!--- Password Current Input -->
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          label="Contraseña actual"
          v-model="form.password_current"
          :type="typeCurrentPassword"
          :append-icon="iconCurrentPassword"
          prepend-icon="mdi-lock"
          dense
          @click:append="showPassword.current = !showPassword.current"
        />
      </v-col>

      <!--- Password New Input -->
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          label="Contraseña nueva"
          v-model="form.password_new"
          prepend-icon="mdi-lock-plus"
          :type="typeNewPassword"
          :append-icon="iconNewPassword"
          dense
          @click:append="showPassword.new = !showPassword.new"
        />
      </v-col>
    </v-row>

    <v-row v-if="editPassword" :no-gutters="smAndDown">
      <!--- Password New Confirm Input -->
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          label="Confirmar nueva contraseña"
          v-model="form.password_new_confirm"
          prepend-icon="mdi-lock-outline"
          :type="typeNewConfirmPassword"
          :append-icon="iconNewConfirmPassword"
          dense
          @click:append="showPassword.newConfirm = !showPassword.newConfirm"
        />
      </v-col>
    </v-row>

    <!-- Buttons -->
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn :small="smAndDown" type="submit" color="primary">
          Aceptar
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn :small="smAndDown" color="primary" @click="cancel">
          Cancelar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { IVSelectItem } from "@/types";

@Component
export default class AccountEdit extends Vue {
  editPassword = false;

  showPassword = {
    current: false,
    new: false,
    newConfirm: false,
  };

  form = {
    first_name: "Darián",
    last_name: "Capote Quintana",
    email: "darian@alibuya.com",
    phone_number: "53927128",
    country: "CUB",
    address: "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    password_current: "",
    password_new: "",
    password_new_confirm: "",
  };

  countries: IVSelectItem[] = [
    { text: "Cuba", value: "CUB" },
    { text: "España", value: "ESP" },
  ];

  get imageSize() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 170;

      case "sm":
        return 180;

      case "md":
        return 210;

      case "lg":
        return 230;

      default:
        return 170;
    }
  }

  get smAndDown() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get itemsCountry() {
    return this.countries;
  }

  // password type
  get typeCurrentPassword() {
    return this.showPassword.current ? "text" : "password";
  }

  get typeNewPassword() {
    return this.showPassword.new ? "text" : "password";
  }

  get typeNewConfirmPassword() {
    return this.showPassword.newConfirm ? "text" : "password";
  }

  // passwords append icon
  get iconCurrentPassword() {
    return this.showPassword.current
      ? "mdi-eye-off-outline"
      : "mdi-eye-outline";
  }

  get iconNewPassword() {
    return this.showPassword.new ? "mdi-eye-off-outline" : "mdi-eye-outline";
  }

  get iconNewConfirmPassword() {
    return this.showPassword.newConfirm
      ? "mdi-eye-off-outline"
      : "mdi-eye-outline";
  }

  cancel() {
    this.$emit("change:component", "account-details");
  }
}
</script>