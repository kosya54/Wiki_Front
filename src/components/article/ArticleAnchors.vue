<template>
  <div class="panel">
    <div class="panel-heading">Содержание</div>
    <ul>
      <li
          class="panel-block"
          v-for="heading in headings"
          :key="heading.id"
          v-on:click="goTo(heading.id)"
      >
        {{ heading.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArticleAnchors',
  props: ['headings'],
  methods: {
    goTo (toElement) {
      const element = this.$parent.$refs[toElement]
      window.scrollTo(0, element[0].offsetTop)
    }
  }
}
</script>

<style scoped>
.panel-block {
  cursor: pointer;
}
</style>
