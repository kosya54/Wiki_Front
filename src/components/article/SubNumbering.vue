<template>
  <li v-if="numbering.isDecimal">
    {{ numbering.text }}
    <ol v-if="numbering.sublist && numbering.sublist.length">
      <SubNumbering
              v-for="subNumbering in numbering.sublist"
              :key="subNumbering.id"
              v-bind:numbering="subNumbering"
      />
    </ol>
  </li>

  <li v-else>
    {{ numbering.text }}
    <ul v-if="numbering.sublist && numbering.sublist.length">
      <SubNumbering
              v-for="subNumbering in numbering.sublist"
              :key="subNumbering.id"
              v-bind:numbering="subNumbering"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SubNumbering',
  props: ['numbering']
}
</script>

<style scoped>

</style>
