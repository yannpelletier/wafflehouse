<template>
  <v-container class="page-container">
    <v-row v-if="accountWaffles.length > 0">
      <v-col cols="12" md="9" order="2" order-md="1">
        <v-row v-for="(waffle, index) in accountWaffles" :key="index">
          <inventory-waffle :waffle="waffle" />
        </v-row>
        <v-row>
          <v-card to="/waffles/create" width="100%" height="125" class="vh-center mx-5 mt-5 waffle-text create-waffle-button">
            Create New Waffle
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" order="1" order-md="2" class="px-10">
        <v-row class="vh-center">
          <v-img max-width="200" :src="require('~/static/logos/yflhouse.png')" />
        </v-row>
        <v-row class="vh-center waffle-text">
          Current Funds
        </v-row>
        <v-row class="vh-center">
          {{ currencyToken.formatAmountPrecision(currencyToken.balance, 4, true) }}
        </v-row>
        <v-row class="vh-center">
          {{ oneToken.formatAmountDecimals(oneToken.balance, 2, true) }}
        </v-row>
        <v-row class="vh-center">
          (${{ balanceValue }})
        </v-row>
        <v-row class="vh-center mt-10">
          <v-btn width="100%" max-width="250" outlined tile @click="returnTokens">
            Return Tokens
          </v-btn>
        </v-row>
        <v-row class="mt-5">
          <Tip />
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-row class="vh-center">
          <v-img max-width="250" contain :src="require('~/static/logos/yflhouse.png')" />
        </v-row>
        <v-row class="vh-center">
          <p>
            Looks like you haven’t made any waffles yet!
            <br>
            Let’s fix that.
          </p>
        </v-row>
        <v-row class="vh-center mt-10">
          <v-btn
            to="/waffles/create"
            width="80vw"
            max-width="600px"
            height="100px"
            :class="{'mobile': $vuetify.breakpoint.smAndDown}"
            class="waffle-text make-waffle-button"
          >
            Make Your Waffle
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import BigNumber from 'bignumber.js'
import { Ticker } from '../enums'
import Token from '~/database/Token'
import Waffle from '~/database/Waffle'
import InventoryWaffle from '~/components/InventoryWaffle'
import Tip from '~/components/layout/Tip'
import { WaffleStatus } from '~/enums'

export default {
  name: 'MyWaffles',
  components: {
    InventoryWaffle,
    Tip
  },
  middleware: 'forceWalletConnected',
  data () {
    return {
      WaffleStatus
    }
  },
  computed: {
    ...mapGetters({
      now: 'getNow'
    }),
    accountWaffles () {
      const waffles = Waffle.getters('getActiveAccountWaffles')
      return waffles.filter((waffle) => {
        return !waffle.hidden
      })
    },
    oneToken () {
      return Token.query().find(Ticker.ONE)
    },
    currencyToken () {
      return Token.query().find(Ticker.CURRENCY)
    },
    balanceValue () {
      const oneBalanceValue = this.oneToken.priceOf(this.oneToken.balance)
      const currencyBalanceValue = this.currencyToken.priceOf(this.currencyToken.balance)
      return new BigNumber(oneBalanceValue).plus(currencyBalanceValue).toFormat(2)
    }
  },
  async mounted () {
    if (this.$nuxt.$loading.start) {
      this.$nuxt.$loading.start()
    }
    await Promise.all([
      Waffle.dispatch('loadAccountWaffles'),
      Token.dispatch('loadTokensData')
    ])
    if (this.$nuxt.$loading.finish) {
      this.$nuxt.$loading.finish()
    }
  },
  methods: {
    returnTokens () {
      window.open('https://bridge.harmony.one/erc20')
    }
  }
}
</script>

<style scoped>
  .create-waffle-button {
    font-size: 40px;
    border-radius: 25px;
    border: 6px rgba(255, 255, 255, 0.7) solid;
    background: rgba(215, 215, 215, 0.33);
    user-select: none;
  }

  .make-waffle-button {
    padding: 20px;
    font-size: 40px;
    border-radius: 50px;
    text-shadow: -2px 0 #000000, 0 2px #000000, 2px 0 #000000, 0 -2px #000000;
    border: 3px white solid;
    background: radial-gradient(50% 50% at 50% 50%, #4BADC2 0%, #003553 100%);
  }
</style>
