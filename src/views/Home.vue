<template>
  <div class="zcontainer">
    <div class="row mt-2">
      <div class="col-xl-9">
          <ResultTable />
      </div>
      <div class="col-xl-3">
        <div class="mb-2">
          <RoundSelector />
        </div>
        <div>
          <EloScoreViewer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EloScoreViewer from '@/components/EloScoreViewer';
import ResultTable from '@/components/ResultTable';
import RoundSelector from '@/components/RoundSelector';

export default {
  name: 'Home',
  components: {
    EloScoreViewer,
    ResultTable,
    RoundSelector
  }
}
</script>

<style scoped>
.zcontainer {
  margin: 0 auto;
  width: 90%;
  min-width: 768px;
}
</style>
