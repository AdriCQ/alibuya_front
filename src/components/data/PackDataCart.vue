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
      <template v-if="$vuetify.breakpoint.xs">
        <v-row no-gutters justify="center">
          <v-col
            cols="auto"
            v-for="(pack, pKey) in shopPacks"
            :key="pKey"
            class="pa-1"
          >
            <pack-card
              :pack="pack"
              @details="goToDetails(pKey)"
              mode="lg"
              with-price
            />
          </v-col>
        </v-row>
      </template>
      <!-- / Small View Grid Mode -->

      <v-simple-table fixed-header v-else class="pa-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th style="width: 5rem"></th>
              <!-- <th>Nombre</th> -->
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pack, key) in shopPacks"
              :key="key"
              class="cursor-pointer"
            >
              <td class="pa-1">
                <pack-card :pack="pack" @details="goToDetails(key)" />
              </td>
              <!-- <td>
                  {{ pack.title }}
                </td> -->
              <td>${{ Number(pack.price).toFixed(2) }}</td>
              <td>
                {{ pack.cant }}
              </td>
              <td>${{ Number(pack.price * pack.cant).toFixed(2) }}</td>
              <td>
                <v-btn small text color="success" @click="goToDetails(key)"
                  >Editar</v-btn
                >
              </td>
              <td>
                <v-btn small text color="error" @click="deletePopupConfirm(key)"
                  >Eliminar</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "pack-card": () => import("@/components/widgets/packs/PackCard.vue"),
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