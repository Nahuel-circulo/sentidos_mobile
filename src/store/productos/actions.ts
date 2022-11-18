import { payloadAPI } from 'src/api/payloadApi';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductosStateInterface } from './state';

const actions: ActionTree<ProductosStateInterface, StateInterface> = {
  async fetchProductosRestaurante({ state, commit }) {
    commit('SET_RESTAURANT_LOADED', false)
    const { data } = await payloadAPI.get(`/producto?where[categoria][equals]=6362d349c20c424d4b387d6c`)
    commit('SET_PRODUCTOS_RESTAURANTE', data.docs)
    commit('SET_RESTAURANT_LOADED', true)
    console.log("restaurante ", data.docs)

  },
  async fetchProductosTe({ state, commit }) {
    commit('SET_TEA_LOADED', false)
    const { data } = await payloadAPI.get(`/producto?where[categoria][equals]=6362d378c20c424d4b387d8b`)
    commit('SET_PRODUCTOS_TE', data.docs)
    commit('SET_TEA_LOADED', true)
    console.log("casa de te ", data.docs)
  },
};

export default actions;
