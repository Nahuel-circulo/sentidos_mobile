<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="border-bottom: 5px solid #bb8a00">
      <q-toolbar class="bg-dark q-py-md">
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sentidos </q-toolbar-title>
        <q-btn flat round dense to="/cart" icon="shopping_cart">
          <q-badge floating color="warning">{{ 0 }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header v-if="user">
          {{ user.name }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item class="q-mt-md">
          <q-btn color="positive" @click="cerrarSesion"> Cerrar Sesion </q-btn>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useStore } from "src/store";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Menú",
    icon: "menu",
    link: "/menu",
  },
  {
    title: "Carrito",
    icon: "shopping_cart",
    link: "/cart",
  },
  {
    title: "Mis pedidos",
    icon: "store",
    link: "/mis-pedidos",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const leftDrawerOpen = ref(false);

    const cerrarSesion = () => {
      $router.push("/");
    };
    
    onBeforeUnmount(() => $store.commit("usuario/SET_USUARIO_LOGEADO", {}));
    const user = computed(() => $store.getters["usuario/getUsuarioLogeado"]);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      user,
      cerrarSesion,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
