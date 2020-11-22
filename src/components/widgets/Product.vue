<template>
  <div>
    <component
      :is="activeComponent"
      :product="product"
      :horizontal="horizontal"
      :badge="badge"
      :editable="editable"
      :noLink="noLink"
    />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component({
  components: {
    "default-product": () =>
      import("@/components/widgets/products/Default.vue"),
  },
})
export default class ProductWidget extends Vue {
  @Prop({
    type: Object,
    default: {
      title: "",
      price: "",
      img: "",
      description: "",
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly horizontal!: boolean;

  @Prop({
    type: String,
    default: "",
  })
  readonly badge!: string;

  @Prop(Boolean) readonly editable!: boolean;
  @Prop(Boolean) readonly noLink!: boolean;
  @Prop({
    type: String,
    default: "default",
  })
  readonly type!: string;

  get activeComponent() {
    switch (this.type) {
      default:
        return "default-product";
    }
  }
}
</script>