<template>
  <div id="settings">
    <div class="title">Settings</div>
    <input type="radio" value="showNone" class="showBitrate" name="showBitrate" id="sb1" />
    <label for="sb1" id="lsb1">Do not show bitrate and size </label><br/>

    <input type="radio" value="showHover" class="showBitrate" name="showBitrate" id="sb2" />
    <label for="sb2" id="lsb2">Show bitrate and size when hovering to audio </label><br/>

    <span id="chromeDownloadFolder">All paths to folders are relative folders for downloads. Leave the field blank,
    if you do not want the files to be downloaded to subfolders</span>
    <br/>
    <br/>
    <p><label id="laudioFolder" for="audioDownloadFolder">Folder for music downloads</label><br/>
      <input id="audioDownloadFolder" />
    </p>

    <!--<p><label id="lvideoFolder" for="videoDownloadFolder">Папка для скачивания видео</label><br />
        <input id="videoDownloadFolder"/></p>-->

    <div id="status"></div>
    <button id="save">Save</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Settings',
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
