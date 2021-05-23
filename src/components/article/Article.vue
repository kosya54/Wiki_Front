<template>
    <div class="columns">
        <div class="column is-one-fifth">
            <ArticleAnchors v-bind:headings="article.headings" />
        </div>

        <div class="column">
            <h2 class="title">{{ article.title }}</h2>

            <div v-for="heading in article.headings" :key="heading.id">
                <h3 class="subtitle" v-bind:ref="heading.id">{{ heading.content }}</h3>

                <div v-for="paragraph in heading.paragraphs" :key="paragraph.id">

                    <p class="paragraph">{{ paragraph.content }}</p>

                    <Numbering v-if="paragraph.numberings.length > 0" v-bind:numberings="paragraph.numberings" />

                    <Images v-if="paragraph.imageNames.length > 0" v-bind:images="paragraph.imageNames" />

                    <div v-if="paragraph.tables.length > 0">
                        <ArticleTable
                                v-for="table in paragraph.tables"
                                :key="table.id"
                                v-bind:table="table"
                        />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Numbering from '@/components/article/Numbering'
import Images from '@/components/article/Images'
import ArticleAnchors from '@/components/article/ArticleAnchors'
import ArticleTable from '@/components/article/ArticleTable'

export default {
  name: 'Article',
  components: { ArticleTable, ArticleAnchors, Numbering, Images },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle: function () {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      axios
        .get('http://localhost:8080/api/articles/' + this.$route.params.id, config)
        .then(response => {
          this.article = response.data
        }, error => {
          console.log(error)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted: function () {
    this.getArticle()
  }
}
</script>

<style scoped>
.paragraph {
    text-indent: 2em;
}
</style>
