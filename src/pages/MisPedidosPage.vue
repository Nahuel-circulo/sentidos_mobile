<template>
  <q-page>
    <q-img src="../assets/pedidos.png " spinner-color="positive">
      <div class="absolute-full text-h4 flex flex-center">Mis Facturas</div>
    </q-img>
    <q-table
      class="col-12 q-mt-md bg-grey-1"
      title="Listado de facturas emitidas"
      :rows="facturas"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
      hide-pagination
      no-data-label="No hay facturas - seleccione otro rango de fechas"
      :virtual-scroll-item-size="50"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="fecha" :props="props">
            {{ props.row.createdAt.slice(0, 10) }}
          </q-td>
          <q-td key="total" :props="props"> ${{ props.row.total }} </q-td>
          <q-td key="ver">
            <q-btn size="sm" color="positive" @click="verFactura(props.row)"
              >Ver</q-btn
            ></q-td
          >
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog" full-height>
      <q-card
        v-if="facturaActiva"
        class="column full-height"
        style="width: 300px"
      >
        <q-card-section class="col q-pt-md ">
          <div id="factura" ref="factura">
            <p class="q-ma-xs">Sentidos Tea House & Restaurant</p>
            <p class="q-ma-xs">C.U.I.T. Nro 30692138747</p>
            <p class="q-ma-xs">Ing. Brutos: 30692138747</p>
            <p class="q-ma-xs">Inicio de Actividades: 17/12/1996</p>
            <p class="q-ma-xs">IVA Responsable inscripto</p>
            <p class="q-ma-xs">A CONSUMIDOR FINAL</p>
            <p class="q-mt-md">Cod. Factura : {{ facturaActiva.id }}</p>

            <p>Fecha: {{ facturaActiva.createdAt }}</p>

            <div>
              <div
                class="q-ma-xs"
                v-for="pedido in facturaActiva.pedidos"
                :key="pedido.id"
              >
                <div class="row">
                  <div class="col-8">{{ pedido.producto.name }}</div>
                  <div class="col-2">x({{ pedido.cantidad }})</div>
                  <div class="col-2">
                    ${{ pedido.cantidad * pedido.producto.price }}
                  </div>
                </div>
              </div>
              <h6 class="q-ma-sm">total ${{ facturaActiva.total }}</h6>
            </div>
            <q-img
              style="margin: 0 auto"
              src="../assets/qr.jpg"
              width="200px"
              :ratio="1"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="warning" @click="generarPDF">Descargar </q-btn>
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script lang="ts">
import { useStore } from "src/store";
import { defineComponent, computed, ref } from "vue";
import { Factura } from "../store/user/state";
import { jsPDF } from "jspdf";

export default defineComponent({
  setup() {
    const $store = useStore();
    const user = computed(() => $store.getters["usuario/getUsuarioLogeado"]);
    const facturas = computed(() => $store.getters["usuario/getFacturas"]);

    $store.dispatch("usuario/fetchFacturas", user.value.id);

    const columns = [
      {
        name: "fecha",
        label: "Fecha",
        sortable: true,
      },
      { name: "total", label: "Total facturado", sortable: true },
      { name: "ver", label: "Ver" },
    ];
    const facturaActiva = ref();

    const dialog = ref(false);
    const verFactura = (factura: Factura) => {
      facturaActiva.value = factura;
      console.log(factura.id);
      dialog.value = true;
    };

    const factura = ref();

    const generarPDF = () => {
      console.log(factura.value);
      let doc = new jsPDF();
      doc.html(factura.value, {
        callback: (pdf)=> {
          pdf.save('factura')
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 200,
        windowWidth: 350,
      })
    };

    return {
      facturas,
      columns,
      dialog,
      verFactura,
      facturaActiva,
      generarPDF,
      factura,
    };
  },
});
</script>
