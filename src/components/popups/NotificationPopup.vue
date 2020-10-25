<template>
  <v-snackbar
    app
    :value="show"
    top
    :color="notification.type"
    shaped
    @input="update"
    :timeout="notification.timeout"
  >
    <router-link
      tag="div"
      class="cursor-pointer"
      :to="notification.to"
      v-if="notification.to"
    >
      <p v-for="(n, key) in notification.content" :key="key">
        {{ String(n) }}
      </p>
    </router-link>
    <template v-else>
      <p v-for="(n, key) in notification.content" :key="key">
        {{ String(n) }}
      </p>
    </template>

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        v-bind="attrs"
        :to="notification.action.to"
        v-if="notification.action"
      >
        <v-icon>{{ notification.action.icon }}</v-icon>
      </v-btn>
      <v-btn icon v-bind="attrs" @click="close" v-else>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";

@Component
export default class NotificationPopup extends Vue {
  get show() {
    return PopupStore.notificationPopup;
  }

  get notification() {
    return PopupStore.notificationPopupContent;
  }

  close() {
    PopupStore.clearNotifications();
    PopupStore.notificationPopup = false;
  }

  update(_input: boolean) {
    PopupStore.notificationPopup = _input;
  }
}
</script>