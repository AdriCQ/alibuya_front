<template>
  <div class="account">
    <v-card class="py-2" elevation="0">
      <v-row class="mb-2" no-gutters>
        <v-col cols="12" sm="5" md="4" class="mb-2 mb-sm-0 position-relative">
          <!--- Account Image -->
          <v-sheet
            color="white"
            elevation="10"
            rounded="circle"
            :width="imageSize"
            :height="imageSize"
            class="mx-auto"
          />

          <!--- / Account Image -->

          <!--- Edit Button (xs - sm) -->
          <v-btn
            v-if="!mdAndUp"
            class="mx-2"
            color="primary"
            absolute
            fab
            top
            right
            dark
            small
            @click="edit"
          >
            <v-icon dark> mdi-account-edit </v-icon>
          </v-btn>
          <!--- / Edit Button (xs - sm) -->
        </v-col>

        <!-- Account Information -->
        <v-col cols="12" sm :align-self="mdAndUp ? 'end' : undefined">
          <v-row no-gutters>
            <v-col>
              <v-banner icon="mdi-account" class="pr-1" single-line>
                <span>
                  Nombre:
                  {{ fullName }}
                </span>
              </v-banner>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12">
              <v-banner icon="mdi-mail" class="pr-1" single-line>
                <span> Email: {{ profile.email }} </span>
              </v-banner>
            </v-col>

            <v-col cols="12">
              <v-banner icon="mdi-phone" class="pr-1" single-line>
                <span>Teléfono: {{ profile.phone_number }} </span>
              </v-banner>
            </v-col>

            <v-col cols="12">
              <v-banner icon="mdi-map-marker" class="pr-1" single-line>
                <span>Dirección: {{ fullAdress }} </span>
              </v-banner>
            </v-col>
          </v-row>
        </v-col>
        <!-- / Account Information -->
      </v-row>

      <!--- Edit Button (md - xl) -->
      <v-row>
        <v-col offset-md="5">
          <v-btn v-if="mdAndUp" color="primary" @click="edit">
            <v-icon class="mr-1">mdi-account-edit</v-icon>&nbsp; Editar
          </v-btn>
        </v-col>
      </v-row>
      <!--- / Edit Button (md - xl) -->
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AccountDetails extends Vue {
  get profile() {
    return {
      first_name: "Darián",
      last_name: "Capote Quintana",
      email: "darian@alibuya.com",
      phone_number: "53927128",
      country: "Cuba",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    };
  }

  get fullName() {
    return this.profile.first_name + " " + this.profile.last_name;
  }

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

  get fullAdress() {
    return this.profile.address + ", " + this.profile.country;
  }

  get mdAndUp() {
    return this.$vuetify.breakpoint.mdAndUp;
  }

  edit() {
    this.$emit("change:component", "account-edit");
  }
}
</script>