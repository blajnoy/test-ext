const key = Math.random();

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

  try {
    const resp = await fetch(link, options);
    this.response = {};
    this.response.statusText = resp.statusText;
    this.response.statusCode = this.response.statusCode || resp.status;
    const buffer = await resp.arrayBuffer();
    this.response.body = decodeTest(buffer);
  } catch (e) {
    this.response.statusCode = 500;
  }

  return this.response;
}

function decodeTest(buffer) {
  let decoder = new TextDecoder('windows-1251');
  return decoder.decode(buffer);
}
