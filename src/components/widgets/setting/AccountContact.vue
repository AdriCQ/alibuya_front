<template>
  <div class="account-contact px-md-2 py-1 py-md-2">
    <v-card color="white" rounded elevation="15">
      <v-banner>
        <template v-slot:icon>
          <v-avatar color="primary" size="30">
            <v-icon color="white" size="22"> mdi-account</v-icon>
          </v-avatar>
        </template>

        <p class="mb-2" style="font-size: 0.8rem">
          <span class="font-weight-bold">Nombre: </span>
          {{ contact.full_name }}
          <br />
        </p>

        <p class="mb-2" style="font-size: 0.8rem">
          <span class="font-weight-bold">CI: </span>
          {{ contact.ci }}
          <br />
        </p>

        <p class="mb-0" style="font-size: 0.8rem">
          <span class="font-weight-bold">Dirección: </span>
          {{ contact.address }}
        </p>
      </v-banner>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" x-small dark> Editar </v-btn>
        <v-btn color="primary" x-small dark> Eliminar </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

import { IUserContact } from "@/types";

@Component
export default class AccountContact extends Vue {
  @Prop({ type: Object, required: true }) readonly contact!: IUserContact;
}
</script>