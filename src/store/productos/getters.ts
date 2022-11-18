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
  getCarrito(state) {
    return state.carrito
  },
  getCarritoCantidad(state) {
    return state.carrito.length
  },
  getTotalCarrito(state){
    let total = 0;
    if (state.carrito.length) {
      state.carrito.forEach((producto)=>{
        total +=  producto.cantidad * parseInt(producto.price)   
      })
    }
    return total
    
  }
};

export default getters;
