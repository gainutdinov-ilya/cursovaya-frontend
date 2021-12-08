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
    },
    register(context, data){
      console.log(data)
      return new Promise((resolve, reject)=> {
        instance.post('/api/register', {
          'name': data.name,
          'surname': data.surname,
          'second_name': data.second_name,
          'phone_number': data.phone_number,
          'oms': data.oms,
          'password': data.password,
          'email': data.email
        })
          .then(response=>{
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },

  modules: {
  }
})
