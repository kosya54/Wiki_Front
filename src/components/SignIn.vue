<template>
    <div class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <div class="box">
                            <div class="field">
                                <label class="label">Логин</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Введите логин" v-model="username"/>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Пароль</label>
                                <div class="control">
                                    <input class="input" type="password" placeholder="Пароль" v-model="password"/>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-success" v-on:click="login">Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      password: '',
      dismissSecs: 9999,
      dismissCountDown: 0,
      alertMessage: 'Request error'
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:8080/api/auth/login', { username: this.$data.username, password: this.$data.password })
        .then(response => {
          this.$store
            .dispatch('login', { token: response.data.token, username: response.data.username })

          this.$router.push('/articles')
        }, error => {
          this.$data.alertMessage = (error.response.data.message.length < 150) ? error.response.data.message : 'Request error. Please, report this error website owners'
          console.log(error)
        })
        .catch(e => {
          console.log(e)
          this.showAlert()
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style scoped>

</style>
