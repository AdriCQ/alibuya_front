<template>
  <div id="show-view">
    <v-section class="mt-2">
      <v-row>
        <!-- All Packs -->
        <v-col cols="12">
          <v-card>
            <v-card-title>Paquetes</v-card-title>
            <v-card-text>
              <p>
                Explicación sobre los límites de compra de 1,50 Kg por paquete y
                que pude crear más de un paquete a la vez.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Pariatur itaque quo fugit a inventore laudantium dolor minima
                consectetur, sunt dolores ipsum culpa eius quod ducimus et error
                impedit repellat cum!
              </p>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col
                  cols="auto"
                  v-for="(pack, packKey) in packs"
                  :key="`pack-list-${packKey}`"
                >
                  <v-card flat>
                    <v-card-title>{{ pack.title }}</v-card-title>
                    <v-card-text
                      >Precio: ${{ Number(pack.price).toFixed(2) }}</v-card-text
                    >
                    <v-card-text>Peso: {{ Number(pack.weight) }} g</v-card-text>
                    <v-card-actions>
                      <v-btn @click="editPack(packKey)">
                        <v-icon>mdi-table-edit</v-icon>
                        <span class="ml-2">Editar</span>
                      </v-btn>
                      <v-btn @click="deletePack(packKey)">
                        <v-icon>mdi-delete</v-icon>
                        <span class="ml-2">Eliminar</span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="addPack">
                <v-icon>mdi-plus</v-icon>
                <span class="ml-2">Nuevo Paquete</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- / All Packs -->
      </v-row>
    </v-section>

    <v-dialog v-model="dialog" scrollable fullscreen>
      <v-form>
        <v-card>
          <v-row no-gutters>
            <!-- Products in pack -->
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="5"
              xl="4"
              v-if="packs.length"
            >
              <v-card :height="productAddedHeight" style="overflow-y: auto">
                <v-text-field
                  class="px-4"
                  label="Nombre del Paquete"
                  placeholder="Cambie el nombre del paquete"
                  v-model="packName"
                />
                <v-card-text>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        Total: ${{ Number(subTotalPrice).toFixed(2) }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ Number(packWeight / 1000).toFixed(2) }} Kg de 1,50 Kg
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item
                      v-for="(s, sK) in packs[activePack].products"
                      :key="sK"
                    >
                      <v-list-item-avatar tile>
                        <v-sheet width="5rem" height="5rem" color="secondary" />
                      </v-list-item-avatar>
                      <v-list-item-title>{{ s.title }}</v-list-item-title>

                      <v-list-item-action>
                        <cant-input
                          :cant.sync="s.cant"
                          @zero="onInputZero(sK)"
                          :can-plus="isAvailable(s)"
                        />
                      </v-list-item-action>
                      <v-list-item-action />
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- / Products in pack -->

            <!-- All Products -->
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="7"
              xl="8"
              v-if="packs.length"
            >
              <v-container v-if="packFull">
                <v-alert type="warning">
                  El paquete ha alcanzado el peso máximo
                </v-alert>
              </v-container>
              <v-card
                :height="productListHeight"
                style="overflow-y: auto"
                v-else
              >
                <v-card-title>
                  <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-btn icon>
                      <v-icon>mdi-view-grid</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-view-list</v-icon>
                    </v-btn>
                  </template>
                  <span>Productos disponibles</span>
                </v-card-title>

                <!-- Products list -->
                <v-list>
                  <v-list-item
                    v-for="(p, i) in products"
                    :key="i"
                    class="product-list"
                    v-show="isAvailable(p)"
                  >
                    <v-list-item-avatar tile>
                      <v-sheet
                        color="secondary"
                        width="100%"
                        height="100%"
                      ></v-sheet>
                    </v-list-item-avatar>
                    <v-list-item-title>
                      {{ p.title }} ${{ Number(p.price).toFixed(2) }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ p.weight }} g
                    </v-list-item-subtitle>
                    <v-list-item-action>
                      <v-btn icon @click="addProduct(p)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-list-item-action-text>
                        Añadir
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
              <!-- / Products list -->
            </v-col>
            <!-- All Products -->
          </v-row>
          <v-card-actions>
            <v-btn color="primary" @click="savePack">
              <v-icon>mdi-content-save</v-icon>
              <span class="ml-2">Guardar</span>
            </v-btn>

            <v-btn color="error" @click="deletePack">
              <v-icon>mdi-delete</v-icon>
              <span class="ml-2">Eliminar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CLOTHES } from "@/utils/test";
import { IProduct, IProductsPack } from "@/types";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
  },
})
export default class ShopView extends Vue {
  maxWeight = 1500;
  dialog = false;
  packFull = false;

  packs: IProductsPack[] = [];
  activePack = 0;
  packName = "";

  subTotalPrice = 0;

  get products() {
    return CLOTHES;
  }

  get packWeight() {
    let w = 0;
    this.subTotalPrice = 0;
    this.packs[this.activePack].products.forEach((p) => {
      p.weight ? (w += p.weight * p.cant) : (w += 0);
      this.subTotalPrice += p.price * p.cant;
    });
    if (w > 0) {
      w += 20;
    }
    if (w >= this.maxWeight) {
      this.packFull = true;
    } else {
      this.packFull = false;
    }
    return w;
  }

  get productListHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return "50vh";
      case "sm":
        return "50vh";
      default:
        return "90vh";
    }
  }

  get productAddedHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        if (!this.packFull) return "40vh";
        else return "75vh";

      case "sm":
        if (!this.packFull) return "40vh";
        else return "75vh";
      default:
        return "90vh";
    }
  }

  isAvailable(product: IProduct) {
    if (this.maxWeight < this.packWeight + (product.weight as number)) {
      return false;
    }
    return true;
  }

  addProduct(product: IProduct) {
    this.packs[this.activePack].products.push({
      title: product.title,
      price: product.price,
      img: product.img,
      weight: product.weight,
      description: product.description,
      cant: 1,
    });
  }

  removeProduct(key: number) {
    this.packs[this.activePack].products.splice(key, 1);
  }

  onInputZero(key: number) {
    this.removeProduct(key);
  }

  /**
   * Packs
   */

  addPack() {
    this.packs.push({
      title: "Nuevo Paquete",
      products: [],
      weight: 0,
      price: 0,
    });
    this.activePack = this.packs.length - 1;
    this.packName = "Paquete " + this.packs.length;
    this.dialog = true;
  }

  savePack() {
    this.packs[this.activePack].price = this.subTotalPrice;
    this.packs[this.activePack].weight = this.packWeight;
    this.packs[this.activePack].title = this.packName;
    this.dialog = false;
  }

  editPack(packKey: number) {
    this.activePack = packKey;
    this.dialog = true;
  }

  deletePack(packKey: number) {
    this.activePack = 0;
    this.packs.splice(packKey, 1);
    this.dialog = false;
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  border: solid 1px rgba($color: #000000, $alpha: 0.2);
  padding: 0 1rem 0 1rem;
}
</style>