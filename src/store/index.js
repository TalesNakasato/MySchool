import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersistedState()],  
  state: {
    // estado inicial

    studID: '',
    classID: '',
    teachID: '',
    mode: 'dark',
    navBarColor: 'red',
  },
  mutations: {
    // mutações para atualizar o estado
    setStudID(state, value) {
        state.studID = value;
      },
    setTeachID(state, value) {
        state.teachID = value;
      },
    changeMode(state, value){
        state.mode = value;
    },
    setNavBarColor(state,value){
       state.navBarColor = value;
    },
  },
  actions: {
    // ações para executar mutações
  },
  getters: {
    // getters para acessar o estado

    getStudID(state){
        return state.studID;
    },

    getClassID(state){
        return state.classID;
    },

    getTeachID(state){
        return state.teachID;
    },
    getMode(state){
      return state.mode;
    },
    getNavBarColor(state){
      return state.navBarColor;
    }
  },
});

export default store;
