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
    <h2 v-if="credentials.role == 'client' " class="role">Клиент</h2>
    <h2 v-else-if=" credentials.role == 'admin' " class="role">Администратор</h2>
    <h2 v-else-if=" credentials.role == 'personal' " class="role">Персонал</h2>
    <h2 v-else-if=" credentials.role == 'doctor' " class="role">Врач</h2>
    <h3 class="personal">Фамилия: {{credentials.surname}}</h3>
    <h3 class="personal">Имя: {{credentials.name}}</h3>
    <h3 class="personal">Отчество: {{credentials.second_name}}</h3>
    <button type="button" @click="logout()">Выйти</button><br>
    <router-link to="/appointment">Запись к врачу</router-link>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindowLanding'

export default {
  name: 'IndexPage',
  components: {
    ModalWindow
  },
  data() {
    return {
      credentials: {

      }
    }
  },
  methods: {
    open: function () {
      this.$refs.modal.show = true
    },
    logout: function (){
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
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

</style>
