<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col-6">
        <div class="text-caption q-mt-sm q-mb-xs">
          {{ productoCarrito.name }}
        </div>
        <div class="text-caption ">
          {{ productoCarrito.cantidad }}u x ${{ productoCarrito.price }}
        </div>
        <div class="text-overline">
          subtotal ${{ productoCarrito.price * productoCarrito.cantidad }}
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm col-4 flex flex-center">
        <q-img class="rounded-borders" :src="productoCarrito.image.url" />
      </q-card-section>
      <q-card-section class="q-pa-xs flex flex-center col-2"
        ><q-btn
          size="sm"
          round
          color="red"
          @click="quitar(productoCarrito.id)"
          icon="close"
        ></q-btn
      ></q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { useStore } from "src/store";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    productoCarrito: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const quitar = (id: string) => {
      console.log(id);
      $q.dialog({
        title: "Confirmar",
        message: "desea quitar el producto del carrito?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        $store.commit("productos/QUITAR_CARRITO", id);
        $q.notify({
          color: "green",
          message: "Producto removido",
        });
      });
    };
    return {
      quitar,
    };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
  background-color: rgb(247, 239, 244);
}
</style>
