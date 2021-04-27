<template>
  <div>
    <b-table
      :fields="fields"
      :items="items"
      :responsive="true"
      head-variant="light"
      bordered
      fixed
    >
      <template #head()="scope">
        <div class="overflow-auto">
          {{ scope.label }}
        </div>
      </template>
      <template #cell(Nom)="row">
        <div class="overflow-auto">
          {{ row.value }}
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "ResultTable",
  computed: {
    rawFields() {
      return this.getPlayers.map(player => player.name.replace(/ /g, '_'))
    },
    fields() {
      return [
        'Nom',
        ...this.rawFields
      ]
    },
    items() {
      let gamesByPlayer = [];
      const fields = this.rawFields

      this.getRoundsRestricted.flatMap(g => g).forEach((round) => {
        if (!gamesByPlayer[round.whitePlayer - 1]) {
          gamesByPlayer[round.whitePlayer - 1] = []
        }
        gamesByPlayer[round.whitePlayer - 1].push(round)
      })

      return gamesByPlayer.map((games, i) => {
        let col = 0
        const baseItem = {
          'Nom': fields[i].replace(/_/g, ' '),
          _cellVariants: {'Nom': 'light'}
        }
        baseItem[fields[col]] = ''
        baseItem._cellVariants[fields[i]] = 'dark'

        return games
          .sort((g1, g2) => g1.blackPlayer < g2.blackPlayer ? -1 : 1)
          .reduce((item, game) => {
            if (col === i) {
              col++
            }

            item[fields[game.blackPlayer - 1]] = game.result.toString()
            col++

            return item
          },
            baseItem
          )
      });
    },
    ...mapGetters(['getPlayers', 'getRoundsRestricted'])
  }
}
</script>
