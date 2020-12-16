<template>
  <div id="shop-packs-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title>Paquetes</v-card-title>
        <v-btn @click="addProduct">Añadir Producto</v-btn>
        <v-card-text>
          <v-row>
            <v-col v-for="(pack, pKey) in packs" :key="'xl' + pKey">
              <pack-card :pack="pack" mode="xl" @details="goToDetails(pKey)" />
            </v-col>
            <v-col v-for="(pack, pKey) in packs" :key="'lg' + pKey">
              <pack-card :pack="pack" mode="lg" @details="goToDetails(pKey)" />
            </v-col>
            <v-col v-for="(pack, pKey) in packs" :key="'md' + pKey">
              <pack-card :pack="pack" mode="md" @details="goToDetails(pKey)" />
            </v-col>
            <v-col v-for="(pack, pKey) in packs" :key="'sm' + pKey">
              <pack-card :pack="pack" mode="sm" @details="goToDetails(pKey)" />
            </v-col>
            <v-col v-for="(pack, pKey) in packs" :key="'xs' + pKey">
              <pack-card :pack="pack" mode="xs" @details="goToDetails(pKey)" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";
import { IProductCart } from "@/types";

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
    const product: IProductCart = {
      title: "Producto " + this.iterator,
      price: this.iterator * 10,
      image: {
        id: 0,
        paths: { sm: "img/logos/logo_300x225.png" },
      },
      weight: 250,
      id: 0,
      cart_cant: 1,
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