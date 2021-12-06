import { createStore } from 'vuex'
import axios from "axios";


export default createStore({
  state: {
    token: localStorage.getItem('accessToken') || null,
    credentials: {
      name: null,
      surname: null,
      second_name: null
    }
  },
  getters:{
    loggedIn(state){
      if(state.token != null){
        return true
      }
      else return false
    },
    token(state){
      return state.token
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    removeToken(state){
      state.token = null
    }
  },
  actions: {
    authorize(context, credentials){
      return new Promise((resolve, reject) => {
        const instance = axios.create({baseURL:'http://127.0.0.1:80'});
        instance.post('/api/login',{
          'email': credentials.email,
          'password': credentials.password
        })
            .then(response => {
              localStorage.setItem('accessToken', response.data.access_token)
              context.commit('setToken', response.data.access_token)
              resolve(response)
            })
            .catch(error =>{
              console.log(error)
              reject(error)
            });
      })
    },
    logout(context){
      localStorage.removeItem('accessToken')
      context.commit('removeToken')
    },
    getCredentials(){
      return new Promise( (resolve , reject) => {
        const instance = axios.create({baseURL:'http://127.0.0.1:80'});
        instance.get('/api/user',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then(response =>{
              resolve(response.data)
            })
            .catch(error =>{
              reject(error)
            })
      })
    }

  },
  modules: {
  }
})
