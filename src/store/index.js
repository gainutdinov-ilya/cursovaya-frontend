import { createStore } from 'vuex'
import axios from 'axios';

if(localStorage.getItem('accessToken') != null)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');

const instance = axios.create({baseURL:'http://pc.lan'});

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
    isPersonal(state){
      return state.credentials.role === 'personal' || state.credentials.role === 'admin'
    },
    isDoctor(state){
      return state.credentials.role === 'doctor'
    },
    isClient(state){
      return state.credentials.role === 'client'
    },
    getCredentials(state){
      return state.credentials
    },
    getServer(){
      return instance;
    },
    isLoading(state){
      return state.loading
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
    //login actions
    authorize(context, credentials){
      return new Promise((resolve, reject) => {
        instance.post('/api/login',{
          'email': credentials.email,
          'password': credentials.password
        })
            .then(response => {
              localStorage.setItem('accessToken', response.data.access_token)
              instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
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
    register(context, data){
      return new Promise((resolve, reject)=> {
        instance.post('/api/register', {
          'name': data.name,
          'surname': data.surname,
          'second_name': data.second_name,
          'phone_number': data.phone_number,
          'oms': data.oms,
          'password': data.password,
          'email': data.email,
        })
          .then(response=>{
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //get actions
    searchUser(context, data){
      return new Promise( (resolve , reject) => {
        instance.get('/api/user/search',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          },
          params: data
        })
            .then(response =>{
              resolve(response.data)
            })
            .catch(error =>{
              reject(error)
            })
      })
    }
    ,
    getAlerts(){
      return new Promise( (resolve , reject) => {
        instance.get('/api/alerts',{headers:{
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
    ,
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
    getUsersCount(){
      return new Promise((resolve)=>{
        instance.get('/api/users/count',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then( response =>{
            resolve(response.data)
            });
      })
    },
    getUsers(context, data){
      return new Promise((resolve)=>{
        instance.get('/api/users?limit='+data.limit+'&offset='+data.offset,{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then( response =>{
              resolve(response.data)
            });
      })
    },
    getCalendar(){
      return new Promise((resolve)=>{
        instance.get('/api/calendar',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          }})
            .then( response =>{
              resolve(response.data)
            })
            .catch(function (){
              resolve(this.getCalendar())
        })
      })
    },
    getUserByID(context, id){
      return new Promise((resolve)=>{
        instance.get('/api/user/id',{headers:{
            'Authorization': `Bearer ${this.state.token}`
          },params: {
            id: id
          }
        })
            .then( response =>{
              resolve(response.data)
            });
      })
    },
    getAllDoctors(){
      return new Promise((resolve)=> {
        instance.get('/api/doctors', {
          headers: {
            'Authorization': `Bearer ${this.state.token}`
          }
        })
            .then(response => {
              resolve(response.data)
            })
      })
    },
    getNote(context, data){
      return new Promise((resolve, reject)=> {
        instance.get('/api/calendar/note', {
          headers: {
            'Authorization': `Bearer ${this.state.token}`
          },
          params: data
        })
            .then(response => {
              resolve(response.data)
            })
            .catch(response => {
              reject(response.data)
            })
      })
    },
    getNotes(context, data){
      return new Promise((resolve, reject)=> {
        instance.get('/api/user/notes', {
          headers: {
            'Authorization': `Bearer ${this.state.token}`
          },
          params: data
        })
            .then(response => {
              resolve(response.data)
            })
            .catch(response => {
              reject(response.data)
            })
      })
    },
    //put  actions
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
    updateUserByID(context, data){
      return new Promise((resolve, reject)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
        instance.put('/api/user/id', {
          'id': data.id,
          'name': data.name,
          'surname': data.surname,
          'second_name': data.second_name,
          'phone_number': data.phone_number,
          'oms': data.oms,
          'role': data.role,
          'speciality': data.speciality
        },)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })

    },
    //create
    createNote(context, data){
      return new Promise((resolve, reject)=> {
        instance.post('/api/calendar/note', {
          'id': data.id,
          'userID': data.userID || null
        })
            .then(response=>{
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    createUser(context, data){
      return new Promise((resolve, reject)=> {
        instance.post('/api/user', {
          'name': data.name,
          'surname': data.surname,
          'second_name': data.second_name,
          'phone_number': data.phone_number,
          'oms': data.oms,
          'password': data.password,
          'email': data.email,
          'role': data.role,
          'speciality': data.speciality
        })
            .then(response=>{
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    createCalendar(context, data){
      instance.post('/api/calendar', {
        'interval': data.interval,
        'startTime': data.startTime,
        'endTime': data.endTime,
        'startDate': data.startDate,
        'endDate': data.endDate,
        'catches': data.catches,
        'doctors': data.doctors,
      },{
        headers:{
          'Authorization': `Bearer ${this.state.token}`
        }
      })

    },
    //delete
    cancelNote(context, id){
      return new Promise((resolve, reject)=> {
        instance.delete('/api/calendar/note', {
          params:{
            id: id
          }
        })
            .then(response=>{
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    deleteCalendar(context, data) {
      return new Promise((resolve, reject) => {
        instance.delete('/api/calendar', {params:{
          'startDate': data.startDate,
          'endDate': data.endDate
        }})
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    deleteUser(context,data){
      return new Promise((resolve, reject) => {
        instance.delete('/api/user', {params:{
            'id': data,
          }})
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    }
  },
  modules: {
  }
})
