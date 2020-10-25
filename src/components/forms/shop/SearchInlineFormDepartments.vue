<template>
  <div>
    <v-form
      class="form-inline"
      @submit.prevent="submit"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <div class="input-group">
        <div
          class="input-group-prepend mr-1"
          :style="`width: ${inputWidth * 0.75}rem`"
        >
          <v-select
            placeholder="Departamento"
            :items="departments"
            v-model="department"
            filled
            dense
          ></v-select>
        </div>
        <v-text-field
          v-model="search"
          placeholder="Buscar Producto"
          dense
          filled
          :style="`width: ${inputWidth}rem`"
        ></v-text-field>
        <div class="input-group-append ml-2">
          <v-btn type="submit" color="primary">
            <v-icon>mdi-magnify</v-icon>Buscar
          </v-btn>
        </div>
      </div>
    </v-form>
    <!-- Small view  -->
    <v-form @submit.prevent="submit" v-else>
      <v-select
        placeholder="Departamento"
        :items="departments"
        v-model="department"
        filled
        dense
      />
      <v-text-field
        v-model="search"
        placeholder="Buscar Producto"
        dense
        filled
      />
      <div class="text-center">
        <v-btn type="submit" color="primary"> Buscar </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang='ts'>
import { IVSelectItem, TDepartment } from "@/types";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store/App";

@Component
export default class SearchInlineFormDepartments extends Vue {
  created() {
    this.department = this.activeDepartment;
    for (const key in DEPARTMENTS) {
      this.departments.push({
        // TODO: Remove TS IGNORE
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        text: DEPARTMENTS[key as keyof typeof DEPARTMENTS].labelLang[
          AppStore.lang
        ].toLocaleUpperCase(),
        value: key,
      });
    }
  }

  @Prop(String) readonly activeDepartment!: TDepartment;

  search = "";
  department: TDepartment = "automotriz";
  departments: IVSelectItem[] = [];

  @Watch("activeDepartment")
  onActiveDepartmentChange(_to: TDepartment) {
    this.department = _to;
  }

  get inputWidth() {
    if (this.$vuetify.breakpoint.mdAndUp) {
      return 20;
    } else if (this.$vuetify.breakpoint.smOnly) {
      return 14;
    } else {
      return 0;
    }
  }

  submit() {
    console.log("Submit Search");
  }
}
</script>