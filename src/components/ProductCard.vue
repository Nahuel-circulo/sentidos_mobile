<template>
  <div>
    <q-card class="q-ma-sm">
      <q-img :src="producto.image.url" spinner-color="positive" />

      <q-badge v-if="producto.delivery" color="warning" floating>
        <span class="q-pa-xs">Apto delivery</span>
      </q-badge>
      <q-card-section class="q-pa-xs">
        <div class="text-subtitle2 text-center">{{ producto.name }}</div>
        <div class="text-subtitle text-warning text-center">${{ producto.price }}</div>
      </q-card-section>
      <q-card-actions class="q-pa-xs">
        <q-btn flat dense class="full-width text-positive" @click="openModal()"
          >Agregar</q-btn
        >
      </q-card-actions>
    </q-card>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Cantidad</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            type="number"
            dense
            v-model="cantidad"
            :rules="[(val) => val > 0 || 'solo valores positivios']"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Agregar al carrito" v-close-popup :disable="cantidad<1"  @click="agregarCarrito()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { useStore } from "src/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    producto: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar()
    const $store = useStore()
    const prompt = ref(false);
    const cantidad = ref(1);
    const openModal = () => {
      prompt.value = true;
    };

    const agregarCarrito=()=>{
        $store.commit("productos/AGREGAR_CARRITO",{producto:props.producto,cantidad:cantidad.value})
        $q.notify({
            color:'green',
            message:"Producto agregado correctamente"
        })
    }

    return {
      openModal,
      prompt,
      cantidad,
      agregarCarrito
    };
  },
});
</script>
