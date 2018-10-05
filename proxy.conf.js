var HttpsProxyAgent = require('https-proxy-agent');

function applyProxy(proxies, urlProxy, targetStartsWith) {
  if (proxies && urlProxy && targetStartsWith) {
    var agent = new HttpsProxyAgent(urlProxy);
    console.log(targetStartsWith + ' <=> using corporate proxy server: ' + urlProxy);
    proxies
      .filter(_ => _.target && _.target.startsWith(targetStartsWith))
      .forEach(_ => _.agent = agent);
  }
}

function setupForCorporateProxy(proxyConfig) {
  applyProxy(proxyConfig, process.env.http_proxy || process.env.HTTP_PROXY, 'http:');
  applyProxy(proxyConfig, process.env.https_proxy || process.env.HTTPS_PROXY, 'https:');
  return proxyConfig;
}

module.exports = setupForCorporateProxy([
  {
    context: '/bc1',
    pathRewrite: { '^/bc1': '' },
    target: 'https://blockchain.info',
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
  },
]);
