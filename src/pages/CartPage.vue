<template>
  <q-page>
    <h4 class="q-my-lg text-center">Carrito</h4>

    <carrido-card
      style="margin: 20px auto"
      :producto-carrito="producto"
      v-for="producto in productosCarrito"
      :key="producto"
    />
    <div class="row justify-center items-center q-pa-lg">
      <div class="col-8">
        <h5 class="q-my-md">Total: ${{ totalCarrito }}</h5>
      </div>
      <div class="col text-right"><q-btn color="positive" :disable="productosCarrito.length == 0">Pagar</q-btn></div>
    </div>
  </q-page>
</template>
<script lang="ts">
import CarridoCard from "src/components/CarridoCard.vue";
import { useStore } from "src/store";
import { defineComponent, computed } from "vue";

export default defineComponent({
  components: { CarridoCard },
  setup() {
    const $store = useStore();
    const productosCarrito = computed(
      () => $store.getters["productos/getCarrito"]
    );
    const totalCarrito = computed(
      () => $store.getters["productos/getTotalCarrito"]
    );
    return {
      productosCarrito,
      totalCarrito,
    };
  },
});
</script>
