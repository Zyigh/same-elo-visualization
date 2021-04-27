import Vue from 'vue'
import Vuex from 'vuex'

import players from './players';
import rounds from './rounds';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    k: 40,
    baseElo: 2500,
    players,
    rounds
  },
  mutations: {
    RESET_ELO_FOR_PLAYER(state, {player, newElo}) {
      state.players[player.id - 1].elo = Math.round(newElo)
    },
    CHANGE_K(state, newK) {
      state.k = newK
    }
  },
  actions: {
    changeK({commit}, newK) {
      commit('CHANGE_K', newK)
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
    getPlayer: (state, id) => state.players.filter(p => p.id === id)[0] || null,
    getPlayers: state => state.players,
    getRound: (state, id) => state.rounds.filter(r => r.id === id)[0] || null,
    getRounds: state => state.rounds,
    getK: state => state.k
  }
})
