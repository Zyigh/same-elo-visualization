import Vue from 'vue'
import Vuex from 'vuex'

import players from './players';
import rounds from './rounds';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    k: 10,
    baseElo: 2500,
    players,
    rounds,
    lastRound: -1
  },
  mutations: {
    RESET_ELO_FOR_PLAYER(state, {player, newElo}) {
      state.players.filter(p => p.id === player.id)[0].elo = Math.round(newElo)
    },
    CHANGE_K(state, newK) {
      state.k = newK
    },
    CHANGE_LAST_ROUND(state, lastRound) {
      state.lastRound = lastRound
    }
  },
  actions: {
    changeK({commit}, newK) {
      commit('CHANGE_K', newK)
    },
    changeLastRound({commit}, lastRound) {
      commit('CHANGE_LAST_ROUND', lastRound)
    },
    computeElosAtRound({commit, state}, round) {
      const numberOfGames = round + 1
      const rounds = state.rounds.slice(0, numberOfGames)
      const games = rounds.flatMap(r => r)

      for (const player of state.players) {
        const averageScore = games
            .filter(game => game.whitePlayer === player.id || game.blackPlayer === player.id)
            .reduce((acc, game) => {
              if (game.whitePlayer === player.id) {
                return acc + game.result
              }
              return acc + Math.abs(game.result - 1)
            }, 0) / numberOfGames

        const newElo = numberOfGames > 0 ? state.baseElo + (state.k * (averageScore - 0.5)) : state.baseElo

        commit('RESET_ELO_FOR_PLAYER', {player, newElo})
      }
    }
  },
  modules: {
  },
  getters: {
    getK: state => state.k,
    getLastRound: state => state.lastRound,
    getPlayer: (state, id) => state.players.filter(p => p.id === id)[0] || null,
    getPlayers: state => state.players,
    getRound: (state, id) => state.rounds.filter(r => r.id === id)[0] || null,
    getRounds: state => state.rounds,
    getRoundsRestricted: state => state.rounds.slice(0, state.lastRound + 1),
  }
})
