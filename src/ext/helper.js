import chrome from 'webextension-polyfill';

const restrictedSymbols = /[|&\/\\+":*?<>]/g;

const download = e => {
  const { request } = e.data;
  chrome.runtime.sendMessage(request);
};

const hasClass = (element, cls) => {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

const setCookie = (name, value, props) => {
  const cookieProps = props || {};
  let exp = cookieProps.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = cookieProps.expires = d;
  }
  if (exp && exp.toUTCString) {
    cookieProps.expires = exp.toUTCString();
  }
  const cookieValue = encodeURIComponent(value);
  let updatedCookie = name + '=' + cookieValue;
  for (const propName in cookieProps) {
    updatedCookie += `; ${propName}`;
    const propValue = cookieProps[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
};

const decodeHtml = stringWithHtml => {
  const txt = document.createElement('textarea');
  txt.innerHTML = stringWithHtml;
  return txt.value;
};

const downloader = {
  ajax(url, method, body, callback) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    if (method === 'POST') {
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    if (chrome.i18n.getMessage('extDevelop').indexOf(url) === -1) {
      xmlhttp.dataType = 'text';
      xmlhttp.crossDomain = true;
    }
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.send(method === 'POST' ? body : null);
  },
};

const sanitizePathString = audioDownloadFolder => {
  audioDownloadFolder = audioDownloadFolder || '';
  audioDownloadFolder = audioDownloadFolder.replace('\\', '/');
  if (audioDownloadFolder.endsWith('/')) {
    audioDownloadFolder = audioDownloadFolder.substring(0, audioDownloadFolder.length - 1);
  }
  return replaceRestrictedSymbols(audioDownloadFolder);
};

const replaceRestrictedSymbols = str => {
  if (str && str[0] == '.') {
    str = str.replaceAt(0, '_');
  }
  str = str
    .replace(/quot;/g, '"')
    .replace(/<em>/g, '')
    .replace(/<\/em>/g, '')
    .replace('&amp;', '&');
  const array = str.split('');
  for (const i = 0; i < array.length; i++) {
    const number = array[i].charCodeAt(0);
    if (this.isWhiteSpace(number) || number == 173) {
      array[i] = ' ';
    }
  }
  return array
    .join('')
    .replace(restrictedSymbols, '')
    .trim();
};

const parseMp3 = response => {
  const json = response.split('<!json>')[1].split('<!>')[0];
  const data = JSON.parse(json);
  if (data && data[0] && data[0][2]) {
    const lnk = data[0][2];
    return this.z(lnk);
  }
  return 0;
};

const getSavePath = info => {
  const audioInfo = {};
  audioInfo.album = replaceRestrictedSymbols(info.album);
  audioInfo.artist = replaceRestrictedSymbols(info.artist);
  audioInfo.title = replaceRestrictedSymbols(info.title);
  let filename;
  let onlyFileName = audioInfo.artist.trim() + ' - ' + audioInfo.title.trim() + '.mp3';
  onlyFileName = onlyFileName.replace(/^ +/, '');
  if (!onlyFileName) {
    onlyFileName = 'Unnamed.mp3';
  }
  if (audioInfo.album) {
    if (audioInfo.album.endsWith('.')) {
      audioInfo.album = audioInfo.album.substring(0, audioInfo.album.length - 1);
    }
    filename = sanitizePathString(audioInfo.album) + '/' + onlyFileName;
  } else {
    filename = onlyFileName;
  }
  return 'VK audio' + '/' + filename;
};

export { download, hasClass, setCookie, decodeHtml, downloader, getSavePath, parseMp3 };
