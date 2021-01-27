<template>
  <v-data-table :headers="headers" :items="products" hide-default-footer>
    <!-- Product Simple -->
    <template #item.title="{ item }">
      <product-simple :product="item.product" :props="productSimpleProps" />
    </template>
    <!-- Product Simple -->

    <!-- Color -->
    <template #item.color="{ item }">
      <v-btn
        :color="item.color.value"
        depressed
        :ripple="false"
        fab
        x-small
        class="cursor-default"
      />
    </template>
    <!-- / Color -->

    <!-- Size -->
    <template #item.size="{ item }">
      <v-chip> {{ item.size }} </v-chip>
    </template>
    <!-- / Size -->

    <!-- Price -->
    <template #item.price="{ item }">
      $ {{ Number(item.price).toFixed(2) }}
    </template>
    <!-- / Price -->

    <!-- Total -->
    <template #item.total="{ item }">
      $ {{ Number(item.total).toFixed(2) }}
    </template>
    <!-- / Total -->
  </v-data-table>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { CartStore } from "@/store";
import { IColor, IProductCart, IProductCartInTable } from "@/types";

@Component({
  components: {
    "product-simple": () =>
      import("@/components/parts/shop/CartProductSimple.vue"),
  },
})
export default class CartGrid extends Vue {
  headersCommon = {
    class: "text-body-1 grey--text text--darken-3 font-weight-bold",
    align: "center",
  };

  productSimpleProps = {
    cardProps: {
      color: "transparent",
      maxWidth: 400,
    },
    showTitle: true,
    titleOneLine: false,
    fluid: true,
    horizontal: true,
    bodyClass: "pa-0 ",
    titleClass: "px-1 text-body-2",
    // override class
    class: "ml-0 mr-auto",
  };

  /**
   * Getters
   */
  get headers() {
    return [
      {
        text: "Producto",
        value: "title",
        sortable: false,
        align: "start",
        class: this.headersCommon.class,
      },
      {
        text: "Color",
        value: "color",
        sortable: false,
        ...this.headersCommon,
      },
      {
        text: "Talla",
        value: "size",
        sortable: false,
        ...this.headersCommon,
      },
      {
        text: "Precio",
        value: "price",
        sortable: false,
        ...this.headersCommon,
      },
      {
        text: "Cantidad",
        value: "cant",
        sortable: false,
        ...this.headersCommon,
      },
      {
        text: "Total",
        value: "total",
        sortable: false,
        ...this.headersCommon,
      },
    ];
  }

  get products(): IProductCartInTable[] {
    return CartStore.products.map((_p: IProductCart) => {
      return {
        title: _p.title,
        color: _p.options_details?.color as IColor,
        size: _p.options_details?.size as string,
        price: _p.price,
        cant: _p.cart_cant,
        total: _p.price * _p.cart_cant,
        product: _p,
      };
    });
  }

  get cantProducts() {
    return CartStore.cantProducts;
  }
}
</script>
