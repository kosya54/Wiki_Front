<template>
    <div>
        <button class="button" v-if="isAdmin" v-on:click="deleteArticles">Удалить</button>
        <div v-for="article in articles" :key="article.id">
            <div>
                <input v-if="isAdmin" type="checkbox" v-bind:value="article.id">
                <router-link :to="{ name: 'Article', params: { id: article.id }}">
                    {{ article.title }}
                </router-link>
            </div>
            <div>{{ article.user.username }}</div>
            <div>{{ article.postedDate }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Articles',
  props: ['articles'],
  computed: {
    isAdmin: function () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    deleteArticles: function () {
      const articleIds = []
      Array
        .from(document.getElementsByTagName('input'))
        .filter((elem) => {
          if (elem.checked) {
            articleIds.push(Number(elem.value))
          }
        })

      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        },
        data: articleIds
      }

      axios
        .delete('http://localhost:8080/api/articles', config)
        .then(response => {
          if (response.status === 200) {
            articleIds.forEach((id) => {
              this.deleteFromProps(id)
            })

            if (this.articles.length === 0) {
              this.$emit('articlesEmpty', {
                error: 'На этой странице пусто.'
              })
            }
          }
        }, error => {
          console.log(error)
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteFromProps: function (id) {
      this.articles
        .forEach((elem) => {
          if (elem.id === id) {
            const index = this.articles.indexOf(elem)
            this.articles.splice(index, 1)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
