<template>
  <div id="shop-pack-details-view" class="view-container">
    <v-section>
      <v-card flat>
        <v-card-title
          >Productos {{ pack.weight }} ${{ pack.price }}</v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col v-for="(product, key) in pack.products" :key="key">
              <product-card :product="product" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-section>
    <!-- Ajustes -->
    <v-section class="mt-1">
      <v-card flat>
        <v-card-title>Detalles</v-card-title>
        <v-card-text>
          <v-row>
            <v-col xs="12" sm="6">
              <v-select
                label="Cantidad"
                class="w-20"
                outlined
                color="black"
                dense
                :items="cant"
                v-model="pack.cant"
              />

              <v-select
                label="Destinatario"
                :items="['a']"
                outlined
                dense
                color="black"
                class="w-20"
              />

              <!-- Delivery method -->
              <v-select
                class="w-20"
                label="Método de Recogida"
                :items="deliveryMethods"
                dense
                outlined
              />
              <!-- / Delivery method -->
            </v-col>

            <v-col xs="12" sm="6"> </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-section>
    <!-- / Ajustes -->
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "product-card": () => import("@/components/widgets/Product.vue"),
  },
})
export default class PackDetailsView extends Vue {
  get pack() {
    if (this.$route.query.packKey) {
      const key = Number(this.$route.query.packKey);
      return this.packs[key];
    } else {
      return null;
    }
  }

  get packs() {
    return PackStore.packs;
  }

  get cant() {
    const p = [];
    for (let i = 1; i < 10; i++) {
      p.push(i);
    }
    return p;
  }

  get deliveryMethods() {
    return [
      "La Habana Transcargo",
      "Oficina de Correos de su Localidad",
      "La Habana – Aerovaradero",
      "Camagüey – Aerovaradero",
      "Holguín -Aerovaradero",
      "Varadero – Aerovaradero",
      "Santiago de Cuba – Aerovaradero",
    ];
  }
}
</script>