let provider, web3auth;

function Helper({ _provider, _web3auth }) {
  web3auth = _web3auth;
  provider = _provider;
  return <></>;
}

function getProviders() {
  return provider;
}

function getWeb3Auth() {
  return web3auth;
}

export { Helper, getProviders, getWeb3Auth };
