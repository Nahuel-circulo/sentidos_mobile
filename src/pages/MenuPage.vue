<template>
  <q-page>
    <h4 class="text-warning q-my-md">Menú</h4>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-positive text-white shadow-2"
      :breakpoint="0"
      indicator-color="dark"
    >
      <q-tab
        class="q-py-sm"
        name="restaurant"
        icon="restaurant"
        label="Restaurante"
      />
      <q-tab class="q-py-sm" name="tea" icon="coffee" label="Casa de té" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated >
      <q-tab-panel name="restaurant">
        <div class="row" v-if="restaurantLoaded">
          <q-intersection
            once
            v-for="producto in productosRestaurante"
            :key="producto.id"
            transition="scale"
            class="example-item col-6"
          >
            <q-card class="q-ma-sm">
              <q-img :src="producto.image.url" spinner-color="positive"/>

              <q-badge v-if="producto.delivery" color="warning" floating>
                <span class="q-pa-xs">Apto delivery</span>
              </q-badge>
              <q-card-section class="q-pa-xs">
                <div class="text-subtitle2">{{ producto.name }}</div>
                <div class="text-subtitle text-warning" >${{ producto.price }}</div>
              </q-card-section>
              <q-card-actions class="q-pa-xs">
                <q-btn flat dense class="full-width text-positive">Agregar</q-btn>
              </q-card-actions>
            </q-card>
          </q-intersection>
        </div>
        <div v-else style="width: 100%;  height: 70vh">
          <q-inner-loading :showing="!restaurantLoaded">
            <q-spinner-radio size="50px" color="positive" />
          </q-inner-loading>
        </div>
      </q-tab-panel>

      <q-tab-panel name="tea">
        <div class="row" v-if="teaLoaded">
          <q-intersection
            v-for="producto in productosTe"
            :key="producto.id"
            transition="scale"
            class="example-item col-6"
          >
            <q-card class="q-ma-sm">
              <q-img :src="producto.image.url" spinner-color="positive"/>

              <q-badge v-if="producto.delivery" color="warning" floating>
                <span class="q-pa-xs">Apto delivery</span>
              </q-badge>
              <q-card-section class="q-pa-xs">
                <div class="text-subtitle2">{{ producto.name }}</div>
                <div class="text-subtitle text-warning" >${{ producto.price }}</div>
              </q-card-section>
              <q-card-actions class="q-pa-xs">
                <q-btn flat dense class="full-width text-positive">Agregar</q-btn>
              </q-card-actions>
            </q-card>
          </q-intersection>
        </div>
        <div v-else style="width: 100%; background-color: red; height: 100vh">
          <q-inner-loading :showing="!teaLoaded">
            <q-spinner-radio size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { useStore } from "src/store";
import { Producto } from "src/store/productos/state";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const tab = ref("restaurant");
    const $store = useStore();

    const productosTe = computed<Producto[]>(
      () => $store.getters["productos/getProductosTe"]
    );
    const productosRestaurante = computed<Producto[]>(
      () => $store.getters["productos/getProductosRestaurante"]
    );
    const fetchProductos = () => {
      $store.dispatch("productos/fetchProductosRestaurante");
      $store.dispatch("productos/fetchProductosTe");
    };

    fetchProductos();

    const teaLoaded = computed(() => $store.getters["productos/getTeaLoaded"]);
    const restaurantLoaded = computed(
      () => $store.getters["productos/getRestaurantLoaded"]
    );
    return {
      tab,
      productosTe,
      productosRestaurante,
      teaLoaded,
      restaurantLoaded,
    };
  },
});
</script>
