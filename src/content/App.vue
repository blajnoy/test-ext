<template>
  <Modal v-if="showModal" :type="modalType" v-on:close-modal="closeModal()">
    <template slot="available">
      <h2>Загрузка аудио</h2>
      <p>Пожалуйста после начала не закрыввайте страницу и дождитесь загрузки аудиозаписи</p>
      <p>Если трэк недоступен из за авторских прав он скачан не будет.</p>
      <a @click.prevent="download()" href="#" id="start-download-savefrom">
        Скачать
        <img
          src="data:image/png;base64,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"
          style="margin: 0px 0px -2px 6px;"
      /></a>
    </template>
    <template slot="availableMass">
      <h2>Массовая загрузка аудио</h2>
      <p>Сейчас будет скачано <b id="savefrom-count">1024</b> mp3</p>
      <p>Пожалуйста после начала не закрыввайте страницу и дождитесь загрузки аудиозаписей</p>
      <p>Если трэк недоступен из за авторских прав он скачан не будет.</p>
      <a @click.prevent="downloadAllMusic()" href="#" id="start-download-savefrom">
        Скачать все
        <img
          src="data:image/png;base64,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"
          style="margin: 0px 0px -2px 6px;"
      /></a>
    </template>
    <template slot="external"
      ><div>external</div></template
    >
    <template slot="notAvailable">
      <div class="audio_restriction_box__icon audio_restriction_box__icon_pensive_face"></div>
      <div class="audio_restriction_box__title">{{ modalSlotsContent.notAvailable.title }}</div>
      <div class="audio_restriction_box__content">{{ modalSlotsContent.notAvailable.desc }}</div>
    </template>
  </Modal>
</template>

<script>
import Vue from 'vue';
import DownloadButton from './components/DownloadButton';
import DownloadAllButton from './components/DownloadAllButton';
import Modal from './components/Modal';
import Sizes from './components/Sizes';
import { decodeHtml as decodeHtmlAPI, downloader, setCookie as setCookieAPI, parseMp3, getSavePath, getSize as getSizeAPI } from '../ext/helper';
import { mapState } from 'vuex';

