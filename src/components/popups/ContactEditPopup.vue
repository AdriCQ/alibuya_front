<template>
  <v-dialog :value="show" max-width="500px" persistent scrollable>
    <v-card>
      <v-card-title> Editar Contacto</v-card-title>

      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre Completo"
                  prepend-icon="mdi-account-plus"
                  v-model="form.full_name"
                  dense
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="CI"
                  prepend-icon="mdi-account-box"
                  v-model="form.ci"
                  dense
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Dirección"
                  prepend-icon="mdi-map-marker"
                  v-model="form.address"
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" dark small @click="save"> Guardar </v-btn>
        <v-btn color="primary" dark small @click="close"> Cancelar </v-btn>
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
    full_name: "",
    ci: "",
    address: "",
  };

  get contactKey() {
    return PopupStore.contactToEdit;
  }

  get show() {
    if (PopupStore.contactPopup) {
      this.setContact(UserStore.userContacts[this.contactKey as number]);
    }

    return PopupStore.contactPopup;
  }

  setContact(_contact: IUserContact) {
    this.form.full_name = _contact.full_name;
    this.form.ci = _contact.ci;
    this.form.address = _contact.address;
  }

  save() {
    UserStore.saveContact(this.form, this.contactKey as number);
    this.close();
  }

  close() {
    PopupStore.contactPopup = false;
  }
}
</script>