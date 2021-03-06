<template>
  <v-container fluid class="page-container">
    <v-col class="pa-0 ma-0">
      <v-row class="vh-center waffle-text-border waffle-time-label">
        It's Waffle Time!
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-card class="wafflemaker-container" color="#000000AA" tile>
              <h1 class="vh-center wafflemaker-title waffle-text">
                Wafflemaker 9000
              </h1>
              <v-row>
                <v-spacer />
                <v-col cols="6">
                  <v-img :src="require('~/static/chef-yfl.png')" max-height="400" contain />
                </v-col>
                <v-col cols="6">
                  <v-img :src="require('~/static/chef-one.png')" max-height="400" contain />
                </v-col>
                <v-spacer />
              </v-row>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="px-10">
          <v-row class="vh-center">
            <v-img max-width="250" contain :src="require('~/static/logos/yflhouse.png')" />
          </v-row>
          <v-row class="vh-center">
            <p class="page-content text-justify">
              At the $YFL Waffle House, waffle-making is serious business. That’s why we’ve partnered with Harmony to help us find the world’s greatest waffle. In order to participate, you’ll need a few tasty ingredients.
              <br><br>
              Ready? Let’s get started.
            </p>
          </v-row>
          <v-row class="text-center vh-center">
            <v-btn width="100%" height="50" outlined tile @click="createWaffle">
              <h2>
                Create Waffle
              </h2>
            </v-btn>
            <h4 class="mt-2">
              Cost: {{ currencyToken.formatAmountPrecision(CREATE_WAFFLE_CURRENCY_COST, 1, true) }}
            </h4>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="vh-center my-10">
        <Tip />
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Ticker } from '~/enums'
import { CREATE_WAFFLE_CURRENCY_COST } from '~/constants'
import Waffle from '~/database/Waffle'
import Token from '~/database/Token'
import Tip from '~/components/layout/Tip.vue'

export default {
  name: 'Create',
  components: {
    Tip
  },
  data () {
    return {
      CREATE_WAFFLE_CURRENCY_COST
    }
  },
  middleware: 'forceWalletConnected',
  computed: {
    currencyToken () {
      return Token.query().find(Ticker.CURRENCY)
    }
  },
  methods: {
    createWaffle () {
      Waffle.dispatch('createWaffleFlow')
    }
  }
}
</script>

<style scoped>
  .waffle-time-label {
    font-size: 65px;
    margin-bottom: 50px;
  }

  .wafflemaker-container {
    border: 5px white solid !important;
  }

  .wafflemaker-title {
    background-color: #3d3d3d;
    padding: 25px;
  }

  .page-content {
    font-family: Roboto, Serif;
    font-size: 14pt;
    text-align: center;
    max-width: 800px;
  }
</style>
