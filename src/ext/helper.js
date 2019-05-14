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

export {
  download,
  hasClass,
  setCookie,
  decodeHtml
};
