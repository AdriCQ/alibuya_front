<template>
  <v-form>
    <!-- Buttons -->
    <v-row>
      <v-col cols="auto">
        <v-btn color="primary" @click="toggleEdit">
          {{ !edit ? "Editar" : "Cancelar" }}
        </v-btn>
      </v-col>

      <v-col v-if="edit" cols="auto">
        <v-btn color="primary"> Guardar </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters align-md="center">
      <v-col>
        <v-row no-gutters>
          <!-- Account Image -->
          <v-col cols="12" sm="5" md="4" class="mb-4">
            <v-sheet
              color="white"
              class="position-relative mx-auto"
              elevation="15"
              :height="imgSize"
              :width="imgSize"
            >
              <!-- Button Edit Image -->
              <v-btn
                v-if="edit"
                color="primary"
                class="position-bottom-center"
                fab
                absolute
                dark
                small
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm>
            <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
              <!--- Name Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nombre"
                  v-model="form.first_name"
                  prepend-icon="mdi-account"
                  dense
                  :readonly="!edit"
                ></v-text-field>
              </v-col>

              <!--- Last Name Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Apellidos"
                  v-model="form.last_name"
                  prepend-icon="mdi-account-plus"
                  dense
                  :readonly="!edit"
                ></v-text-field>
              </v-col>

              <!--- Email Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  prepend-icon="mdi-mail"
                  dense
                  :readonly="!edit"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
              <!--- Phone Number Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Número de Teléfono"
                  prepend-icon="mdi-phone"
                  v-model="form.phone_number"
                  dense
                  :readonly="!edit"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
              <!--- Country Input -->
              <v-col cols="12" sm="6">
                <v-select
                  label="País"
                  :items="itemsCountry"
                  v-model="form.country"
                  prepend-icon="mdi-flag"
                  item-text="text"
                  item-value="value"
                  :readonly="!edit"
                  dense
                  @input="countryInput"
                ></v-select>
              </v-col>

              <!--- State Input -->
              <v-col cols="12" sm="6">
                <v-select
                  label="Estado"
                  :items="itemsState"
                  v-model="form.state"
                  prepend-icon="mdi-city"
                  item-text="text"
                  item-value="value"
                  :readonly="!edit"
                  dense
                ></v-select>
              </v-col>

              <!--- City Input -->
              <v-col cols="12" sm="6">
                <v-select
                  label="Ciudad"
                  :items="itemsCities"
                  v-model="form.city"
                  prepend-icon="mdi-city"
                  item-text="text"
                  item-value="value"
                  :readonly="!edit"
                  dense
                ></v-select>
              </v-col>

              <!--- Address Input -->
              <v-col cols="12" lg="6">
                <v-text-field
                  label="Dirección"
                  v-model="form.address"
                  prepend-icon="mdi-map-marker"
                  dense
                  :readonly="!edit"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="edit" :no-gutters="$vuetify.breakpoint.smAndDown">
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="edit_password"
                  label="Cambiar contraseña"
                />
              </v-col>
            </v-row>

            <v-row
              v-if="edit_password"
              :no-gutters="$vuetify.breakpoint.smAndDown"
            >
              <!--- Password Current Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contraseña actual"
                  v-model="form.password_current"
                  prepend-icon="mdi-lock"
                  dense
                ></v-text-field>
              </v-col>

              <!--- Password New Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contraseña nueva"
                  v-model="form.password_new"
                  prepend-icon="mdi-lock-plus"
                  dense
                ></v-text-field>
              </v-col>

              <!--- Password New Confirm Input -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Confirmar nueva contraseña"
                  v-model="form.password_new_confirm"
                  prepend-icon="mdi-lock-outline"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Dictionary, IVSelectItem } from "@/types";

@Component
export default class Account extends Vue {
  edit = true;
  edit_password = false;

  form = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    country: "",
    state: "",
    city: "",
    address: "",
    password_current: "",
    password_new: "",
    password_new_confirm: "",
  };

  countries: IVSelectItem[] = [
    { text: "Cuba", value: "CUB" },
    { text: "España", value: "ESP" },
  ];

  states: Dictionary<IVSelectItem[]> = {
    CUB: [
      { text: "Cuba-State-1", value: "CUB_1" },
      { text: "Cuba-State-2", value: "CUB_2" },
    ],
    ESP: [
      { text: "España-State-1", value: "ESP_1" },
      { text: "España-State-2", value: "ESP_2" },
    ],
  };

  cities: Dictionary<IVSelectItem[]> = {
    // CUB
    CUB_1: [{ text: "Cuba-State-1-City-1", value: "CUB_1_1" }],
    CUB_2: [{ text: "Cuba-State-2-City-1", value: "CUB_2_1" }],

    // ESP
    ESP_1: [{ text: "España-State-1-City-1", value: "ESP_1_1" }],
    ESP_2: [{ text: "España-State-2-City-1", value: "ESP_2_1" }],
  };

  // getters
  get imgSize() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return 200;
      case "sm":
        return 210;
      case "md":
        return 225;
      case "lg":
        return 230;
      case "xl":
        return 250;
      default:
        return 200;
    }
  }

  get itemsCountry() {
    return this.countries;
  }

  get itemsState(): IVSelectItem[] {
    return this.states[this.form.country];
  }

  get itemsCities(): IVSelectItem[] {
    return this.cities[this.form.state];
  }

  // methods
  countryInput() {
    this.form.state = "";
    this.form.city = "";
  }

  toggleEdit() {
    if (this.edit) this.edit_password = false;
    this.edit = !this.edit;
  }
}
</script>