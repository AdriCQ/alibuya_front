<template>
  <div id="account-contacts">
    <edit-popup
      :form-empty="popupEmpty"
      @add-contact="addContact"
      @update-contact="updateContact"
    />
    <v-card elevation="0">
      <v-card-title>
        <v-btn text @click="preparePopup">
          <v-icon color="primary" large> mdi-plus </v-icon>
          <span class="text-transform-none"> Agregar nuevo usuario</span>
        </v-btn>
      </v-card-title>
      <v-row>
        <v-col
          v-for="(contact, key) in contacts"
          :key="`account-contact-${key}`"
          cols="12"
          sm="6"
          lg="4"
        >
          <contact
            :contact="contact"
            @click-edit="setKey(key)"
            @click-remove="removeContact(key)"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore, UserStore } from "@/store";
import { IUserContact } from "@/types";

@Component({
  components: {
    contact: () => import("@/components/widgets/setting/Contact.vue"),
    "edit-popup": () => import("@/components/popups/ContactEditPopup.vue"),
  },
})
export default class AccountContacts extends Vue {
  popupEmpty = false;
  keyUpdateContact = 0;

  get contacts() {
    return UserStore.contacts;
  }

  showPopup() {
    PopupStore.contactPopup = true;
  }

  closePopup() {
    PopupStore.contactPopup = false;
  }

  preparePopup() {
    this.popupEmpty = true;
    this.showPopup();
  }

  addContact(_contact: IUserContact) {
    UserStore.addContact(_contact);
    this.closePopup();
  }

  updateContact(_form: IUserContact) {
    UserStore.updateContact(_form, this.keyUpdateContact);
    this.closePopup();
  }

  removeContact(_key: number) {
    UserStore.removeContact(_key);
  }

  setKey(_key: number) {
    this.popupEmpty = false;
    PopupStore.contactToEdit = this.contacts[_key];
    this.keyUpdateContact = _key;
    this.showPopup();
  }
}
</script>