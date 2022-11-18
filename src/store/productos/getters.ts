import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductosStateInterface } from './state';

const getters: GetterTree<ProductosStateInterface, StateInterface> = {
  getProductosRestaurante(state) {
    return state.productosRestaurante
  },
  getProductosTe(state) {
    return state.productosTe
  },
  getRestaurantLoaded(state) {
    return state.restaurantLoaded
  },
  getTeaLoaded(state) {
    return state.teaLoaded
  },
};

export default getters;
