import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    status:'',
    urlback:'http://localhost/hseqapp/public/',
    token:localStorage.getItem('token')||'',
    loginform:{},
    user: JSON.parse(localStorage.getItem('user'))||''
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
      state.loginform={}
    }
  },
  actions:{
    login({commit},loginform){
      return new Promise((resolve,reject)=>{
        commit('auth_request')
        axios({url:this.state.urlback+"login",data: loginform, method: 'POST'})
          .then(resp => {
            const token = resp.data.api_token
            const user = resp.data
            localStorage.setItem('token', token)
            localStorage.setItem('user',JSON.stringify(user))
            // Add the following line:
            axios.defaults.headers.common['Api-Token'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Api-Token']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    urlbackend: state => state.urlback
  }
})
