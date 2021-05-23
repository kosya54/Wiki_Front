<template>
    <div>
        <div class="columns is-multiline">
            <div class="column is-one-fifth">
                <Categories v-bind:categories="categories" />
            </div>
            <div class="column">
                <Articles v-bind:articles="articles" v-show="!showError" v-on:articlesEmpty="articlesEmpty" />
                <NotFound class="test" v-bind:error="error" v-show="showError" />
            </div>
        </div>
        <div class="columns mb-1">
            <div class="column has-text-centered">
                <button class="button is-small" :disabled="page === 0" v-on:click="getPreviousPage">Назад</button>
                <button class="button is-small ml-1" :disabled="!hasNext" v-on:click="getNextPage">Вперед</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Articles from '@/components/article/Articles'
import Categories from '@/components/category/Categories'
import NotFound from '@/components/NotFound'

export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      categories: [],
      error: {},
      page: 0,
      size: 20,
      hasNext: false,
      showError: false
    }
  },
  components: { Categories, Articles, NotFound },
  watch: {
    '$route.params.id': function () {
      if (this.$route.params.id) {
        this.page = 0
        this.getArticleListByCategoryId(this.$route.params.id)
      } else {
        this.page = 0
        this.getArticles()
      }
    }
  },
  methods: {
    articlesEmpty (error) {
      this.error = error
      this.showError = true
    },
    getNextPage () {
      if (this.page >= 0) {
        this.page++

        if (this.$route.params.id) {
          this.getArticleListByCategoryId(this.$route.params.id)
        } else {
          this.getArticles()
        }
      }
    },
    getPreviousPage () {
      if (this.page >= 0) {
        this.page--

        if (this.$route.params.id) {
          this.getArticleListByCategoryId(this.$route.params.id)
        } else {
          this.getArticles()
        }
      }
    },
    getCategories () {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      axios
        .get('http://localhost:8080/api/categories', config)
        .then(response => {
          this.categories = response.data
        }, error => {
          console.log(error)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getArticles () {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      axios
        .get('http://localhost:8080/api/articles?page=' + this.page + '&size=' + this.size, config)
        .then(response => {
          this.articles = response.data
          this.showError = false
          this.hasNext = this.articles.length >= this.size
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.error = e.response.data
            this.showError = true
            this.hasNext = false
          }
        })
    },
    getArticleListByCategoryId (id) {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      axios
        .get('http://localhost:8080/api/articles/categories/' + id + '?page=' + this.page + '&size=' + this.size, config)
        .then(response => {
          this.articles = response.data
          this.showError = false
          this.hasNext = this.articles.length >= this.size
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.error = e.response.data
            this.showError = true
            this.hasNext = false
          }
        })
    },
    refreshRouter () {
      if (this.$route.name !== 'ArticleList') {
        this.$router.push('/articles')
      }
    }
  },
  created: function () {
    this.getCategories()
    this.getArticles()
    this.refreshRouter()
  }
}
</script>

<style scoped>
.brdr-red {
    border: 1px solid red;
}

.brdr-blue {
    border: 1px solid blue;
}
</style>
