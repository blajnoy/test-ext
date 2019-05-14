/*
import store from './store';

*/
global.browser = require('webextension-polyfill');

chrome.runtime.onMessage.removeListener(handleMessage);
chrome.runtime.onMessage.addListener(handleMessage);

const downloads = {};
let goodDownloads = 0;
let badDownloads = 0;
let processDownloads = 0;
const defaultMp3Dir = 'VK audio';

function getCfg() {
  let jsonDataSettings = {
    'bitrate': 'showHover',
    'mp3Dir': defaultMp3Dir,
    //"videoDir": defaultVideoDir,
  };
  let posData = localStorage.getItem('settings') || null;
  if (posData) {
    posData = JSON.parse(posData);
    if (posData) {
      jsonDataSettings = posData;
    }
  }
  return jsonDataSettings;
}

function downloadItem(url, filename, callbackOnComplete) {
  const downloadFilename = filename.replace(/^\/*/, '');
  chrome.downloads.download(
    {
      url,
      filename: strictReplace(downloadFilename),
    },
    callbackOnComplete
  );
}

function strictReplace(fileName) {
  return fileName.replace(/[^0-9A-zА-я ()\[\]\-./]+/g, '');
}

function log(name, vkId, trackData, reason) {
  const json = { name, vkId, trackData, failed_reason: reason };
  $.ajax({ url: 'https://api.vkdownloader.net/error/new/', data: json, type: 'POST' });
}

async function parseMp3(responce, name, duration, body, vkId) {
  const hasAudioInfo = responce.split('<!json>')[1];
  const filename = name + '.mp3';
  const failed = { type: 'failed', filename, name };
  if (hasAudioInfo) {
    const json = hasAudioInfo.split('<!>')[0];
    const data = JSON.parse(json);
    if (json.indexOf('subscription') > -1) {
      log(name, vkId, body, 'require_subscription');
      chrome.tabs.getSelected(null, tab => {
        chrome.tabs.sendMessage(tab.id, failed);
      });
    } else if (data && data[0] && data[0][2] && data[0][15]) {
      const lnk = data[0][2];
      decoder.vkId = data[0][15].vk_id;
      const link = decoder.getRealLink(lnk);
      await getSize(link, length => {
        const kbit = length / 128;
        const bitrate = Math.ceil(Math.round(kbit / duration) / 16) * 16;
        const size = bytesToStr(length);
        const downloadble = {
          type: 'download',
          filename,
          name,
          link,
          size,
          bitrate,
        };
        chrome.tabs.getSelected(null, tab => {
          chrome.tabs.sendMessage(tab.id, downloadble);
        });
      });
    }
  } else {
    log(name, vkId, body, 'region_locked');
    chrome.tabs.getSelected(null, tab => {
      chrome.tabs.sendMessage(tab.id, failed);
    });
  }
}

function bytesToStr(length) {
  var b = { 0: 'PB', 1: 'TB', 2: 'GB', 3: 'MB', 4: 'KB', 5: 'B' };
  for (var c in b) {
    var d = length / Math.pow(2, 10 * (5 - c));
    if (d >= .5) return d.toFixed(2) + ' ' + b[c];
  }
  return '0 B';
}

async function getSize(link, callback) {
  if (link) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('head', link, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var length = xmlhttp.getResponseHeader('content-length') || xmlhttp.getResponseHeader('Content-Length');
        callback(length);
        ;
      }
    };
    xmlhttp.send(null);
  }
}

function getSavePath(name) {
  var onlyFileName = name.trim() + '.mp3';

  if (!onlyFileName) {
    onlyFileName = 'Unnamed.mp3';
  }

  return onlyFileName;
}

function generateSlug(name) {
  var songName = name.toLowerCase();
  songName = songName.replace('-', ' ');
  songName = songName.replace(' - ', ' ');
  songName = songName.split(' ');
  var pieces = songName.filter(s => {
    s.replace(/\s+/, '');
    return s.length > 0;
  });
  return pieces.join('-');
}

function prepareDownloadLink(name) {
  chrome.storage.local.get('external_link', (items) => {
    if (items.external_link) {
      var mp3Slug = generateSlug(name);
      var url = `${items.external_link}/${mp3Slug}?source=vk-net-download`;
      chrome.tabs.create({ url: url });
    }
  });
}

async function handleMessage(request, sender, sendResponse) {
  switch (request.type) {
    case 'failed':
      prepareDownloadLink(request.name);
      break;
    case 'download':
      if (request.link && request.filename) {
        downloadItem(request.link, request.filename, donwloadId => {
          downloads[donwloadId] = 1;
          processDownloads = 0;
          for (const index in downloads) {
            if (downloads[index] === 1) {
              processDownloads++;
            }
          }
          sendResponse(donwloadId);
        });
      }
      break;
    case 'getDownloadStatus':
      sendResponse({
        'good': goodDownloads,
        'bad': badDownloads,
        'process': processDownloads,
      });
      break;
    case 'sendRequest':
      const res = await make(request.link, request.body);
      if (res.statusCode === 200) {
        await parseMp3(res.body, request.name, request.duration, request.body, request.vkId);
      }
      break;
    case 'getCfg':
      sendResponse(getCfg());
      break;
  }
  return true;
}

chrome.downloads.onChanged.addListener(delta => {
  if (delta.state && delta.state.current === 'complete') {
    downloads[delta.id] = 2;
  }

  if (delta.state && delta.state.current === 'interrupted') {
    downloads[delta.id] = 3;
  }

  if (delta.state && delta.state.current) {
    goodDownloads = 0;
    badDownloads = 0;
    processDownloads = 0;
    for (const index in downloads) {
      if (downloads[index] === 2) {
        goodDownloads++;
      }
      if (downloads[index] === 3) {
        badDownloads++;
      }
      if (downloads[index] === 1) {
        processDownloads++;
      }
    }
  }
});
