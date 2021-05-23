import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  id: localStorage.getItem('user-id') || '',
  username: localStorage.getItem('user-name') || '',
  role: localStorage.getItem('user-role') || '',
  token: localStorage.getItem('user-token') || ''
}

const getters = {
  isAuthenticated: state => {
    return state.token != null && state.token !== ''
  },
  getId: state => {
    return state.id
  },
  getUsername: state => {
    return state.username
  },
  getToken: state => {
    return state.token
  },
  getRole: state => {
    return state.role
  },
  isAdmin: state => {
    return state.role === 'ADMIN'
  }
}

const mutations = {
  auth_login: (state, user) => {
    const id = getObjectFromToken(user.token).id
    const role = getObjectFromToken(user.token).role

    localStorage.setItem('user-id', id)
    localStorage.setItem('user-name', user.username)
    localStorage.setItem('user-role', role)
    localStorage.setItem('user-token', user.token)

    state.id = id
    state.username = user.username
    state.role = role
    state.token = user.token
  },
  auth_logout: () => {
    state.id = ''
    state.username = ''
    state.role = ''
    state.token = ''

    localStorage.removeItem('user-id')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-role')
    localStorage.removeItem('user-token')
  }
}

const actions = {
  login: (context, user) => {
    context.commit('auth_login', user)
  },
  logout: (context) => {
    context.commit('auth_logout')
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

function getObjectFromToken (token) {
  const jwtData = token.split('.')

  return JSON.parse(window.atob(jwtData[1]))
}
