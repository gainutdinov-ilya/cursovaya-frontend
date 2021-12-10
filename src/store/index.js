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
      second_name: null,
      oms: null,
      phone_number: null,
      role: localStorage.getItem('role') || null,
      email: null
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
    },
    isAdmin(state){
      return state.credentials.role === 'admin'
    },
    getCredentials(state){
      return state.credentials
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    setRole(state, role){
      state.credentials.role = role
    },
    removeToken(state){
      state.token = null
    },
    logout(state){
      state.credentials = {
        name: null,
        surname: null,
        second_name: null,
        oms: null,
        phone_number: null,
        role: null,
        email: null
      }
    },
    setCredentials(state, credentials){
      state.credentials.role = credentials.role
      state.credentials.email = credentials.email
      state.credentials.name = credentials.name
      state.credentials.surname = credentials.surname
      state.credentials.second_name = credentials.second_name
      state.credentials.oms = credentials.oms
      state.credentials.phone_number = credentials.phone_number
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
      localStorage.removeItem('role')

      context.commit('logout')
      instance.post('/api/logout',{headers:{
          'Authorization': `Bearer ${this.state.token}`
        }});

      context.commit('removeToken')
    },
    getCredentials(context){
      return new Promise( (resolve , reject) => {
        instance.get('/api/user',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then(response =>{
              context.commit('setCredentials', response.data)
              localStorage.setItem('role', response.data.role)
              context.commit('setRole', response.data.role)
              resolve(response.data)
            })
            .catch(error =>{
              reject(error)
            })
      })
    },
    register(context, data){
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
    updateCreditanials(context, data){
      return new Promise((resolve, reject)=>{
        instance.put('/api/user', {
          'name': data.name,
          'surname': data.surname,
          'second_name': data.second_name,
          'phone_number': data.phone_number,
          'oms': data.oms,
        })
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })

    },
    getUsersCount(){
      return new Promise((resolve)=>{
        instance.get('/api/usersCount',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then( response =>{
            resolve(response.data)
            });
      })
    },
    getUsers(context, count, offset){
      return new Promise((resolve)=>{
        instance.get('/api/users',
            {data:
                  {
                    'offset': offset,
                    'limit': count,
                  },
        headers: {
          'Authorization': `Bearer ${this.state.token}`
        }})
            .then( response =>{
              resolve(response.data)
            });
      })
    }
  },

  modules: {
  }
})
