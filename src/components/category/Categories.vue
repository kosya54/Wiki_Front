<template>
    <div class="panel">
        <div class="panel-heading">Категории</div>
        <div class="panel-block" v-for="category in categories" :key="category.id">
            <router-link :to="{ name: 'ArticleListByCategory', params: { id: category.id }}">
                {{ category.name }}
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Categories',
  props: ['categories']
}
</script>

<style scoped>

</style>
