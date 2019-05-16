import * as types from './mutation-types';

export const setBitrate = ({ commit }, payload) => {
  commit(types.UPDATE_BITRATE, payload);
};

export const setMp3Dir = ({ commit }, payload) => {
  commit(types.UPDATE_MP3DIR, payload);
};
