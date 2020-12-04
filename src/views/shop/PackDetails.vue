<template>
  <div id="shop-pack-details-view" class="view-container">
    <!-- Ajustes -->
    <v-section class="mt-1">
      <v-card flat>
        <v-card-title>Detalles</v-card-title>
        <v-row>
          <v-col xs="12" sm="6">
            <v-card-text><b>Peso Total</b> {{ totalWeight }}</v-card-text>
            <v-card-text>
              <b>Precio Total</b> ${{
                Number(pack.price * pack.cant).toFixed(2)
              }}</v-card-text
            >
          </v-col>
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
        </v-row>
      </v-card>
    </v-section>
    <!-- / Ajustes -->

    <v-section>
      <v-card flat>
        <v-card-title>Productos </v-card-title>
        <products-group
          advanced
          :max="pack.products.length"
          :products="pack.products"
        />
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { PackStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
    "products-group": () => import("@/components/data/ProductsGroup.vue"),
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

  get totalWeight() {
    if (this.pack && this.pack.cant) {
      const weight = Number(this.pack.price * this.pack.cant);
      console.log(weight, "Peso");
      if (weight > 1500) {
        return (
          Number(weight / 1000)
            .toFixed(2)
            .toString() + " Kg"
        );
      } else {
        return weight.toString() + " g";
      }
    } else {
      return "0g";
    }
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