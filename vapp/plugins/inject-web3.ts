import { Inject, Plugin } from '@nuxt/types/app'
import { Harmony } from '@harmony-js/core'
import { ChainType } from '@harmony-js/utils'
import { InjectedConnector } from '@web3-react/injected-connector'
import { OneWalletConnector } from '@harmony-react/onewallet-connector'
import { MathWalletConnector } from '@harmony-react/mathwallet-connector'
import { Web3ConnectorsManager } from 'web3-connectors-manager'

declare module 'vue/types/vue' {
  interface Vue {
    $library: any
    $contracts: any
    $web3ConnectorsManager: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $library: any
    $contracts: any
    $web3ConnectorsManager: any
  }
  interface Context {
    $library: any
    $contracts: any
    $web3ConnectorsManager: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $library: any
    $contracts: any
    $web3ConnectorsManager: any
  }
}

const plugin: Plugin = ({ store, $config }, inject: Inject) => {
  const web3ConnectorsManager = new Web3ConnectorsManager({
    cacheConnector: true,
    connectorOptions: {
      injected: {
        connectorClass: InjectedConnector
      },
      oneWallet: {
        connectorClass: OneWalletConnector,
        options: {
          chainId: $config.networkChainId
        }
      },
      mathWallet: {
        connectorClass: MathWalletConnector,
        options: {
          chainId: $config.networkChainId
        }
      }
    }
  })
  inject('web3ConnectorsManager', web3ConnectorsManager)

  const provider = new Harmony($config.NETWORK_URL, {
    chainType: ChainType.Harmony,
    chainId: $config.networkChainId
  })
  inject('library', provider)
  inject('contracts', {})

  store.dispatch('setProvider', {
    provider
  })
}

export default plugin
