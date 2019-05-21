<template>
  <div id="settings">
    <div class="title">{{ title }}</div>
    <div class="radio-group">
      <div class="row">
        <input v-model="showSize" type="radio" value="showNone" class="showBitrate" name="showSize" id="sb1" />
        <label for="sb1">{{ titleShowBitrate }}</label>
      </div>
      <div class="row">
        <input v-model="showSize" type="radio" value="showHover" class="showBitrate" name="showSize" id="sb2" />
        <label for="sb2">{{ titleHideBitrate }}</label>
      </div>
    </div>
    <div class="row">
      <label id="laudioFolder" for="audioDownloadFolder">{{ titleSaveFolder }}</label>
      <input type="text" id="audioDownloadFolder" :value="mp3Dir" @input="updateName" />
    </div>
    <p>{{ titleSaveFolderDesc }}</p>
    <div id="status"></div>
    <div class="btn-row">
      <button class="btn" id="save" @click.prevent="onSave">{{ textSave }}</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Settings',
  props: {},
  data() {
    return {
      isDataUpdated: false,
      title: chrome.i18n.getMessage('showOptions'),
      titleShowBitrate: chrome.i18n.getMessage('titleShowBitrate'),
      titleHideBitrate: chrome.i18n.getMessage('titleHideBitrate'),
      titleSaveFolderDesc: chrome.i18n.getMessage('titleSaveFolderDesc'),
      titleSaveFolder: chrome.i18n.getMessage('titleSaveFolder'),
      textSave: chrome.i18n.getMessage('textSave'),
    };
  },
  methods: {
    ...mapActions(['setBitrate', 'setMp3Dir']),
    onSave() {},
    updateName(e) {
      console.log(e.target.value);
      this.setMp3Dir(e.target.value);
    },
  },
  computed: {
    ...mapState({
      bitrate: state => state.bitrate,
      mp3Dir: state => state.mp3Dir,
    }),
    showSize: {
      get() {
        return this.$store.state.bitrate;
      },
      set(value) {
        console.log(value);
        this.setBitrate(value);
        //this.$store.commit('UPDATE_BITRATE', value);
        //chrome.storage.local.set({showSize: value});
      },
    },
    downloadFolder: {
      get() {
        return this.$store.state.mp3Dir;
      },
      set(value) {
        this.$store.commit('UPDATE_MP3DIR', value);
        //chrome.storage.local.set({downloadFolder: value});
      },
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
p {
  margin: 0 0 20px;
}

#settings {
  width: 400px;
  background-blend-mode: lighten;
  padding: 10px;

  .title {
    background: #4a76a8;
    padding-left: 25px;
    font-size: 20px;
    color: #fff;
    height: 43px;
    line-height: 43px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: -10px -10px 10px;
  }

  .btn {
    padding: 7px 16px 8px;
    margin: 0;
    font-size: 12.5px;
    display: inline-block;
    zoom: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    vertical-align: top;
    line-height: 15px;
    text-align: center;
    text-decoration: none;
    background: #5181b8;
    color: #fff;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;

    &:hover {
      background-color: #5b88bd;
      text-decoration: none;
    }

    &:active {
      background-color: #4872a3;
      padding-top: 8px;
      padding-bottom: 7px;
    }
  }

  .row {
    padding: 0 0 5px;

    label {
      font-size: 14px;
      line-height: normal;
      vertical-align: middle;
      padding: 0 0 5px;
      display: block;
    }

    input[type='radio'] {
      vertical-align: middle;
      margin: 0 5px 0 0;
      padding: 0;
    }
  }

  .radio-group {
    padding: 0 0 20px;

    .row {
      label {
        display: inline-block;
        padding: 0;
      }
    }
  }

  input[type='text'] {
    border-width: 1px;
    border-style: solid;
    background: none;
    padding: 3px 5px;
  }
}
</style>
