<template>
  <div class="vkd_bitrate" v-show="showSizes && show">
    <div :class="'bitrated_audio br' + sizes.hq_bit" v-show="sizes.hq_bit > 0">{{ sizes.hq_bit }}</div>
    <div class="vk_size">{{ sizes.size }}</div>
  </div>
</template>
<script>
//import { mapGetters, mapActions, mapState } from 'vuex/types';

import store from '../../store';

export default {
  name: 'Sizes',
  props: {
    showSizes: Boolean,
    sizes: {
      hq_bit: 0,
      hq_bit_str: '',
      size: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    updateName(e) {
      this.setMp3Dir(e.target.value);
    },
  },
  computed: {
    show() {
      return store.state.bitrate === 'showHover';
    },
  },
};
</script>

<style lang="scss" scoped>
.vkd_bitrate {
  position: absolute;
  white-space: nowrap;
  bottom: -10px;
  right: -25px;
}
.bitrated_audio {
  color: white;
  display: inline-block;
  width: 18px;
  height: 11px;
  border-radius: 2px;
  text-align: center;
  text-shadow: 0 0 8px black;
  font-size: 8px;
  line-height: 11px;
  vertical-align: middle;
  margin: 0 4px 0 0;
}
.vk_size {
  font-size: 0.8em;
  color: #939699;
  display: inline-block;
  vertical-align: middle;
  min-width: 60px;
}
.br320 {
  background-color: hsla(190, 100%, 50%, 1) !important;
}
.br288 {
  background-color: hsla(190, 100%, 45%, 1) !important;
}
.br256 {
  background-color: hsla(190, 100%, 40%, 1) !important;
}
.br224 {
  background-color: hsla(190, 100%, 30%, 1) !important;
}
.br192 {
  background-color: hsla(190, 100%, 25%, 1) !important;
}
.br160 {
  background-color: hsla(190, 100%, 15%, 1) !important;
}
.br128 {
  background-color: hsla(190, 100%, 10%, 1) !important;
}
</style>
