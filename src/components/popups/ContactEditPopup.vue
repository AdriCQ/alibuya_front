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
        <v-btn color="primary" dark small @click="emitEvent">
          {{ formEmpty ? "Agregar" : "Guardar" }}
        </v-btn>
        <v-btn color="primary" dark small @click="close"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { PopupStore } from "@/store";
import { IUserContact } from "@/types";

@Component
export default class ContactEditPopup extends Vue {
  @Prop(Boolean) formEmpty!: boolean;

  form: IUserContact = {
    full_name: "",
    ci: "",
    address: "",
  };

  get contact() {
    return PopupStore.contactToEdit;
  }

  get show() {
    if (!this.formEmpty && PopupStore.contactPopup) {
      this.setForm(this.contact);
    } else if (PopupStore.contactPopup) {
      this.setForm({ full_name: "", ci: "", address: "" });
    }

    return PopupStore.contactPopup;
  }

  setForm(_contact: IUserContact) {
    this.form = _contact;
  }

  emitEvent() {
    if (this.formEmpty) {
      this.$emit("add-contact", this.form);
    } else {
      this.$emit("update-contact", this.form);
    }
  }

  close() {
    PopupStore.contactPopup = false;
  }
}
</script>