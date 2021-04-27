<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-lg-6">
        <div class="mb-2">
          <EloScoreViewer />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="mb-2">
          <RoundSelector />
        </div>
        <div>
          <ResultTable />
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
