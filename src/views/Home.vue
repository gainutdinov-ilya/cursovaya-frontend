<template>
  <div v-if="!loggedIn">
    <ModalWindow ref="modal"></ModalWindow>
    <div class="landing">
      <h2>Стоматология</h2>
      <div class="text">
        <li>Без очередей</li>
        <li>И звонков</li>
        <li>Всё очень просто!</li>
      </div>
      <button type="button" @click="open()">Запишись онлайн</button>
    </div>
    <img :src="require('@/assets/landing.jpg')" alt="" class="landing-image" v-bind:height='520' v-bind:width='520'>
  </div>
  <div v-else class="display">
    <div class="profile">
      <h2 v-if="credentials.role == 'client'" class="role">Клиент</h2>
      <h2 v-else-if="credentials.role == 'admin'" class="role">Администратор</h2>
      <h2 v-else-if="credentials.role == 'personal'" class="role">Персонал</h2>
      <h2 v-else-if="credentials.role == 'doctor'" class="role">Врач</h2>
      <div>
        <span class="personal">Фамилия:</span>
        <div tool-tip="Кликните на то что хотите изменить" class="pointer personal personal-action tool-tip" v-if="!onEditSurname" @click="lastEdited = 'surname'; onEditSurname = true; cache = credentials.surname">{{credentials.surname}}</div>
        <input
            tool-tip="Кликните на то что хотите изменить"
            class="personal personal-action-selected tool-tip"
            v-else
            @blur="onEditSurname = false; saveCredentials()"
            @keydown.enter="onEditSurname = false; saveCredentials()"
            @keydown.esc="onEditSurname = false; credentials.surname = cache"
            type="text"
            v-model="credentials.surname"
            v-focus
        >
        <br>
      </div>
      <div>
        <span class="personal">Имя: </span>
        <div class="pointer personal personal-action" v-if="!onEditName" @click="lastEdited = 'name'; onEditName = true; cache = credentials.name">{{credentials.name}}</div>
        <input v-else
               class="personal personal-action-selected"
               @blur="onEditName = false; saveCredentials()"
               @keydown.enter="onEditName = false; saveCredentials()"
               @keydown.esc="onEditName = false; credentials.name = cache"
               type="text"
               v-model="credentials.name"
               v-focus
        >
        <br>
      </div>
      <div>
        <span class="personal">Отчество: </span>
        <div class="pointer personal personal-action" v-if="!onEditSecName" @click="lastEdited = 'secName' ;onEditSecName = true; cache = credentials.second_name" >{{credentials.second_name}}</div>
        <input v-else
               class="personal personal-action-selected"
               @blur="onEditSecName = false; saveCredentials()"
               @keydown.enter="onEditSecName = false; saveCredentials()"
               @keydown.esc="onEditSecName = false; credentials.second_name = cache"
               type="text"
               v-model="credentials.second_name"
               v-focus
        >
        <br>
      </div>
      <div>
        <span class="personal">Мобильный телефон: </span>
        <div class="pointer personal personal-action" v-if="!onEditPhone" @click="lastEdited = 'phone' ;onEditPhone = true; cache = credentials.phone_number" >{{credentials.phone_number}}</div>
        <input v-else
               v-focus
               class="personal personal-action-selected"
               @blur="onEditPhone = false; saveCredentials()"
               @keydown.enter="onEditPhone = false; saveCredentials()"
               @keydown.esc="onEditPhone = false; credentials.phone_number = cache"
               type="text"
               v-model="credentials.phone_number"
        >
        <br>
      </div>
      <div>
        <span class="personal">Номер полиса: </span>
        <div class="personal pointer personal-action" v-if="!onEditOms" @click="lastEdited = 'phone' ;onEditOms = true; cache = credentials.oms" >{{credentials.oms}}</div>
        <input v-else
               v-focus
               class="personal personal-action-selected"
               @blur="onEditOms = false; saveCredentials()"
               @keydown.enter="onEditOms = false; saveCredentials()"
               @keydown.esc="onEditOms = false; credentials.oms = cache"
               type="text"
               v-model="credentials.oms"
               maxlength="16"
               minlength="14"
               required
        >
        <br>
      </div>
    </div>
    <div class="actions">
      <div v-if="credentials.role == 'client'">
        <router-link class="action" to="/appointment">Запись к врачу</router-link><br>
      </div>
      <div v-if="credentials.role == 'admin'">
        <router-link class="action" to="/listUsers">Список пользователей</router-link><br>
        <router-link class="action" to="/timeToRecord">Управление Талонами</router-link><br>
      </div>
      <span class="action" @click="logout()">Выйти</span>
    </div>
    <div class="info">
      <h2 class="primary-text">Уведомления</h2>
      <div class="alerts">
        <div v-for="alert in alerts" :key="alert" class="alert">
          <h2 class="primary-text size-1">{{alert.title}}</h2>
          <span class="secondary-text text">{{alert.text}}</span><br>
          <router-link class="action primary-text" v-bind:to="alert.action">{{alert.action_title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindowLanding'

export default {
  name: 'Home',
  components: {
    ModalWindow
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  data: function () {
    return {
      credentials: {

      },
      onEditName: false,
      onEditSurname: false,
      onEditSecName: false,
      onEditPhone: false,
      onEditOms: false,
      cache: null,
      lastEdited: null,
      alerts: null
    }
  },
  methods: {
    open: function () {
      this.$refs.modal.show = true
    },
    logout: function (){
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
    saveCredentials: function (){
      if(this.lastEdited === 'name' && this.credentials.name === this.cache
          ||
          this.lastEdited === 'surname' && this.credentials.surname === this.cache
          ||
          this.lastEdited === 'secName' && this.credentials.second_name === this.cache
          ||
          this.lastEdited === 'phone' && this.credentials.phone_number === this.cache
          ||
          this.lastEdited === 'oms' && this.credentials.oms === this.cache
      ){
        return
      }
      this.$store.dispatch('updateCreditanials', this.credentials)
    }
  },
  computed: {
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  },
  mounted() {
    if(this.loggedIn) {
      this.$store.dispatch('getCredentials')
      this.credentials = this.$store.getters.getCredentials
      this.$store.dispatch('getAlerts')
          .then(promise =>{
            this.alerts = promise
          })
      setInterval(() => {
        this.$store.dispatch('getAlerts')
            .then(promise =>{
              this.alerts = promise
            })
      }, 60000)
    }
  }
}
</script>

<style>
.landing {
  position: absolute;
  width: 640px;
  height: 420px;
  left: 420px;
  top: 280px;
}

.landing h2 {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  margin: 0;
  line-height: 75px;
  color: var(--main-color);
}

.landing .text {
  margin-top: 50px;
  height: 160px;
}

.landing .personal {
  color: var(--second-color);
  font-family: Roboto;
  font-size: 48px;
  font-weight: 500;
  margin: 1px;

}

.landing .text li {
  list-style: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 56px;
  color: var(--second-color);
}

.landing button , .landing .button{
  border: none;
  background: var(--another-color);
  color: var(--second-color);
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  padding: 10px;
  margin-top: 45px;
  bottom: 0;
}

.landing button:focus , .landing .button:focus {
  border: none;
}

.landing-image {
  position: absolute;
  left: 1010px;
  top: 255px;
}


.profile{
  position: absolute;
  width: 720px
}

.profile h2{
  margin: 0;
}

.profile .role {
  color: var(--main-color);
  font-size: 3em;
}

.profile .personal {
  display: inline-block;
  color: var(--second-color);
  font-size: 2.5em;
  margin-top: 10px;
  transition: 1s;
  border-bottom: 1px dotted transparent;
}

.profile .tool-tip:hover::after{
  content: attr(tool-tip);
  position: absolute;
  left: 300px; top: 30%;
  z-index: 1;
  font-size: 15px;
  padding: 5px 10px;
  border: 1px solid var(--another-color);
}

.profile .personal-action:hover {
  transition: 1s;
  border-bottom: dotted 1px var(--second-color);
}

.profile .personal-action-selected {
  font-family: Roboto;
  padding: 0;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px
}

.profile .personal-action-selected:focus {
  font-size: 2.5em;
  padding: 0;
  outline: none;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px
}

.actions{
  display: inline-block;
  position: absolute;
  width: 720px;
  bottom: 30px;
}

.actions .action {
  display: inline-block;
  border: none;
  background: var(--another-color);
  box-sizing: content-box;
  color: var(--second-color);
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.info{
  width: 640px;
  position: absolute;
  right: 30px;
}

.info h2{
  font-size: 48px;
  margin: 0;
}

.info .alerts{
  z-index: 9999;
  margin-top: 10px;
  box-shadow: 0px 4px 10px 4px rgba(34, 60, 80, 0.2);
  width: 600px;
  height: 360px;
  scroll-behavior: smooth;
  overflow-y: scroll;
  scrollbar-arrow-color: #57CCB5;
  scrollbar-base-color: #3A8793;
}

.alerts .alert{

  padding: 10px;
  border-top: solid 2px #57CCB5;
  border-bottom: solid 2px #57CCB5;
}

.alert .text,.alert .action {
  font-size: 23px;
}

.alert .action{
  text-decoration: none;
}

</style>
