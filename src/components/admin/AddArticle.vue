<template>
  <div class="add-article">
    <input v-show="showInputFile" ref="inputFile" type="file" multiple v-on:change="getFileData">

    <div v-show="showButtons">
      <ol>
        <li v-for="(fileName, i) in fileNames" :key="i">{{ fileName }}</li>
      </ol>
      <button v-on:click="uploadFiles">Загрузить</button>
      <button v-on:click="resetFileList">Сбросить</button>
    </div>

    <div v-show="showFileList">
      <ol id="Uploaded-files">
        <li v-for="(fileName, i) in fileNames" :key="i">
          <p>{{ fileName }}</p>

          <select multiple>
            <option
                    v-for="category in categories"
                    :key="category.id"
                    v-bind:value="category.id"
            >{{ category.name}}</option>
          </select>
        </li>
      </ol>
      <button v-on:click="addArticles">Добавить статью</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddArticle',
  data () {
    return {
      fileNames: [],
      files: [],
      categories: [],
      showButtons: false,
      showFileList: false,
      showInputFile: true
    }
  },
  methods: {
    getFileData: function () {
      const fileList = this.$refs.inputFile.files
      for (let i = 0; i < fileList.length; i++) {
        this.fileNames.push(fileList[i].name)
        this.files.push(fileList[i])
      }

      this.showButtons = true
    },
    resetFileList: function () {
      this.files = []
      this.fileNames = []
      this.$refs.inputFile.value = null
      this.showButtons = false
    },
    uploadFiles: function () {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken,
          'Content-Type': 'multipart/form-data'
        }
      }

      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i])
      }

      axios
        .post('http://localhost:8080/api/upload', formData, config)
        .then(response => {
          this.resetFileList()
          this.getCategories()

          this.fileNames = response.data
          this.showFileList = true
          this.showInputFile = false
        }, error => {
          console.log(error)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getCategories: function () {
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
    addArticles: function () {
      const newArticleList = []
      const container = document.getElementById('Uploaded-files').children
      for (let i = 0; i < container.length; i++) {
        const newArticle = {
          fileName: '',
          userId: null,
          categoryIds: []
        }

        newArticle.fileName = container[i].firstElementChild.textContent
        newArticle.userId = this.$store.getters.getId

        Array
          .from(container[i].lastElementChild.children)
          .filter((elem) => {
            if (elem.selected) {
              newArticle.categoryIds.push(elem.value)
            }
          })
        newArticleList.push(newArticle)
      }

      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      axios
        .post('http://localhost:8080/api/articles', newArticleList, config)
        .then(response => {
          console.log(response.status)
          this.showInputFile = true
          this.showFileList = false
        }, error => {
          console.log(error)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>

</style>
