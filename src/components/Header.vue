<template>
  <section class="hero is-primary is-small">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">Wiki</h1>
            <h2 class="subtitle">RESt application</h2>
          </div>
          <div class="column">
            <div class="is-pulled-right">
              <h2 class="subtitle">{{ this.$store.getters.getUsername }}</h2>
              <a class="button is-small" href="#" v-on:click="logout">Выйти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  methods: {
    logout () {
      const config = {
        headers: {
          Authorization: this.$store.getters.getToken
        }
      }

      this.$store.dispatch('logout')
      this.$router.push('/login')

      axios
        .post('http://localhost:8080/api/auth/logout', '', config)
        .then(response => {
          if (response.status === 200) {
            console.log('Logout success')
          }
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
.brdr-red {
  border: 1px solid red;
}
</style>
