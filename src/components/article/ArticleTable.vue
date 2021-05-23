<template>
  <div class="article-table">
    <table>
      <tr v-for="row in table.rows" :key="row.id">
        <td v-for="cell in row.cells" :key="cell.id">{{ cell.content }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ArticleTable',
  props: ['table']
}
</script>

<style scoped>
  .article-table table {
    width: 100%;
  }

  .article-table table, td {
    border: 1px solid #000;
    border-collapse: collapse;
  }
</style>
