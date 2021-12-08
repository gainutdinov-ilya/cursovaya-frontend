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
  <div v-else class="profile">
    <h2 v-if="credentials.role == 'client'" class="role">Клиент</h2>
    <h2 v-else-if="credentials.role == 'admin'" class="role">Администратор</h2>
    <h2 v-else-if="credentials.role == 'personal'" class="role">Персонал</h2>
    <h2 v-else-if="credentials.role == 'doctor'" class="role">Врач</h2>
    <span class="personal">Фамилия: </span>
    <span v-if="!onEditSurname" @click="lastEdited = 'surname'; onEditSurname = true; cache = credentials.surname" class="personal">{{credentials.surname}}</span>
    <input v-else
           @blur="onEditSurname = false; saveCredentials"
           @keydown.enter="onEditSurname = false; saveCredentials"
           @keydown.esc="onEditSurname = false; credentials.surname = cache"
           type="text"
           v-model="credentials.surname"
    >
    <br>
    <span class="personal">Имя: </span>
    <span v-if="!onEditName" @click="lastEdited = 'name'; onEditName = true; cache = credentials.name" class="personal">{{credentials.name}}</span>
    <input v-else
           @blur="onEditName = false; saveCredentials()"
           @keydown.enter="onEditName = false; saveCredentials()"
           @keydown.esc="onEditName = false; credentials.name = cache"
           type="text"
           v-model="credentials.name"
    >
    <br>
    <span class="personal">Отчество: </span>
    <span v-if="!onEditSecName" @dblclick="lastEdited = 'secName' ;onEditSecName = true; cache = credentials.second_name" class="personal">{{credentials.second_name}}</span>
    <input v-else
           @blur="onEditSecName = false; saveCredentials()"
           @keydown.enter="onEditSecName = false; saveCredentials()"
           @keydown.esc="onEditSecName = false; credentials.second_name = cache"
           type="text"
           v-model="credentials.second_name"
    >
    <br>
    <div v-if="credentials.role == 'client'">
      <router-link class="action" to="/appointment">Запись к врачу</router-link><br>
    </div>
    <span class="action" @click="logout()">Выйти</span>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindowLanding'

export default {
  name: 'IndexPage',
  components: {
    ModalWindow
  },
  data: function () {
    return {
      credentials: {

      },
      onEditName: false,
      onEditSurname: false,
      onEditSecName: false,
      cache: null,
      lastEdited: null
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
          .then(resolve => {
            this.credentials = resolve
          });
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

.profile h2{
  margin: 0;
}

.profile {
  margin-top: 30px;
  margin-left: 30px;
  height: 80vh;
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
}

.profile .action {
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
</style>
