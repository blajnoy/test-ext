import chrome from 'webextension-polyfill';
import store from '../store';

const restrictedSymbols = /[|&\/\\+":*?<>]/g;

const decode = function(r, n) {
  function t(r) {
    if (!r || r.length % 4 == 1) return !1;
    for (var n, t, i = 0, o = 0, f = ''; (t = r.charAt(o++)); )
      ~(t = e.indexOf(t)) && ((n = i % 4 ? 64 * n + t : t), i++ % 4) && (f += String.fromCharCode(255 & (n >> ((-2 * i) & 6))));
    return f;
  }
  function i(r, n) {
    var t = r.length,
      i = [];
    if (t) {
      var e = t;
      for (n = Math.abs(n); e--; ) (n = ((t * (e + 1)) ^ (n + e)) % t), (i[e] = n);
    }
    return i;
  }
  var e = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
    o = {
      v: function(r) {
        return r
          .split('')
          .reverse()
          .join('');
      },
      r: function(r, n) {
        r = r.split('');
        for (var t, i = e + e, o = r.length; o--; ) ~(t = i.indexOf(r[o])) && (r[o] = i.substr(t - n, 1));
        return r.join('');
      },
      s: function(r, n) {
        var t = r.length;
        if (t) {
          var e = i(r, n),
            o = 0;
          for (r = r.split(''); ++o < t; ) r[o] = r.splice(e[t - 1 - o], 1, r[o])[0];
          r = r.join('');
        }
        return r;
      },
      i: function(r, t) {
        return o.s(r, t ^ n);
      },
      x: function(r, n) {
        var t = [];
        return (
          (n = n.charCodeAt(0)),
          each(r.split(''), function(r, i) {
            t.push(String.fromCharCode(i.charCodeAt(0) ^ n));
          }),
          t.join('')
        );
      },
    };
  return (function(r) {
    if (r && ~r.indexOf('audio_api_unavailable')) {
      var n = r.split('?extra=')[1].split('#'),
        i = '' === n[1] ? '' : t(n[1]);
      if (((n = t(n[0])), 'string' != typeof i || !n)) return r;
      for (var e, f, u = (i = i ? i.split(String.fromCharCode(9)) : []).length; u--; ) {
        if (((f = i[u].split(String.fromCharCode(11))), (e = f.splice(0, 1, n)[0]), !o[e])) return r;
        n = o[e].apply(null, f);
      }
      if (n && 'http' === n.substr(0, 4)) return n;
    }
    return r;
  })(r);
};

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

const isWhiteSpace = number => {
  return (
    number == 9 ||
    number == 10 ||
    number == 11 ||
    number == 12 ||
    number == 13 ||
    number == 32 ||
    number == 133 ||
    number == 160 ||
    number == 5760 ||
    (number >= 8192 && number <= 8202) ||
    number == 8232 ||
    number == 8233 ||
    number == 8239 ||
    number == 8287 ||
    number == 8232 ||
    number == 12288 ||
    number == 6158 ||
    number == 8203 ||
    number == 8204 ||
    number == 8205 ||
    number == 8288 ||
    number == 65279
  );
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
  for (let i = 0; i < array.length; i++) {
    const number = array[i].charCodeAt(0);
    if (isWhiteSpace(number) || number == 173) {
      array[i] = ' ';
    }
  }
  return array
    .join('')
    .replace(restrictedSymbols, '')
    .trim();
};

/*const parseMp3 = response => {
  const json = response.split('<!json>')[1].split('<!>')[0];
  const data = JSON.parse(json);
  if (data && data[0] && data[0][2]) {
    const lnk = data[0][2];
    return z(lnk);
  }
  return 0;
};*/

const parseMp3 = response => {
  const json = response.split('<!json>')[1] && response.split('<!json>')[1].split('<!>')[0];
  const data = json ? JSON.parse(json) : undefined;

  if (data && data[0] && data[0][2]) {
    const lnk = data[0][2];
    const script = document.createElement('script');
    script.text = `(function(){document.body.setAttribute('userId',window.vk&&window.vk.id)})();`;
    document.body.appendChild(script);
    const userId = document.body.getAttribute('userId');
    const obj = decode(lnk, userId);
    let t = obj;
    if (/\.m3u8\?/.test(t)) {
      const n = (t = t.replace('/index.m3u8', '.mp3')).split('/'),
        o = -1 !== t.indexOf('audios') ? 1 : 0;
      n.splice(n.length - (2 + o), 1), (t = n.join('/'));
    }
    return t;
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
  return store.getters.mp3Dir + '/' + filename;
};

const bytesToStr = length => {
  const b = { 0: 'PB', 1: 'TB', 2: 'GB', 3: 'MB', 4: 'KB', 5: 'B' };
  for (const c in b) {
    const d = length / Math.pow(2, 10 * (5 - c));
    if (d >= 0.5) return d.toFixed(2) + ' ' + b[c];
  }
  return '0 B';
};

const getSize = (link, len) => {
  const sizeInfo = {
    hq_bit: 0,
    hq_bit_str: '',
    size: '',
  };

  if (link) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('head', link, !0);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        const length = xmlhttp.getResponseHeader('content-length') || xmlhttp.getResponseHeader('Content-Length');
        const bitrate = (length * 8) / 1024 / len;
        const temp = Math.round(bitrate / 32);
        sizeInfo.hq_bit_str = Math.min(32 * temp, 320) + 'kbs - ' + bytesToStr(length);
        sizeInfo.hq_bit = Math.min(32 * temp, 320);
        sizeInfo.size = bytesToStr(length);
        //hq_bit.classList.add('br' + Math.min(32 * temp, 320));
      }
    };
    xmlhttp.send(null);
  }
  return sizeInfo;
};

export { download, hasClass, setCookie, decodeHtml, downloader, getSavePath, parseMp3, getSize };
