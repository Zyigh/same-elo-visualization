<template>
  <div class="row">
    <div class="col-8 d-flex">
      <b-form-select v-model="currentRound" :options="options" @change="resetElos" class="mt-auto" />
    </div>
    <div class="col-4">
      <label for="k-changer">Valeur de K</label>
      <b-form-input id="k-changer" v-model="k" type="number" @change="changeK" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "RoundSelector",
  mounted() {
    this.k = this.getK
  },
  data() {
    return {
      currentRound: -1,
      k: 0
    }
  },
  computed: {
    options() {
      return [{
          value: -1,
          text: 'Avant Tournoi'
        },
        ...this.getRounds.map((r, i) => {
          return {
            value: i,
            text: `Ronde ${i + 1}`
          }
        })
      ]
    },
    ...mapGetters([
        'getK',
        'getRounds'
    ])
  },
  methods: {
    resetElos() {
      this.$store.dispatch('computeElosAtRound', this.currentRound)
    },
    async changeK() {
      await this.$store.dispatch('changeK', this.k)
      await this.$store.dispatch('computeElosAtRound', this.currentRound)
    }
  }
}
</script>
