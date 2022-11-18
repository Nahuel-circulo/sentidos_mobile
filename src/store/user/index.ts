import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PropietarioStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const propietarioModule: Module<PropietarioStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default propietarioModule;
