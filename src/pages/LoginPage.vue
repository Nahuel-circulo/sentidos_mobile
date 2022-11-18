<template>
  <q-page>
    <div class="row justify-center items-center">
      <q-img src="../assets/logo.svg" class="q-mt-xl" width="80%" spinner-color="positive"></q-img>
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-md q-mt-lg"
      >
        <q-input
          bg-color="white"
          standout="text-warning"
          ref="nameRef"
          square
          outlined
          v-model="name"
          label="Email *"
          lazy-rules
          :rules="nameRules"
        />

        <q-input
          standout="text-warning"
          bg-color="white"
          label="Contraseña *"
          v-model="password"
          square
          outlined
          ref="passwordRef"
          :type="isPwd ? 'password' : 'text'"
          :rules="passwordRules"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="row justify-center">
          <q-btn label="Ingresar" type="submit" color="positive" />
        </div>
        <p>Aún no tienes cuenta? Regístrate aquí</p>
      </form>
    </div>
  </q-page>
</template>

<script lang="ts">

import { useQuasar } from "quasar";
import { useStore } from "src/store";
import { defineComponent, ref,watch,computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $store = useStore();
    const $router = useRouter()
    const $q = useQuasar();
    const isPwd = ref(true);
    const name = ref("");
    const nameRef = ref();

    const password = ref("");
    const passwordRef = ref();
    const errorMessage = computed(()=>$store.getters['usuario/getErrorMessage'])
    const usuario = computed(()=>$store.getters['usuario/getUsuarioLogeado'])

    watch(errorMessage,(newValue)=>{
      if (newValue != '') {
          $q.notify({
            message:errorMessage.value,
            color:'red'
          })
      }
      $store.commit('usuario/SET_ERROR_MESSAGE','')
    })
    watch(usuario,(newValue)=>{
      if (newValue) {
          $router.push('/menu')
      }
    })

    return {
      $store,
      name,
      nameRef,
      nameRules: [
        (val: any) => (val && val.length > 0) || "Por favor ingrese su email",
      ],
      isPwd,
      password,
      passwordRef,
      passwordRules: [
        (val: any) =>
          (val !== null && val !== "") || "Por favor ingrese una contraseña",
      ],

      onSubmit() {
        nameRef.value.validate();
        passwordRef.value.validate();

        if (!nameRef.value.hasError || !passwordRef.value.hasError) {

          $store.dispatch('usuario/login',{email:name.value,password:password.value})
          /* $q.notify({
            color: "green",
            message: "Ingresando",
          }); */
        }
      },

      onReset() {
        name.value = "";
        password.value = "";

        nameRef.value.resetValidation();
        passwordRef.value.resetValidation();
      },
    };
  },
});
</script>
