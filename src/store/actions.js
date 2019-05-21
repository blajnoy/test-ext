import * as types from './mutation-types';

const setBitrate = ({ commit }, payload) => {
  commit(types.UPDATE_BITRATE, payload);
};

const setMp3Dir = ({ commit }, payload) => {
  commit(types.UPDATE_MP3DIR, payload);
};

export { setBitrate, setMp3Dir };
