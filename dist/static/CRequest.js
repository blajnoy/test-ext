var key = Math.random();
var urlWatch = 'https://vk.com/al_audio.php';

function unregisterListeners() {
  chrome.webRequest.onBeforeSendHeaders.removeListener(this.onBeforeSendHeaders);
}

function registerListeners() {
  const listeningUrl = urlWatch; // this.url.substr(0, this.url.indexOf('/', 9)) + '/*';

  chrome.webRequest.onBeforeSendHeaders.addListener(
    this.onBeforeSendHeaders,
    {
      urls: [listeningUrl],
      tabId: -1,
    },
    ['blocking', 'requestHeaders']
  );
}

function onBeforeSendHeaders(details) {
  if (!details.requestHeaders) {
    return {};
  }
  const requestKey = details.requestHeaders.find(h => h.name === 'request-key');
  if (requestKey && requestKey.value === key.toString()) {
    this.id = details.requestId;

    details.requestHeaders = details.requestHeaders.filter(h => h.name.toLowerCase() != 'user-agent' || h.name != 'request-key');
    details.requestHeaders.push({
      name: 'User-Agent',
      value: 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    });

    return { requestHeaders: details.requestHeaders };
  } else {
    return {};
  }
}

function notifyContent(data) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { decodeData: data }, function(response) {});
  });
}

async function make(link, body) {
  const options = {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'request-key': key,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: body,
  };

  registerListeners();
  try {
    const resp = await fetch(link, options);
    this.response = {};
    this.response.statusText = resp.statusText;
    this.response.statusCode = this.response.statusCode || resp.status;
    var buffer = await resp.arrayBuffer();
    this.response.body = decodeTest(buffer);
  } catch (e) {
    this.response.statusCode = 500;
  }
  unregisterListeners();
  return this.response;
}
function decodeTest(buffer) {
  let decoder = new TextDecoder('windows-1251');
  let text = decoder.decode(buffer);
  return text;
}
