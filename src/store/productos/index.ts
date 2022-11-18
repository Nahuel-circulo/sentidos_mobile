import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ProductosStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const ProductosModule: Module<ProductosStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default ProductosModule;
