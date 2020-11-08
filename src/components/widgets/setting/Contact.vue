<template>
  <div class="contact-widget px-md-2 py-1 py-md-2">
    <v-card rounded elevation="10">
      <v-banner>
        <p class="mb-2">
          <span class="font-weight-bold">Nombre: </span>
          {{ contact.full_name }}
          <br />
        </p>

        <p class="mb-2">
          <span class="font-weight-bold">CI: </span>
          {{ contact.ci }}
          <br />
        </p>

        <p class="mb-0">
          <span class="font-weight-bold">Dirección: </span>
          {{ contact.address }}
        </p>
      </v-banner>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" small dark @click="showEditPopup">
          Editar
        </v-btn>
        <v-btn color="primary" small dark @click="remove"> Eliminar </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IUserContact } from "@/types";
import { PopupStore, UserStore } from "@/store";

@Component
export default class Contact extends Vue {
  @Prop({ type: Object, required: true }) readonly contact!: IUserContact;
  @Prop(Number) readonly keyContact!: number;

  remove() {
    UserStore.removeContact(this.keyContact);
  }

  showEditPopup() {
    PopupStore.showEditContact(this.keyContact);
  }
}
</script>