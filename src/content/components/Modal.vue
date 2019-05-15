<template>
  <div class="wrap" id="modal-savefrom">
    <div class="lapper">
      <div id="wrap-layout"></div>
      <div class="modal">
        <button @click="close()" class="close" id="close-modal">X</button>
        <slot :name="type" />
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
</style>
