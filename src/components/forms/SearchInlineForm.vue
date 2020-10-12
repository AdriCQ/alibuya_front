<template>
  <v-form class="form-inline" @submit.prevent="submit">
    <div class="input-group">
      <div class="input-group-prepend mr-1" style="width: 12rem">
        <v-select :items="departments" filled dense></v-select>
      </div>
      <v-text-field
        v-model="search"
        placeholder="Buscar Producto"
        dense
        filled
        style="width: 20rem"
      ></v-text-field>
      <div class="input-group-append ml-2">
        <v-btn type="submit" color="secondary">
          <v-icon>mdi-account</v-icon>Buscar
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script lang='ts'>
import { IVSelectItem } from "@/types";
import { Vue, Component } from "vue-property-decorator";
import { DEPARTMENTS } from "@/utils/const";
import { AppStore } from "@/store/App";

@Component
export default class SearchInlineForm extends Vue {
  created() {
    for (const key in DEPARTMENTS) {
      this.departments.push({
        text: DEPARTMENTS[key as keyof typeof DEPARTMENTS].label[
          AppStore.lang
        ].toLocaleUpperCase(),
        value: key,
      });
    }
  }

  search = "";
  departments: IVSelectItem[] = [];

  submit() {
    console.log("Submit Search");
  }
}
</script>