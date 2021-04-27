<template>
  <div>
    <b-card
      v-for="player in players"
      v-bind:key="player.id"
      :title="player.name"
      :sub-title="player.elo.toString()"
    />
  </div>
</template>

<script>
export default {
  name: "ResultTable",
  computed: {
    players() {
      return this.$store.getters.getPlayers.sort((p, q) => (p.elo === q.elo) ? 0 : (p.elo < q.elo ? 1 : -1))
    }
  }
}
</script>
