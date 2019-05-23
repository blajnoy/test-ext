<template>
  <div class="wrap">
    <div class="wrap-layout"></div>
    <div @click="close()" class="box_layout">
      <div class="box_body box_no_title box_no_buttons">
        <button @click="close()" class="audio_restriction_box__close">{{ modalContent.close }}</button>
        <slot :name="type" />
        <div class="audio_restriction_box__controls">
          <button @click="close()" class="flat_button">{{ modalContent.close }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    type: String,
  },
  data() {
    return {
      modalContent: {
        close: chrome.i18n.getMessage('textClose'),
      },
    };
  },
  methods: {
    close() {
      this.$emit('close-modal');
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;

  .wrap-layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    background-blend-mode: lighten;
  }
}
.box_layout {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .box_body {
    background: #fff;
    color: #000;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    line-height: 1.154;
    font-weight: 400;
    width: 450px;
    padding: 64px 25px 32px;
    border-radius: 8px;
    position: relative;
  }
}
.audio_restriction_box {
  &__close {
    background: url(/images/pics/cross.png) no-repeat 50%;
    width: 14px;
    height: 14px;
    margin: 20px;
    padding: 12px;
    display: block;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    text-indent: 9999px;
    opacity: 0.75;
    cursor: pointer;
    transition: opacity 0.25s ease;
  }

  &__icon {
    width: 72px;
    height: 72px;
    display: block;
    margin: 0 auto 16px;

    &_pensive_face {
      background: url(/images/audio/pensive_face.png) no-repeat 50%;
    }
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.38;
    text-align: center;
    color: #000;
    margin: 0 18px 8px;
  }

  &__content {
    font-size: 13px;
    line-height: 1.38;
    text-align: center;
    color: #656565;
    margin: 8px 18px 0;
  }

  &__controls {
    margin: 34px 18px 0;
    display: flex;
    justify-content: center;

    .flat_button {
      flex: 1 0 0;

      &:only-child {
        flex-grow: 0;
        margin: 0;
      }
    }
  }
}
</style>
<!--<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.wrap #layout-savefrom {
  //opacity: 0.3;
}
.wrap .lapper {
  width: 100%;
  position: fixed;
  z-index: 9;
}

.wrap .lapper .modal {
  width: 600px;
  margin: 150px auto;
  background: #fff;
  padding: 10px;
  border: 1px solid #ada5a5;
  border-radius: 3px;
  position: relative;
}

.wrap .lapper .modal .close {
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
}

#start-download-savefrom {
  width: 100px;
  background-color: rgb(81, 129, 184);
  padding: 7px 16px 8px;
  cursor: pointer;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 13px;
  text-decoration: none;
  display: block;
  border-radius: 13px;
  margin-top: 6px;
  text-align: center;
}

#wrap-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: lighten;
}
</style>-->
