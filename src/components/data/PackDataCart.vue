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

    <v-container>
      <template v-if="shopPacks.length">
        <!-- Small View Grid Mode -->
        <template v-if="$vuetify.breakpoint.xs">
          <pack-cart
            cart
            class="mt-4"
            :pack="pack"
            v-for="(pack, key) in shopPacks"
            @delete="deletePopupConfirm(key)"
            @edit="editPack(key)"
            :key="key"
          />
        </template>
        <!-- / Small View Grid Mode -->

        <v-simple-table fixed-header v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th style="width: 5rem"></th>
                <!-- <th>Nombre</th> -->
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pack, key) in shopPacks"
                :key="key"
                @click="editPack(key)"
                class="cursor-pointer"
              >
                <td class="pa-1">
                  <div style="width: 5rem">
                    <v-sheet color="secondary" width="100%" height="5rem" />
                  </div>
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
                  <v-btn icon color="error" @click="deletePopupConfirm(key)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    // "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "pack-cart": () => import("@/components/widgets/PackWidget.vue"),
  },
})
export default class ProductPackDataCart extends Vue {
  deleteKey: number | null = null;
  deleteDialog = false;

  mounted() {
    console.log("Cart Packs", this.shopPacks);
  }

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

  editPack(_key: number) {
    this.$router.push({
      name: "shop.pack-details",
      query: {
        packKey: _key.toString(),
      },
    });
  }
}
</script>