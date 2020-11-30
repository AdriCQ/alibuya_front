<template>
  <div id="shop-packs-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title>Paquetes</v-card-title>
        <v-btn @click="addProduct">Añadir Producto</v-btn>
        <v-card-text>
          <v-row>
            <v-col v-for="(pack, pKey) in packs" :key="pKey">
              <pack-card :pack="pack" :size="12" @details="goToDetails(pKey)" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { IProduct } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "pack-card": () => import("@/components/widgets/packs/PackCard.vue"),
  },
})
export default class ShopPacksView extends Vue {
  iterator = 1;
  get packs() {
    return PackStore.packs;
  }

  addProduct() {
    const product: IProduct = {
      title: "Producto " + this.iterator,
      price: this.iterator * 10,
      images: "img/logos/logo_300x225.png",
      weight: 250,
      cant: 1,
    };
    PackStore.addProduct(product);
    this.iterator++;
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