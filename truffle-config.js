require('dotenv').config()

const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  },
  networks: {
    testnet: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [process.env.TESTNET_PRIVATE_KEY],
          providerOrUrl: 'https://api.s0.b.hmny.io', // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666700000, // 1666600000 for mainnet
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [process.env.TESTNET_PRIVATE_KEY],
          providerOrUrl: 'https://api.s0.t.hmny.io',
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666600000
    },
  }
};
