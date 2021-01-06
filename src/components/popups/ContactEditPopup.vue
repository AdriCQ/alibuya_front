<template>
  <v-dialog :value="show" max-width="500px" persistent scrollable>
    <v-card :loading="loading">
      <v-card-title>
        {{ contact.id === 0 ? "Agregar" : "Editar" }} Contacto</v-card-title
      >

      <v-card-text>
        <v-form :disabled="loading">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Nombre"
                  prepend-icon="mdi-account-plus"
                  v-model="form.first_name"
                  dense
                  outlined
                  color="black"
                /> </v-col
              ><v-col cols="12">
                <v-text-field
                  label="Apellidos"
                  prepend-icon="mdi-account-plus"
                  v-model="form.last_name"
                  dense
                  outlined
                  color="black"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="CI"
                  prepend-icon="mdi-account-box"
                  v-model="form.ci"
                  dense
                  outlined
                  color="black"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Dirección"
                  prepend-icon="mdi-map-marker"
                  v-model="form.address"
                  dense
                  outlined
                  color="black"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" class="black--text" small @click="executeAction">
          {{ contact.id === 0 ? "Agregar" : "Guardar" }}
        </v-btn>
        <v-btn small @click="close"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore, UserStore } from "@/store";
import { IUserContact } from "@/types";

@Component
export default class ContactEditPopup extends Vue {
  form: IUserContact = {
    id: 0,
    first_name: "",
    last_name: "",
    ci: "",
    address: "",
  };
  loading = false;

  get contact() {
    return PopupStore.contactToEdit;
  }

  get show() {
    if (PopupStore.contactPopup) {
      this.setForm(this.contact);
    } else if (PopupStore.contactPopup) {
      this.setForm({
        id: 0,
        first_name: "",
        last_name: "",
        ci: "",
        address: "",
      });
    }
    return PopupStore.contactPopup;
  }

  setForm(_contact: IUserContact) {
    this.form = _contact;
  }

  executeAction() {
    this.loading = true;
    if (this.form.id === 0) {
      // Add Contact
      UserStore.addContact(this.form)
        .catch((error) => {
          console.log("Contact error", error);
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.$emit("update-contact", this.form);
    }
  }

  close() {
    PopupStore.contactPopup = false;
  }
}
</script>