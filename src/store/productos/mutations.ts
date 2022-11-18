import { MutationTree } from 'vuex';
import { Producto, ProductosStateInterface } from './state';

const mutation: MutationTree<ProductosStateInterface> = {
  SET_PRODUCTOS_RESTAURANTE(state: ProductosStateInterface, payload: Array<Producto>) {
    state.productosRestaurante = payload
  },
  SET_PRODUCTOS_TE(state: ProductosStateInterface, payload: Array<Producto>) {
    state.productosTe = payload
  },
  SET_RESTAURANT_LOADED(state: ProductosStateInterface, payload: Boolean) {
    state.restaurantLoaded = payload
  },
  SET_TEA_LOADED(state: ProductosStateInterface, payload: Boolean) {
    state.teaLoaded = payload
  }
};

export default mutation;
