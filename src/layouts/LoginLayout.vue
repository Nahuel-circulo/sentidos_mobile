<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="my-bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.my-bg {
  background-color: hsla(0, 76%, 78%, 0.44);
  background-image: radial-gradient(
      at 87% 8%,
      hsla(28, 100%, 74%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 13% 46%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
    radial-gradient(at 61% 81%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
    radial-gradient(at 6% 90%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
    radial-gradient(at 25% 11%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);
}
</style>
