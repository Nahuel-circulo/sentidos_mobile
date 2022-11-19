import { payloadAPI } from 'src/api/payloadApi';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductosStateInterface } from './state';
import getters from './getters';

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
  postPedido: async ({ commit, state, dispatch }, pedido: { identificador: string, cantidad: number, producto: string }) => {
    try {
      const { data } = await payloadAPI.post(`/pedido`, {
        identificador: pedido.identificador,
        cantidad: pedido.cantidad,
        producto: pedido.producto

      })
      commit('AGREGAR_PEDIDO', data.doc.id)
    } catch (error) {
      console.log(error);
    }
  },
  postFactura: async ({ commit, state, getters }, infoPedido: { user: string, retiro: string }) => {
    /* TODO:fix usuario */

    try {
      const { data } = await payloadAPI.post('/factura', {
        total: infoPedido.retiro == 'Sucursal' ? getters['getTotalCarrito'] : getters['getTotalCarrito'] + getters['getTotalCarrito'] * 0.01,
        pedidos: [...state.pedidosArray],
        usuario: infoPedido.user,
        metodo_de_pago: "6363fe1576c49f9dae7f4b54"
      })
      console.log(data)
      commit('LIMPIAR_PEDIDOS')
      commit('LIMPIAR_CARRITO')
    } catch (error) {
      console.log(error)
    }
  }
};

export default actions;
