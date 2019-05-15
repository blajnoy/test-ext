import chrome from 'webextension-polyfill';

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

export { download, hasClass, setCookie, decodeHtml, downloader };
