<template>
  <div>
    <v-card>
      <v-row>
        <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
          <v-img :src="product.img" class="mx-auto" max-width="20rem" />
          <v-row align-content="center" class="mt-4" no-gutters>
            <v-col v-for="i in 3" :key="i">
              <div class="box-selector py-2">
                <v-img class="mx-auto" :src="product.img" max-width="5rem" />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col xs="12" sm="12" md="8" lg="8" xl="8" cols="12">
          <v-card-title class="font-weight-bold">
            ${{ Number(product.price).toFixed(2) }}
          </v-card-title>
          <v-card-title>{{ product.title }} </v-card-title>
          <v-form>
            <v-card-text>
              <ul class="li-circle">
                <li v-for="(p, i) in product.description" :key="i">
                  {{ p }}
                </li>
              </ul>
            </v-card-text>
            <v-card-text>
              <!-- Delivery method -->
              <v-select class="w-20" label="Recogida" hint="Método de envío" />
              <!-- / Delivery method -->

              <!-- Cant Input -->
              <div class="d-flex d-flex-row align-center">
                <span>
                  <cant-input :cant.sync="cant" :can-minus="canMinus" />
                </span>
                <span class="ml-3">
                  Subtotal: ${{ Number(product.price * cant).toFixed(2) }}
                </span>
              </div>
              <!-- / Cant Input -->

              <!-- Persons info -->
              <v-select
                v-model="personsInfo"
                :items="allPersonsItems"
                @input="limiter"
                class="w-20"
                menu-props="auto"
                label="Destinatarios"
                multiple
                :hint="`${cant} destinatarios requeridos`"
                persistent-hint
                chips
              >
                <template v-slot:prepend-item>
                  <v-list-item class="cursor-pointer" @click="showPopup = true">
                    <v-list-item-icon>
                      <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Nuevo Destinatario</v-list-item-title>
                  </v-list-item>
                </template>
              </v-select>
              <!-- / Persons info -->

              <v-checkbox
                label="Entiendo que este producto tiene un cargo en destino de 5,00 CUC"
              />
              <v-btn color="primary" class="mt-4" @click="addToCart">
                <v-icon class="mr-2">mdi-cart-plus</v-icon>
                Listo para añadir
              </v-btn>
            </v-card-text>
          </v-form>
        </v-col>
      </v-row>
    </v-card>

    <!-- Popup add person -->
    <v-dialog v-model="showPopup" max-width="600px" scrollable>
      <v-card class="pa-2">
        <v-card-title>
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Añadir Destinatario
        </v-card-title>
        <v-form class="pa-3">
          <v-text-field
            v-model="contactForm.first_name"
            placeholder="Nombre"
            label="Nombre"
          />
          <v-text-field
            v-model="contactForm.last_name"
            placeholder="Apellidos"
            label="Apellidos"
          />
          <v-textarea
            v-model="contactForm.address"
            placeholder="Dirección"
            label="Dirección"
          />
          <v-card-actions>
            <v-btn
              color="primary"
              type="submit"
              @click.prevent="submitAddContact"
            >
              <v-icon>mdi-account-plus</v-icon>
              <span class="ml-1">Añadir</span>
            </v-btn>

            <v-btn color="primary" @click="closeAddContact">
              <v-icon>mdi-close</v-icon>
              <span class="ml-1">Cancelar</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Popup add person -->
  </div>
</template>

<script lang='ts'>
import { AuthStore, PopupStore, ShopStore } from "@/store";
import { IProduct, TPackDestinationPerson } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "cant-input": () => import("@/components/forms/shop/ProductCantInput.vue"),
  },
})
export default class AddToCartForm extends Vue {
  @Prop({ type: Object }) readonly product!: IProduct;

  showPopup = false;

  personsInfo: TPackDestinationPerson[] = [];

  cant = 1;

  contactForm: TPackDestinationPerson = {
    first_name: "",
    last_name: "",
    address: "",
  };

  get allPersonsItems() {
    const p: string[] = [];
    ShopStore.userDestinataries.forEach((person) => {
      p.unshift(`${person.first_name} ${person.last_name}`);
    });
    return p;
  }

  get canMinus() {
    return this.cant > 1 ? true : false;
  }

  get isLogged() {
    return AuthStore.isLogged;
  }

  limiter() {
    if (this.personsInfo.length > this.cant) {
      this.personsInfo.shift();
    }
  }

  addToCart() {
    if (this.isLogged) {
      //! Validation
      if (this.cant > this.personsInfo.length) {
        PopupStore.addNotification(
          [
            `Necesita agregar ${
              this.cant - this.personsInfo.length
            } destinatarios`,
          ],
          "error"
        );
      }
      //? Validation Passed
      else {
        ShopStore.addShoppingCartProduct(this.product as IProduct, this.cant);
        this.cant = 1;
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
    } else {
      PopupStore.openAuth("login");
      PopupStore.addNotification(["Por favor, Identifícate"], "warning");
    }
  }
  /**
   *
   */
  submitAddContact() {
    //TODO: Validate form

    ShopStore.addUserDestinatary(this.contactForm);
    this.closeAddContact();
  }

  closeAddContact() {
    this.showPopup = false;
  }
}
</script>