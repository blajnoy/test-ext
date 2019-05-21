import Vue from 'vue';
import Vuex from 'vuex';
import VuexWebExtensions from 'vuex-webextensions';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bitrate: 'showHover',
    mp3Dir: 'VK audio',
  },
  getters,
  mutations,
  actions,
  plugins: [
    VuexWebExtensions({
      persistentStates: ['bitrate', 'mp3Dir'],
    }),
  ],
});
