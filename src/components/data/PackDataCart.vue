<template>
  <div>
    <!-- Confirm delete -->
    <v-dialog v-model="deleteDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Confirmación de eliminación
        </v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar éste paquete de su carrito? Tenga
          presente que ésta acción no se puede revertir.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="deletePack(deleteKey)">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / Confirm delete -->

    <template v-if="shopPacks.length">
      <!-- Small View Grid Mode -->
      <v-row no-gutters justify="center">
        <v-col
          cols="12"
          class="mt-2 px-1"
          v-for="(pack, packKey) in shopPacks"
          :key="`pack-col-${packKey}`"
        >
          <v-card outlined class="mt-1">
            <pack-card-horizontal :pack="pack" :pack-key="packKey" />
            <div class="d-flex">
              <v-spacer />
              <v-btn
                outlined
                small
                @click="deletePopupConfirm(packKey)"
                class="mb-2 mx-1"
                >Eliminar</v-btn
              >
              <v-btn
                outlined
                small
                @click="goToDetails(packKey)"
                class="mb-2 mx-1"
                >Editar</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- / Small View Grid Mode -->
    </template>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "pack-card-horizontal": () =>
      import("@/components/widgets/packs/PackCardHorizontal.vue"),
  },
})
export default class ProductPackDataCart extends Vue {
  deleteKey: number | null = null;
  deleteDialog = false;

  get shopPacks() {
    return PackStore.packs;
  }

  /**
   *
   */
  increase(key: number) {
    (this.shopPacks[key].cant as number)++;
  }
  /**
   *
   */
  decrease(key: number) {
    if ((this.shopPacks[key].cant as number) > 0)
      (this.shopPacks[key].cant as number)--;
  }
  /**
   *
   */
  deletePopupConfirm(key: number) {
    this.deleteKey = key;
    this.deleteDialog = true;
  }
  /**
   *
   */
  deletePack(key: number) {
    PackStore.removeShoppingCartPack(key);
    this.deleteDialog = false;
  }

  goToDetails(_key: number) {
    this.$router.push({
      name: "shop.pack-details",
      query: {
        packKey: _key.toString(),
      },
    });
  }
}
</script>