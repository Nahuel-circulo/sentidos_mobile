
import { payloadAPI } from 'src/api/payloadApi';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UsuarioStateInterface, Factura } from './state';


const actions: ActionTree<UsuarioStateInterface, StateInterface> = {
  fetchFacturas: async ({ commit, state }, { desde, hasta, metodoP }) => {
    // let link = `?where[createdAt][greater_than]=${desde}&[and][createdAt][less_than]=${hasta}&[metodo_de_pago][equals]=${metodoP}&where[metodo_de_pago][exists]=true`
    let link = `?where[metodo_de_pago][equals]=${metodoP}&where[metodo_de_pago][exists]=true`

    try {
      const { data } = await payloadAPI.get(`/factura${link}`)
      /* commit('SET_FACTURAS', data.docs) */

      if (data.docs.length) {
        let datosFiltrados = [];
        datosFiltrados = data.docs.filter((factura: Factura) => {
          if (factura.createdAt >= desde && factura.createdAt <= hasta) {
            return factura
          }
        })
        commit('SET_FACTURAS', datosFiltrados)
        let total = 0;
        datosFiltrados.forEach((factura: Factura) => {
          total += Number(factura.total)
        });
        commit('SET_TOTAL', total)
      } else {
        commit('SET_FACTURAS', [])
        commit('SET_TOTAL', 0)
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchMetodos: async ({ commit }) => {
    try {
      const { data } = await payloadAPI.get(`/metodop`)
      commit('SET_METODOS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  login: async ({commit,state},usuario:{email:string,password:string})=>{
    console.log(usuario.email,usuario.password)
    try {
      const { data } = await payloadAPI.get(`/usuario?where[email][equals]=${usuario.email}&where[password][equals]=${usuario.password}`)
      if (data.docs.length) {
        commit('SET_USUARIO_LOGEADO', data.docs[0])
        console.log(data.docs[0])
      } else{
        commit('SET_ERROR_MESSAGE','Usuario o contraseña incorrecto')
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;
