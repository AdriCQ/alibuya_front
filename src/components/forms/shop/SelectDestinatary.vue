<template>
  <div>
    <!-- Popup add person -->
    <v-dialog v-model="showPopup" max-width="600px" scrollable>
      <v-card class="pa-2">
        <v-card-title>
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Añadir Destinatario
        </v-card-title>
        <v-form class="pa-3">
          <v-text-field
            v-model="contactForm.first_name"
            placeholder="Nombre"
            label="Nombre"
          />
          <v-text-field
            v-model="contactForm.last_name"
            placeholder="Apellidos"
            label="Apellidos"
          />
          <v-textarea
            v-model="contactForm.address"
            placeholder="Dirección"
            label="Dirección"
          />
          <v-card-actions>
            <v-btn
              color="primary"
              type="submit"
              @click.prevent="submitAddContact"
            >
              <v-icon>mdi-account-plus</v-icon>
              <span class="ml-1">Añadir</span>
            </v-btn>

            <v-btn color="primary" @click="closeAddContact">
              <v-icon>mdi-close</v-icon>
              <span class="ml-1">Cancelar</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Popup add person -->

    <!-- Persons info -->
    <v-select
      v-model="selectedCpy"
      :items="allPersonsItems"
      @input="onInput"
      :menu-props="{ maxHeight: '400' }"
      label="Destinatarios"
      multiple
      chips
      deletable-chips
      :hint="`Se necesitan ${cant - selected.length} destinatarios`"
      persistent-hint
    >
      <template v-slot:prepend-item>
        <v-list-item class="cursor-pointer" @click="showPopup = true">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Nuevo Destinatario</v-list-item-title>
        </v-list-item>
      </template>
    </v-select>
    <!-- / Persons info -->
  </div>
</template>

<script lang='ts'>
import { UserStore } from "@/store";
import { TPackDestinationPerson } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SelectDestinataryInput extends Vue {
  @Prop({
    type: Array,
    default: [],
  })
  readonly selected!: TPackDestinationPerson[];
  @Prop(Number) readonly cant!: number;
  @Prop(Number) readonly limit!: number;

  showPopup = false;

  selectedCpy: TPackDestinationPerson[] = [];

  contactForm: TPackDestinationPerson = {
    first_name: "",
    last_name: "",
    address: "",
  };

  get allPersonsItems() {
    const p: string[] = [];
    UserStore.userDestinataries.forEach((person) => {
      p.unshift(`${person.first_name} ${person.last_name}`);
    });
    return p;
  }

  onInput() {
    if (this.selectedCpy.length > this.cant) {
      this.selectedCpy.shift();
    }
    this.$emit("update:selected", this.selectedCpy);
  }

  /**
   *
   */
  submitAddContact() {
    //TODO: Validate form

    UserStore.addUserDestinatary(this.contactForm);
    this.contactForm = {
      first_name: "",
      last_name: "",
      address: "",
    };
    this.closeAddContact();
  }

  closeAddContact() {
    this.showPopup = false;
  }
}
</script>