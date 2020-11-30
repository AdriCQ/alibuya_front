<template>
  <v-dialog
    :value="show"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-form>
      <v-card>
        <v-row no-gutters>
          <!-- Products in pack -->
          <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
            <v-card :height="cardHeight" style="overflow-y: auto">
              <v-row>
                <v-col cols="auto">
                  <v-text-field
                    class="px-4"
                    label="Nombre del Paquete"
                    placeholder="Cambie el nombre del paquete"
                    v-model="pack.title"
                  />
                </v-col>
                <v-col cols="auto">
                  <cant-input
                    :cant.sync="pack.cant"
                    :can-minus="pack.cant > 1"
                  />
                </v-col>
              </v-row>

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
                  <v-list-item v-for="(s, sK) in pack.products" :key="sK">
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
          <v-col cols="12" xs="12" sm="12" md="6" lg="7" xl="8">
            <v-container v-if="packFull">
              <v-alert type="warning">
                El paquete ha alcanzado el peso máximo
              </v-alert>
            </v-container>
            <v-card :height="productListHeight" style="overflow-y: auto" v-else>
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
                    <v-list-item-action-text> Añadir </v-list-item-action-text>
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

          <v-btn color="red" dark @click="resetPack">
            <v-icon>mdi-delete</v-icon>
            <span class="ml-2">Eliminar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct, IProductsPack } from "@/types";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
  },
})
export default class PackMakerPopup extends Vue {
  @Prop(Boolean) readonly show!: boolean;

  maxWeight = 1500;

  pack: IProductsPack = {
    title: "Paquete",
    products: [],
    weight: 0,
    price: 0,
    cant: 1,
  };

  packFull = false;
  subTotalPrice = 0;

  /**
   *
   */
  get cardHeight() {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        if (!this.packFull) return "40vh";
        else return "70vh";

      case "sm":
        if (!this.packFull) return "40vh";
        else return "70vh";
      default:
        return "90vh";
    }
  }

  /**
   *
   */
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

  get packWeight() {
    let w = 0;
    this.subTotalPrice = 0;
    this.pack.products.forEach((p) => {
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
  /**
   * Get Products from storage
   */
  get products() {
    return [];
  }

  /**
   * Close Popup
   */
  closePopup() {
    this.$emit("update:show", false);
  }

  /**
   *
   */
  addProduct(product: IProduct) {
    this.pack.products.push({
      title: product.title,
      price: product.price,
      images: product.images,
      weight: product.weight,
      description: product.description,
      cant: 1,
    });
  }

  /**
   * Remove Product from Pack
   */
  removeProduct(key: number) {
    this.pack.products.splice(key, 1);
  }

  /**
   *
   */
  onInputZero(key: number) {
    this.removeProduct(key);
  }

  /**
   * Check if Product is Available by weight
   */
  isAvailable(product: IProduct) {
    if (this.maxWeight < this.packWeight + (product.weight as number)) {
      return false;
    }
    return true;
  }

  /**
   * Save Pack
   */
  savePack() {
    this.pack.price = this.subTotalPrice;
    this.pack.weight = this.packWeight;
    // Emit evnt
    this.$emit("save", this.pack);
  }

  /**
   * Delete Pack
   */
  resetPack() {
    this.pack = {
      title: "Paquete",
      products: [],
      weight: 0,
      price: 0,
      cant: 1,
    };
    this.closePopup();
  }

  /**
   * Set pack from parent component
   */
  setPack(_pack: IProductsPack) {
    this.pack = _pack;
  }
}
</script>