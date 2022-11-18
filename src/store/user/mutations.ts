import { MutationTree } from 'vuex';
import { UsuarioStateInterface, MetodoDePago, Usuario } from './state';

const mutation: MutationTree<UsuarioStateInterface> = {
  SET_FACTURAS (state: UsuarioStateInterface,payload:Array<any>) {
    state.facturas = payload
  },
  SET_TOTAL (state: UsuarioStateInterface,payload:String) {
    state.total = payload
  },
  SET_METODOS (state: UsuarioStateInterface,payload:Array<MetodoDePago>) {
    state.metodosDePago = payload
  },
  SET_USUARIO_LOGEADO (state: UsuarioStateInterface,payload:Usuario) {
    state.usuarioLogeado = payload
  },
  SET_ERROR_MESSAGE(state:UsuarioStateInterface,payload:string){
    state.errorMessage = payload
  }
};

export default mutation;
