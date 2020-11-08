<template>
  <div class="view-container" id="init-vendor-view">
    <v-section>
      <v-card>
        <v-card-title>Creando tu negocio en Alibuya</v-card-title>
        <v-stepper v-model="stepper" vertical>
          <!-- Step 1 -->
          <v-stepper-step :complete="stepper > 1" step="1">
            Nombra tu negocio
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-text-field
              v-model="vendor.title"
              label="Nombre del Negocio"
              placeholder="Nombre del Negocio"
              class="w-40"
            />
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 1 -->

          <!-- Step 2: Type -->
          <v-stepper-step :complete="stepper > 2" step="2">
            Su especialidad
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-select
              v-model="vendor.type"
              label="Tipo de Negocio"
              class="w-30"
              multiple
              chips
              deletable-chips
              :items="allTypes"
            />
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 2: Type -->

          <!-- Step 3: Description -->
          <v-stepper-step :complete="stepper > 3" step="3">
            Describa su negocio
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-textarea
              class="w-40"
              label="Descripción"
              v-model="vendor.description"
            />
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Siguiente</v-btn>
          </v-stepper-content>
          <!-- / Step 3: Description -->

          <!-- Step 4: Final -->
          <v-stepper-step :complete="stepper > 4" step="4">
            Finalizar
          </v-stepper-step>

          <v-stepper-content step="4">
            <v-card outlined>
              <v-card-title>{{ vendor.title }}</v-card-title>
              <v-card-subtitle>
                <p>Especialidad</p>
                <v-chip
                  small
                  outlined
                  class="ma-2"
                  color="primary"
                  v-for="(chip, chipKey) in vendor.type"
                  :key="chipKey"
                >
                  {{ chip }}
                </v-chip>
              </v-card-subtitle>
              <v-card-text>{{ vendor.description }}</v-card-text>
            </v-card>
            <v-btn @click="prevStep" class="mr-2" color="secondary" small
              >Anterior</v-btn
            >
            <v-btn @click="nextStep" color="primary" small>Finalizar</v-btn>
          </v-stepper-content>
          <!-- / Step 3: Description -->
        </v-stepper>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { IVendor } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NewVendorView extends Vue {
  vendor: IVendor = {
    title: "",
    description: "",
    type: [],
  };
  stepper = 1;

  get mobileBreakpoint() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get validateStep() {
    return true;
  }

  get allTypes() {
    return [
      "Ropas",
      "Celulares",
      "Electrodomésticos",
      "Inmobiliaria",
      "Salud",
      "Automotriz",
    ];
  }

  nextStep() {
    if (this.validateStep) {
      this.stepper++;
    }
  }

  prevStep() {
    if (this.stepper > 1) {
      this.stepper--;
    }
  }
}
</script>