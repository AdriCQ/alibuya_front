
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductBaseClass extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;

  // props to children
  @Prop(Object) readonly imageProps!: object;
  @Prop(Object) readonly cardProps!: object;
    
  // methods 
  showProductDetails(id: number) {
    if (id) {
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
          query: {
            productId: id.toString(),
          },
        });
    }
  }

}
