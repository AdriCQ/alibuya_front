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
                Number(packPrice).toFixed(2)
              }}</v-card-text
            >
          </v-col>
          <v-col xs="12" sm="6">
            <v-card-text>
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
                :items="destinataries"
                v-model="form.destinataryId"
                item-text="full_name"
                item-value="id"
                outlined
                dense
                color="black"
                class="w-20"
              >
                <template v-slot:prepend-item>
                  <v-list-item ripple @click="preAddDestinatary">
                    <v-list-item-action>
                      <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> Nuevo </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider> </template
              ></v-select>

              <!-- Delivery method -->
              <v-select
                class="w-20"
                label="Método de Recogida"
                v-model="form.deliveryMethod"
                :items="deliveryMethods"
                color="black"
                dense
                outlined
              />
              <!-- / Delivery method -->
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-actions class="d-flex">
          <v-btn color="primary" class="ma-1 black--text" @click="save()"
            >Guardar</v-btn
          >
          <v-btn class="ma-1" @click="cancel">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-section>
    <!-- / Ajustes -->

    <v-section>
      <v-card flat color="transparent">
        <v-card-title>Productos </v-card-title>
        <v-row>
          <v-col
            v-for="(product, prodKey) in pack.products"
            :key="`product-col-${prodKey}`"
          >
            <product-editable :product="product" @remove="remove(prodKey)" />
          </v-col>
        </v-row>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { CartStore, PopupStore, UserStore } from "@/store";
import { Component, Mixins } from "vue-property-decorator";
import {
  IProductCart,
  IProductsPack,
  IStorePackParam,
  IDictionary,
} from "@/types";
import { RouterMixin } from "@/mixins";

@Component({
  components: {
    "product-editable": () => import("@/components/widgets/products/Edit.vue"),
  },
})
export default class PackDetailsView extends Mixins(RouterMixin) {
  created() {
    UserStore.getContacts().catch((error) => console.log(error));
  }

  form = {
    deliveryMethod: "",
    destinataryId: 0,
  };

  get packKey() {
    return Number(this.$route.query.packKey);
  }

  get pack() {
    if (this.$route.query.packKey) {
      return this.packs[this.packKey];
    } else {
      return null;
    }
  }

  get packs() {
    return CartStore.packs;
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
      const weight = Number(this.pack.weight * this.pack.cant);
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

  get packPrice() {
    const key = Number(this.$route.query.packKey);
    return CartStore.getPackPrice(key);
  }

  get destinataries() {
    const dest: any = [];
    UserStore.contacts.forEach((contact, key) => {
      const temp: any = contact;
      temp.full_name = contact.first_name + " " + contact.last_name;
      dest.push(temp);
    });
    return dest;
  }

  remove(_key: number) {
    if ((this.pack?.products as IProductCart[]).length > 1)
      CartStore.removePackProduct(this.packKey, _key);
    else {
      this.$router.back();
      CartStore.removeShoppingCartPack(this.packKey);
    }
  }

  save() {
    // TODO: Validate
    // Get Destinatary id
    if (UserStore.getContactById(this.form.destinataryId))
      CartStore._packs[this.packKey].destinataries = [
        UserStore.getContactById(this.form.destinataryId),
      ];
    CartStore._packs[this.packKey].delivery_method = this.form.deliveryMethod;
    // Store on Server
    const storePack: IStorePackParam = {
      delivery_method: (this.pack as IProductsPack).delivery_method as string,
      destinataries: (this.pack as IProductsPack).destinataries as any[],
      products: [],
    };
    (this.pack as IProductsPack).products.forEach((product) => {
      storePack.products.push({
        id: product.id,
        cart_cant: product.cart_cant,
        options_details: product.options_details as IDictionary<
          string | number
        >,
      });
    });
    CartStore.storePack(storePack)
      .then(() => {
        this.$router.push({ name: "shop.cart" });
      })
      .catch((error) => console.log(error));
  }

  cancel() {
    this.$router.back();
  }

  /**
   * -----------------------------------------
   *	Destinataries
   * -----------------------------------------
   */

  preAddDestinatary() {
    PopupStore.showEditContact(null);
  }
}
</script>