export default {
  name: 'App',
  target: document.body || document,
  config: {
    childList: true,
    subtree: true,
  },
  components: {
    Modal,
    Sizes,
  },
  data() {
    return {
      modalSlotsContent: {
        notAvailable: {
          title: chrome.i18n.getMessage('textNotAvailableTitle'),
          desc: chrome.i18n.getMessage('textNotAvailableContent'),
        },
      },
      trueHostname: false,
      access: 'https://',
      restrictedSymbols: /[|&\/\\+":*?<>]/g,
      showModal: false,
      modalType: 'availableMass',
      request: {},
      items: [],
      bitrateShowHover: true,
    };
  },
  computed: {
    isTrueHostname() {
      const { hostname } = document.location;
      return hostname.indexOf('vk.com') >= 0;
    },
    ...mapState({
      bitrate: state => state.bitrate,
      mp3Dir: state => state.mp3Dir,
    }),
  },
  mounted() {
    if (this.isTrueHostname) {
      chrome.extension.onMessage.addListener(request => {
        this.request = request;
        if (request.type === 'failed') {
          this.modalType = 'notAvailable';
          this.showModal = true;
        } else {
          this.download();
        }
      });

      chrome.runtime.sendMessage(
        chrome.runtime.id,
        {
          type: 'getCfg',
        },
        function(data) {
          this.bitrateShowHover = data.bitrate === 'showHover';
        }
      );

      this.observer = null;
      //TODO:  download all audio
      //this.addDownloadAllBtn();
      this.processingNodes(document.querySelectorAll('.audio_row'));
      this.observer = new MutationObserver(this.parseMutation);
      this.observer.observe(this.$options.target, this.$options.config);
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    processingNodes(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const audioClassName = 'audio_row';
        if (this.hasClass(nodes[i], audioClassName)) {
          this.updateOneAudio(nodes[i]);
        } else {
          this.updateLinks(nodes[i]);
        }
      }
    },
    parseMutation(mutations) {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          this.processingNodes(mutation.addedNodes);
        }
      });
    },
    updateLinks(collection) {
      if (collection.nodeType === 1 || collection.nodeType === 9) {
        const audioSelector = '.audio_row';
        const audios = collection.querySelectorAll(audioSelector);
        for (let i = 0; i < audios.length; i++) {
          this.updateOneAudio(audios[i]);
        }

        const audiosAlbum = collection.querySelectorAll('.audio_pl_item');
        for (let i = 0; i < audiosAlbum.length; i++) {
          this.addHashEvent(audiosAlbum[i]);
        }
      }
    },
    addHashEvent(elem) {
      elem.addEventListener('click', e => {
        if (!e) return;
        let el = e.currentTarget;
        if (el) {
          el = el.getElementsByClassName('audio_pl__cover')[0];

          const string = el.getAttribute('onclick');
          const result = string.match(/showAudioPlaylist\([^,]*, [^,]*, '([^\']*)', '[^\']*'\);/i);

          localStorage.setItem('hashA', result[1] ? result[1] : '');
        }
      });
    },
    addDownloadAllBtn() {
      const where = document.getElementsByClassName('audio_page__sort_dd')[0];
      const ComponentClass = Vue.extend(DownloadAllButton);
      const instance = new ComponentClass({
        propsData: {},
      });
      instance.$on('downloadAll', () => {
        this.modalType = 'availableMass';
        this.showModal = true;
      });
      instance.$mount();
      where && where.appendChild(instance.$el);
    },
    updateOneAudio(audio) {
      const link = null;
      const audioActs = audio.querySelector('.audio_row__info');
      if (audioActs.querySelector('.downloadButton')) {
        return;
      }

      const info = this.getAudioInfo(audio);
      const { artist, title, length } = info;
      const stringTitle = artist + ' - ' + title + '.mp3';
      const audiosToDownload = {
        artist,
        title,
        url: link,
        album: '',
        fullId: audio.dataset.fullId,
        track_addon: info.track_addon,
        vkId: info.vk_id,
        length,
        sizes: {
          hq_bit: 0,
          hq_bit_str: '',
          size: '',
        },
      };
      const ComponentClass = Vue.extend(DownloadButton);
      const instance = new ComponentClass({
        propsData: { audiosToDownload },
      });
      let sizes = {
        hq_bit: 0,
        hq_bit_str: '',
        size: '',
      };
      const sizesClass = Vue.extend(Sizes);
      let sizesInstance;

      instance.$on('download', audioData => {
        this.getUrlMp3(audioData);
      });

      instance.$once('show-size', () => {
        this.getUrlAudioMp3(audiosToDownload.fullId + '_' + audiosToDownload.track_addon, data => {
          const url = parseMp3(data);
          if (url) {
            audiosToDownload.sizes = getSizeAPI(url, info.length);

            sizesInstance = new sizesClass({
              propsData: {
                sizes: audiosToDownload.sizes,
                showSizes: true,
              },
            });
            sizesInstance.$mount();
            instance.$el.insertBefore(sizesInstance.$el, instance.$el.firstChild);
          }
        });
      });

      instance.$once('leave', () => {});

      instance.$mount();
      audioActs.insertBefore(instance.$el, audioActs.firstChild);
    },
    getAudioInfo(audio) {
      const id = audio.getAttribute('data-full-id');
      if (id) {
        const info = JSON.parse(audio.dataset['audio']);
        const track_addon = info[13];
        const vk = info[15]['vk_id'];
        const check = '/\/\/';
        const check2 = '/';
        let sec;
        if (track_addon.indexOf(check) + 1) {
          sec = track_addon.split('/\/\/')[1];
        } else {
          sec = track_addon.split('/\/')[1];
          if (sec.indexOf(check2) + 1) {
            if (track_addon.split('/\/')[2]) {
              sec = track_addon.split('/\/')[2];
            } else if (track_addon.split('/\/')[1]) {
              sec = track_addon.split('/\/')[1];
            } else {
              sec = track_addon.split('/\/')[0];
            }
          }
        }
        //act=reload_audio&al=1&ids=6610921_456239434_0350cff0c5d95c1d31_abbc0fafcbef7fcef5
        return {
          type: 'getAudioInfo',
          fullId: audio.dataset.fullId,
          length: info[5],
          artist: info[4],
          title: info[3],
          vk_id: vk,
          track_addon: track_addon.split('/')[2] + '_' + sec.split('/')[0],
        };
      }
    },
    hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },
    getUrlAudioMp3: function(vkId, callback) {
      const body = 'act=reload_audio&al=1&ids=' + vkId;
      setCookieAPI('remixcurr_audio', vkId);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.access + 'vk.com/al_audio.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.responseType = 'text';
      xhr.onreadystatechange = e => {
        if (xhr.readyState != 4) return;
        if (xhr.status == 200) {
          callback(xhr.responseText);
        }
      };
      xhr.send(body);
    },
    getUrlMp3(audiosToDownload) {
      const vkId = `${audiosToDownload.fullId}_${audiosToDownload.track_addon}`;
      const mp3Name = decodeHtmlAPI(`${audiosToDownload.artist} - ${audiosToDownload.title}`);
      const body = `act=reload_audio&al=1&ids=${vkId}`;
      const duration = audiosToDownload.length;

      setCookieAPI('remixcurr_audio', vkId);

      chrome.runtime.sendMessage({
        type: 'sendRequest',
        link: `${this.access}vk.com/al_audio.php`,
        name: getSavePath(audiosToDownload),
        body,
        vkId: audiosToDownload.vkId,
        duration,
      });
    },
    download() {
      this.showModal = false;
      chrome.runtime.sendMessage(this.request);
    },
    downloadAllMusic() {
      const uri = document.location.href;
      const result = uri.match(/audios([0-9-]+)/i); //uri.match( /https?:\/\/[^\/]+\/[^\/]+\/([^\/]+)/i );

      if (result[1]) {
        const post = `access_hash=&act=load_section&al=1&claim=0&is_loading_all=1&offset=0&owner_id=${result[1]}&playlist_id=-1&type=playlist`;
        downloader.ajax(`${this.access}vk.com/al_audio.php`, 'POST', post, response => {
          if (response) {
            const math = response.match(/<!json>(.+)<!>/i);
            if (math && math[1]) {
              const json = JSON.parse(math[1]);
              if (json && json.list) {
                const list = [];
                for (const i in json.list) {
                  const track = json.list[i];
                  if (track) {
                    const artist = track[4] ? track[4] : '';
                    const name = track[3] ? track[3] : '';
                    const id = track[0] && track[1] ? `${track[1]}_${track[0]}` : '13069493_456239188';

                    let track_addon = track[13];
                    const check = '/\/\/',
                      check2 = '/';
                    let sec; //indexOf(info[13]);
                    if (track_addon.indexOf(check) + 1) {
                      sec = track_addon.split('/\/\/')[1];
                    } else {
                      sec = track_addon.split('/\/')[1];
                      if (sec.indexOf(check2) + 1) {
                        sec = track_addon.split('/\/')[2];
                      }
                    }

                    track_addon = track[13].split('/')[2] + '_' + sec;
                    const obj = { artist: artist, title: name, url: null, album: '', fullId: id, track_addon: track_addon };
                    list[i] = obj;
                  }
                }

                this.items = list;
                this.startLoad();
              }
            }
          }
        });
      }
    },
    startLoad: function() {
      if (this.items.length === 0) return;
      const item = this.items[0];
      const url = this.getUrlAudioMp3(item.fullId + '_' + item.track_addon, data => {
        const url = parseMp3(data);
        if (url) {
          url.then(link => {
            item.url = link;
            const itemsTmp = [];
            for (const i in this.items) {
              if (i == 0) continue;
              itemsTmp.push(this.items[i]);
            }
            this.items = itemsTmp;
            chrome.runtime.sendMessage(chrome.runtime.id, {
              type: 'download',
              link: item.url,
              name: getSavePath(item),
            });
          });
        } else {
          var itemsTmp = [];
          for (var i in this.items) {
            if (i == 0) continue;
            itemsTmp.push(this.items[i]);
          }
          this.items = itemsTmp;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.audio_w_covers .audio_row .audio_row__actions {
  float: left;
  margin-top: 12px !important;
  margin-right: 30px;
}
.audio_w_covers .audio_row .audio_row__duration {
  float: right;
  visibility: visible !important;
}
.audio_row .audio_row__actions {
  width: 160px;
  margin-right: 20px;
  margin-top: 2px !important;
  text-align: right;
}
.audio_row__current .audio_inline_player {
  margin-right: 28px;
}
.audio_row .audio_row__duration {
  float: left;
}
.size {
  /*font-size: 0.8em;
  color: #939699;
  position: absolute;
  right: 0;*/
}
.audio_row__info .downloadButton {
  float: right;
  z-index: 9;
}
.fngfng {
  cursor: pointer;
  display: block;
  width: 20px;
  height: 20px;
  background: url('data:image/png;base64,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')
    no-repeat;
}
</style>
