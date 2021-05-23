<template>
  <div id="app">

    <div class="main-container" v-if="this.$store.getters.isAuthenticated">

      <div class="section-container">

        <!-- Header -->
        <Header />

        <!-- Navbar-->
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="container">
            <div class="navbar-menu">
              <router-link class="navbar-item" to="/articles">ArticleList</router-link>
              <router-link class="navbar-item" to="/user">User</router-link>
              <router-link class="navbar-item" to="/admin">Admin</router-link>
              <!--<router-link class="navbar-item" to="/register">Register</router-link>-->
            </div>
          </div>
        </nav>

        <div class="container">
          <router-view />
        </div>

      </div>

      <Footer />

    </div>

    <SignIn v-else />

  </div>
</template>

<script>
import SignIn from '@/components/SignIn'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  name: 'app',
  components: { Header, Footer, SignIn }
}
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.section-container {
  flex: 1;
}

.brdr-red {
  border: 1px solid red;
}
</style>
