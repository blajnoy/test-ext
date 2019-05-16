<template>
  <div id="settings">
    <div class="title">Settings</div>
    <input v-model="showSize" type="radio" value="showNone" class="showBitrate" name="showBitrate" id="sb1" />
    <label for="sb1" id="lsb1">Do not show bitrate and size </label><br />

    <input v-model="showSize" type="radio" value="showHover" class="showBitrate" name="showBitrate" id="sb2" />
    <label for="sb2" id="lsb2">Show bitrate and size when hovering to audio </label><br />

    <span id="chromeDownloadFolder"
      >All paths to folders are relative folders for downloads. Leave the field blank, if you do not want the files to be downloaded to subfolders</span
    >
    <br />
    <br />
    <p>
      <label id="laudioFolder" for="audioDownloadFolder">Folder for music downloads</label><br />
      <input id="audioDownloadFolder" v-model="downloadFolder" />
    </p>
    <div id="status"></div>
    <button id="save">Save</button>
    {{ showSize }}
    {{ downloadFolder }}
    <hr />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Settings',
  props: {},
  data() {
    return {
      showSize: 'showSize',
      downloadFolder: 'downloadFolder',
    };
  },
  methods: {},
  computed: {
    //...mapGetters(['downloadsCount', 'downloadsRender', 'downloadsProgressCount', 'videosOnPage']),
    ...mapState({
      bitrate: state => state.bitrate,
      mp3Dir: state => state.mp3Dir,
    }),
  },
  updated() {
    this.showSize = this.bitrate;
    this.downloadFolder = this.mp3Dir;

    console.log(this.bitrate, this.mp3Dir);
  },
};
</script>

<style lang="scss" scoped>
#settings {
  width: 500px;
  background-color: rgba(255, 255, 255, 0.9);
  background-blend-mode: lighten;

  .title {
    width: 100%;
    text-align: center;
    font-size: 24px;
  }
}
</style>
