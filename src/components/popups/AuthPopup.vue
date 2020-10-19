  <template>
  <v-dialog v-model="show" persistent max-width="600px" scrollable>
    <keep-alive>
      <component :is="`${authDefault}-form`" @toggle="switchForm" />
    </keep-alive>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";

@Component({
  components: {
    "login-form": () => import("@/components/forms/auth/Login.vue"),
    "register-form": () => import("@/components/forms/auth/Register.vue"),
  },
})
export default class AuthPopup extends Vue {
  get show() {
    return PopupStore.auth;
  }

  get authDefault() {
    return PopupStore.authDefault;
  }

  switchForm() {
    if (PopupStore.authDefault === "register") {
      PopupStore.authDefault = "login";
    } else {
      PopupStore.authDefault = "register";
    }
  }
}
</script>