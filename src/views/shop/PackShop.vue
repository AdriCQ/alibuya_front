<template>
  <div id="pack-shop-view" class="view-container">
    <v-section>
      <v-row>
        <!-- All Packs -->
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-icon class="mr-1">{{ departmentIcon }}</v-icon>
              Paquetes de {{ departmentName }}
            </v-card-title>
            <!-- Brand Select -->
            <v-card-text>
              <v-select
                class="w-20"
                v-model="brandsFilter"
                v-if="tag === 'clothes'"
                :items="['Todos', 'ADIDAS', 'NIKE', 'PUMA']"
                :menu-props="{ maxHeight: '400' }"
                @input="handleBrandFilter"
                label="Marcas"
                multiple
                chips
                deletable-chips
                dense
                hint="Seleccione las marcas que desea ver"
                persistent-hint
              />
            </v-card-text>
            <!-- / Brand Select -->
            <!-- Info descuento and limits -->
            <!-- <v-card-text>
              <v-alert type="info" color="secondary" dark dismissible>
                <p class="title">
                  <span v-if="isLogged">Hola {{ userName }}.&nbsp;</span>Usted
                  debe tener en cuenta:
                </p>
                <ul class="li-circle">
                  <li>
                    <p>
                      Si sobrepasa el límite de 10 paquetes debe añadir un nuevo
                      destinatario.
                    </p>
                  </li>
                  <li>
                    <p>
                      Los paquetes limitados por peso permiten el envío de hasta
                      10 paquetes por persona con un peso de 1.5Kg en cada
                      paquete.
                    </p>
                  </li>
                  <li>
                    <p>
                      Si usted compra más de 6 piezas tendrá un DESCUENTO por
                      compra mayorista de un 5%
                    </p>
                  </li>
                </ul>
              </v-alert>
            </v-card-text> -->
            <!-- / Info descuento and limits -->
            <v-card-text>
              <v-row>
                <v-col
                  cols="auto"
                  v-for="(pack, packKey) in packs"
                  :key="`pack-list-${packKey}`"
                >
                  <!-- Pack Maker -->
                  <v-card max-width="350px" outlined>
                    <v-card-title>{{ pack.title }}</v-card-title>
                    <v-card-text
                      >Precio: ${{
                        Number(pack.price * pack.cant).toFixed(2)
                      }}</v-card-text
                    >
                    <v-card-text>Peso: {{ Number(pack.weight) }} g</v-card-text>
                    <v-card-text>
                      <cant-input :cant.sync="pack.cant" />
                      <div
                        class="accent mt-1 pa-1"
                        style="font-size: 0.75rem"
                        v-if="pack.cant >= 6"
                      >
                        Descuento de 3% por compra mayorista
                      </div>
                    </v-card-text>

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
                  <!-- / Pack Maker -->
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="auto">
                  <v-btn color="primary" @click="addPack">
                    <v-icon>mdi-plus</v-icon>
                    <span class="ml-2">Nuevo Paquete</span>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" @click="addToCart">
                    <v-icon>mdi-cart-plus</v-icon>
                    <span class="ml-2">Añadir al carrito</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- / All Packs -->
      </v-row>
    </v-section>

    <!-- PackmakerPopup -->
    <pack-maker-popup
      :show.sync="dialog"
      @save="savePack"
      ref="packMakerPopup"
    />
    <!-- /PackmakerPopup -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { IProductsPack } from "@/types";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore, PopupStore, ShopStore, UserStore } from "@/store";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "pack-maker-popup": () => import("@/components/popups/PackMakerPopup.vue"),
    "pack-widget": () => import("@/components/widgets/PackWidget.vue"),
  },
})
export default class ShopView extends Vue {
  maxWeight = 1500;
  dialog = false;
  editionMode: number | null = null;
  // TODO: Handle brands filter
  brandsFilter = ["Todos"];

  packs: IProductsPack[] = [];

  get isLogged() {
    return UserStore.isLogged;
  }

  get userName() {
    return UserStore.profile.first_name + " " + UserStore.profile.last_name;
  }

  get tag() {
    return this.$route.params.tag;
  }
  get departmentName(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return DEPARTMENTS[this.tag].labelLang[this.appLang];
  }

  get departmentIcon() {
    return DEPARTMENTS[this.tag].icon;
  }
  /**
   *
   */
  get appLang() {
    return AppStore.lang;
  }

  /**
   * Packs
   */

  addPack() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs["packMakerPopup"].resetPack();
    this.dialog = true;
  }

  /**
   *
   */
  savePack(_pack: IProductsPack) {
    if (Number.isInteger(this.editionMode)) {
      this.packs[this.editionMode as number] = _pack;
      this.editionMode = null;
    } else this.packs.push(_pack);
    this.dialog = false;
    // TODO: Save on vuex
  }

  /**
   *
   */
  editPack(_key: number) {
    this.editionMode = _key;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs["packMakerPopup"].setPack(this.packs[_key]);
    this.dialog = true;
  }

  /**
   *
   */
  deletePack(_packKey: number) {
    this.packs.splice(_packKey, 1);
    this.dialog = false;
  }

  /**
   *
   */
  addToCart() {
    ShopStore.addShoppingCartPacks(this.packs);
    PopupStore.addNotification(
      [
        "Producto añadido al carrito correctamente",
        "Presione aquí para ver más detalles",
      ],
      "success",
      5000,
      {
        name: "shop.cart",
      }
    );
  }

  handleBrandFilter() {
    this.brandsFilter.filter((_val) => {
      if (_val === "Todos") {
        this.brandsFilter = ["Todos"];
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  border: solid 1px rgba($color: #000000, $alpha: 0.2);
  padding: 0 1rem 0 1rem;
}
</style>