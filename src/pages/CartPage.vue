<template>
  <q-page class="bg-grey-2">
    <h4 class="q-my-none text-center">Carrito</h4>

    <carrido-card
      style="margin: 20px auto"
      :producto-carrito="producto"
      v-for="producto in productosCarrito"
      :key="producto"
    />

    <p
      v-if="!productosCarrito.length"
      class="text-center text-h5 text-grey"
      style="margin: 20px auto; max-width: 300px"
    >
      No ha agregado productos al carrito.
    </p>
    <div class="row justify-center items-center q-pa-lg">
      <div class="q-gutter-sm column">
        <q-list v-if="productosCarrito.length">
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio
                :disable="!aptoDelivery"
                v-model="entrega"
                val="Domicilio"
                color="teal"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                >Envío a domicilio + ${{ totalCarrito * 0.01 }}</q-item-label
              >
              <q-item-label v-if="!aptoDelivery" caption
                >No disponible, posee productos no aptos para envío
              </q-item-label>
              <q-item-label caption class="text-red"
                >Solo disponible 30 cuadras a la redonda
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="entrega" val="Sucursal" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Retiro por sucursal</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-8">
        <h5 v-if="entrega == 'Domicilio'" class="q-my-md">
          Total: ${{ totalCarrito + totalCarrito * 0.01 }}
        </h5>
        <h5 v-else class="q-my-md">Total: ${{ totalCarrito }}</h5>
      </div>
      <div class="col text-right">
        <q-btn
          color="positive"
          @click="() => comprarCarrito()"
          :disable="productosCarrito.length == 0"
          >Comprar carrito</q-btn
        >
      </div>
      <p class="q-my-xs text-caption text-red">
        Solo se permite pago con tarjetas de débido.
      </p>
    </div>
    <div
      v-show="showPagar"
      class="q-pa-sm"
      style="min-width: 250px; max-width: 300px; margin: 0 auto; color: white"
    >
      <q-input
        v-if="entrega == 'Domicilio'"
        class="q-mb-md"
        bg-color="white"
        color="warning"
        outlined
        v-model="direccion"
        label="Dirección"
        :rules="[
          (val) => val.length > 10 || 'Debe ingresar una dirección válida',
        ]"
      />

      <q-input
        class="q-mb-md"
        bg-color="white"
        color="warning"
        outlined
        v-model="nombre"
        label="Nombre y apellido como figura en la tarjeta"
        :rules="[(val) => val.length > 3 || 'Debe ingresar un nombre']"
      />
      <q-input
        class="q-mb-md"
        outlined
        color="warning"
        bg-color="white"
        v-model="cardNumber"
        label="Númeto de tarjeta"
        mask="#### - #### - #### - ####"
        fill-mask="#"
        unmasked-value
        :rules="[(val) => val.length == 16 || 'Ingrese los 16 digitos.']"
      />

      <q-input
        class="q-mb-md"
        outlined
        color="warning"
        bg-color="white"
        v-model="codTarjeta"
        label="Código de seguridad"
        mask="###"
        :rules="[
          (val) =>
            val.length == 3 ||
            'Ingrese los 3 digitos en el dorso de la tarjeta',
        ]"
        unmasked-value
      />
      <p></p>
      <q-btn color="positive" :disable="!isValid" @click="crearFactura()"
        >Confirmar</q-btn
      >
    </div>
  </q-page>
</template>
<script lang="ts">
import CarridoCard from "src/components/CarridoCard.vue";
import { useStore } from "src/store";
import { defineComponent, computed, ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";
import { ProductoCarrito } from "src/store/productos/state";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { CarridoCard },
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const entrega = ref("Sucursal");
    const $store = useStore();
    const productosCarrito = computed(
      () => $store.getters["productos/getCarrito"]
    );
    const aptoDelivery = computed(
      () => $store.getters["productos/getAptoDelivery"]
    );
    const totalCarrito = computed(
      () => $store.getters["productos/getTotalCarrito"]
    );
    const dialog = ref(false);
    const usuario = computed(() => $store.getters["usuario/getUsuarioLogeado"]);

    const cardNumber = ref("");
    const codTarjeta = ref("");
    const nombre = ref("");
    const direccion = ref("");
    const showPagar = ref(false);
    const comprarCarrito = () => {
      showPagar.value = true;
      productosCarrito.value.forEach((producto: ProductoCarrito) => {
        $store.dispatch("productos/postPedido", {
          identificador: usuario.value.id,
          cantidad: producto.cantidad,
          producto: producto.id,
        });
      });
    };
    const isValid = computed(() => {
      return (
        cardNumber.value.length == 16 &&
        codTarjeta.value.length == 3 &&
        nombre.value.length > 3
      );
    });

    const crearFactura = () => {
      $q.dialog({
        title: "Confirmar",
        message: "Desea realizar el pago?",
        cancel: true,
        persistent: true,
      })
        /* infoPedido: { user: string, retiro: string } */
        .onOk(() => {
          $store.dispatch("productos/postFactura", {
            user: usuario.value.id,
            retiro: entrega.value,
          });
        })
        .onOk(() => {
          $q.dialog({
            title: "Pedido generado",
            message:
              "Podrá visualizar su factura en la seccion mis pedidos, muchas gracias.",
            persistent: true,
            ok: "Ir a mis pedidos",
          });
        })
        .onOk(() => {
          $router.push("/mis-pedidos");
        });
    };

    const vaciarCarrito = () => {
      $store.commit("productos/LIMPIAR_CARRITO");
    };
    return {
      productosCarrito,
      totalCarrito,
      entrega,
      aptoDelivery,
      dialog,
      cardNumber,
      codTarjeta,
      nombre,
      isValid,
      showPagar,
      crearFactura,
      vaciarCarrito,
      comprarCarrito,
      usuario,
      direccion
    };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
}
</style>
