import { createStore } from 'vuex'
import axios from "axios";

if(localStorage.getItem('accessToken') != null)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');

const instance = axios.create({baseURL:'http://127.0.0.1:80'});

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
        instance.post('/api/login',{
          'email': credentials.email,
          'password': credentials.password
        })
            .then(response => {
              localStorage.setItem('accessToken', response.data.access_token)
              context.commit('setToken', response.data.access_token)
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
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
      instance.post('/api/logout',{headers:{
          'Authorization': `Bearer ${this.state.token}`
        }});

      context.commit('removeToken')
    },
    getCredentials(){
      return new Promise( (resolve , reject) => {
        instance.get('/api/user')
            .then(response =>{
              resolve(response.data)
            })
            .catch(error =>{
              reject(error)
            })
      })
    },
    register(credentials){

      new
      instance.post('/api/register', credentials)
          .then()
    }


  },
  modules: {
  }
})
