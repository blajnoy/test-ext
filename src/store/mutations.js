import * as types from './mutation-types';

export default {
  [types.UPDATE_BITRATE](state, payload) {
    state.bitrate = payload;
  },
  [types.UPDATE_MP3DIR](state, payload) {
    state.mp3Dir = payload;
  },
};
