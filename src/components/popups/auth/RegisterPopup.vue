  <template>
  <v-dialog v-model="show" persistent max-width="600px" scrollable>
    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline"
            ><v-icon class="mr-2">mdi-account-plus</v-icon>Registro de
            usuarios</span
          >
        </v-card-title>
        <v-card-text>
          <v-container max-height="400px" class="overflow-y-auto">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Apellidos"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Contraseña*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Confirmar Contraseña*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closePopup"> Cancelar </v-btn>
          <v-btn color="primary" @click="closePopup"> Registrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component
export default class RegisterPopup extends Vue {
  get show() {
    return PopupStore.auth.register;
  }

  closePopup() {
    PopupStore.auth.register = false;
  }
}
</script>