import Vue from 'vue';
import App from './App';
import store from '../store';

global.browser = require('webextension-polyfill');

Vue.config.productionTip = false;

const wrapperElement = document.createElement('div');
wrapperElement.id = 'vk-sniffer';
document.body.append(wrapperElement);

/* eslint-disable no-new */
new Vue({
  el: '#vk-sniffer',
  store,
  render: h => h(App),
});
