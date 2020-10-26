<template>
  <div class="production-description pt-3">
    <p class="font-weight-bold">
      Cantidad permitida en la Aduana: 2 <br />
      Arancel Aduanal a pagar en Cuba: 20 CUC
    </p>
    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en La Habana Transcargo
            </th>

            <th>
              Transcargo / Dirección de RecogidaAve del Puerto (S/N) y Línea del
              Ferrocarril Municipio Regla Ciudad de la Habana |7690-3600 ext.
              1128
            </th>
          </tr>

          <tr>
            <th>
              Transcargo / Atención al Cliente Correo electrónico:
              marcos@transcargo.transnet.cu Calle Fabrica # 54 e/ Aspurú y Línea
              de Ferrocarril, Habana Vieja Seguimiento:
              www.transcargo.transnet.cu
            </th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida Oficina de Correos de su Localidad
            </th>

            <th>
              Correos / Recogida del Producto en Oficina de Correos de la
              Persona que recibe el envío.
            </th>
          </tr>

          <tr>
            <th>
              Oficina Central EMCI: Vento km 31/2 e/Línea de Ferrocarril y
              Camagüey, Municipio Cerro, La Habana. Teléfonos: 7-6491435 /
              7-6417338 Email: atencion.cliente@mci.correos.cu | Seguimiento:
              www.correos.cu
            </th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en la Habana – Aerovaradero
            </th>

            <th>
              Aerovaradero / Almacén de carga del Aeropuerto Jose Martí,
              Carretera Wajay km 1/2 Municipio Boyeros
            </th>
          </tr>

          <tr>
            <th>
              Teléfonos: 649 0215 / 649 0214 ext. 0 – Seguimiento:
              http://www.aerovaradero.com.cu/
            </th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en Camagüey – Aerovaradero
            </th>

            <th>
              Aerovaradero / Aeropuerto Internacional ” Ignacio Agramonte ” –
              Carretera Nuevitas km 7½, Camagüey.
            </th>
          </tr>

          <tr>
            <th>Seguimiento: http://www.aerovaradero.com.cu/</th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en Holguín -Aerovaradero
            </th>

            <th>
              Aerovaradero / Carretera Central Km. 11 vía Bayamo. Aeropuerto
              “Frank País”.
            </th>
          </tr>

          <tr>
            <th>Seguimiento: http://www.aerovaradero.com.cu/</th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en Varadero – Aerovaradero
            </th>

            <th>
              Aerovaradero /Aeropuerto Internacional “Juan G. Gómez”, Carretera
              Regalito KM 5 ½. Matanzas.
            </th>
          </tr>

          <tr>
            <th>Seguimiento: http://www.aerovaradero.com.cu/</th>
          </tr>
        </thead>
      </template>
    </v-simple-table>

    <v-simple-table class="table-bordered">
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2" class="text-body-2 font-weight-bold">
              Recogida en Santiago de Cuba – Aerovaradero
            </th>

            <th>Aerovaradero /Aeropuerto “Antonio Maceo” Km 2 ½</th>
          </tr>

          <tr>
            <th>Seguimiento: http://www.aerovaradero.com.cu/</th>
          </tr>
        </thead>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ProductionDescription extends Vue {}
</script>