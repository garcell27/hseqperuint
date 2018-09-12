import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    status:'',
    token:localStorage.getItem('token')||'',
    user:{}
  },
  mutations:{
    auth_request(state){
      state.status='loading'
    },
    auth_success(state, token,user){
      state.status='success'
      state.token=token
      state.user=user
    },
    auth_error(state){
      state.status='error'
    },
    logout(state){
      state.status=''
      state.token=''
      state.user={}
    }
  },
  actions:{
    login({commit},user){
      return new Promise((resolve,reject)=>{
        commit('auth_request')
        axios({url:"http://localhost/hseqapp/public/login",data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Api-Token'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Api-Token']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
