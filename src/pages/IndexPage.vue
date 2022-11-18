<template>
  <q-page class="column items-center justify-center content-center">
    <div >
      <p>Sentidos tea house and </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {},
  setup() {
    const num = ref(0);
    const add = () => {
      num.value = num.value + 1;
    };
    const less = () => {
      num.value = num.value - 1;
    };
    return { num, add, less };
  },
});
</script>
