<template>
  <div class="display">
    <h2 class="primary-text size-3 first-text">Редактирование пользователя</h2>
    <div>
      <span class="personal">Электронная почта: </span>
      <div class="personal pointer personal-action" v-if="!onEditEmail" @click="lastEdited = 'email' ;onEditEmail = true; cache = credentials.email" >{{credentials.email}}</div>
      <input v-else
             v-focus
             class="personal personal-action-selected"
             @blur="onEditEmail = false;"
             @keydown.enter="onEditEmail = false;"
             @keydown.esc="onEditEmail = false; credentials.email = cache"
             type="text"
             v-model="credentials.email"
             maxlength="16"
             minlength="14"
             required
      >
      <br>
    </div>
    <div>
      <span class="personal">Фамилия:</span>
      <div class="pointer personal personal-action tool-tip" v-if="!this.onEditSurname" @click="lastEdited = 'surname'; this.onEditSurname = true; cache = credentials.surname">{{credentials.surname}}</div>
      <input
          tool-tip="Кликните на то что хотите изменить"
          class="personal personal-action-selected tool-tip"
          v-else
          @blur="this.onEditSurname = false;"
          @keydown.enter="this.onEditSurname = false;"
          @keydown.esc="this.onEditSurname = false; credentials.surname = cache"
          type="text"
          v-model="credentials.surname"
          v-focus
      >
      <br>
    </div>
    <div>
      <span class="personal">Имя:</span>
      <div class="pointer personal personal-action" v-if="!onEditName" @click="lastEdited = 'name'; onEditName = true; cache = credentials.name">{{credentials.name}}</div>
      <input v-else
             class="personal personal-action-selected"
             @blur="onEditName = false;"
             @keydown.enter="onEditName = false;"
             @keydown.esc="onEditName = false; credentials.name = cache"
             type="text"
             v-model="credentials.name"
             v-focus
      >
      <br>
    </div>
    <div>
      <span class="personal">Отчество:</span>
      <div class="pointer personal personal-action" v-if="!onEditSecName" @click="lastEdited = 'secName' ;onEditSecName = true; cache = credentials.second_name" >{{credentials.second_name}}</div>
      <input v-else
             class="personal personal-action-selected"
             @blur="onEditSecName = false;"
             @keydown.enter="onEditSecName = false;"
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
             @blur="onEditPhone = false;"
             @keydown.enter="onEditPhone = false;"
             @keydown.esc="onEditPhone = false; credentials.phone_number = cache"
             type="text"
             v-model="credentials.phone_number"
      >
      <br>
    </div>
    <div>
      <span class="personal">Номер полиса: </span>
      <div class="personal pointer personal-action" v-if="!onEditOms" @click="lastEdited = 'oms' ;onEditOms = true; cache = credentials.oms" >{{credentials.oms}}</div>
      <input v-else
             v-focus
             class="personal personal-action-selected"
             @blur="onEditOms = false;"
             @keydown.enter="onEditOms = false;"
             @keydown.esc="onEditOms = false; credentials.oms = cache"
             type="text"
             v-model="credentials.oms"
             maxlength="16"
             minlength="14"
             required
      >
      <br>
    </div>

    <div v-if="this.$store.getters.isAdmin">
      <span class="personal">Роль:</span>
      <select class="personal" v-model="credentials.role">
        <option v-if="credentials.role === 'admin'" selected value="admin">Администратор</option>
        <option value="admin" v-else>Администратор</option>
        <option v-if="credentials.role === 'personal'" selected value="personal">Персонал</option>
        <option value="personal" v-else>Персонал</option>
        <option v-if="credentials.role === 'client'" selected value="client">Клиент</option>
        <option v-else value="client">Клиент</option>
        <option v-if="credentials.role === 'doctor'" selected value="doctor">Врач</option>
        <option v-else value="doctor">Врач</option>
      </select>
    </div>
    <div v-if="credentials.role === 'doctor'">
      <span class="personal">Специализация: </span>
      <div class="personal pointer personal-action" v-if="!onEditSpec" @click="lastEdited = 'spec' ;onEditSpec = true; cache = credentials.speciality " >{{credentials.speciality }}</div>
      <input v-else
             v-focus
             class="personal personal-action-selected"
             @blur="onEditSpec = false;"
             @keydown.enter="onEditSpec = false;"
             @keydown.esc="onEditSpec = false; credentials.speciality = cache"
             type="text"
             v-model="credentials.speciality"
             required
      >
      <br>
    </div>
    <button class="default-button-margin default-button-size pointer" @click="saveUser()">Сохранить</button>
    <button class="default-button-margin default-button-size pointer" @click="this.$refs.changePassword.open()">Изменить пароль</button>
    <button v-if="this.$store.getters.isAdmin" class="default-button-margin default-button-size pointer" @click="deleteUser()">Удалить</button>
    <button class="default-button-margin default-button-size pointer" @click="this.$router.go(-1)">Назад</button>
  </div>
  <ModalWindowChangePassword v-bind:no-old="true" ref="changePassword" v-bind:id="credentials.id"></ModalWindowChangePassword>
</template>

<script>
import ModalWindowChangePassword from "@/components/ModalWindowChangePassword";

export default {
  name: "UserPage",
  components:{
    ModalWindowChangePassword
  },
  data: function (){
    return {
      credentials:{

      },
      onEditName: false,
      onEditSurname: false,
      onEditSecName: false,
      onEditPhone: false,
      onEditOms: false,
      onEditSpec: false,
      onEditEmail: false,
      cache: null,
      lastEdited: null
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  methods:{
    saveUser(){
      this.$store.dispatch('updateUserByID', this.credentials)
      .then(()=>{
        alert("Сохранено")
      })
      .catch(() =>{
        alert("Ошибка, данная почта уже занята другим пользователем")
      })
    },
    deleteUser(){
      let confirm = prompt("Вы действительно хотите удалить пользователя ? ");
      if(confirm.toLowerCase() === 'да') {
        this.$store.dispatch('deleteUser', this.credentials.id)
            .then(() => {
              alert("Удалён")
              this.$router.go(-1)
            })
            .catch(() => {
              alert("Ошибка, попробуйте ещё раз")
            })
      }
    }
  },
  mounted() {
    this.$store.dispatch('getUserByID', this.$route.params.userID)
    .then(result => {
      this.credentials = result
    })
  }
}
</script>

<style scoped>
.personal {
  display: inline-block;
  color: var(--second-color);
  font-size: 2.5em;
  margin-top: 10px;
  transition: 1s;
  border-bottom: 1px dotted transparent;
  min-width: 100px;
  min-height: 32px;
  background: white;
}

.personal-action:hover {
  transition: 1s;
  border-bottom: dotted 1px var(--second-color);
}

.personal-action-selected {
  font-family: Roboto;
  padding: 0;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px
}

.personal-action-selected:focus {
  font-size: 2.5em;
  padding: 0;
  outline: none;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px
}


select{
  outline: none;
  border: none;
}

button{
  margin-right: 10px;
}

</style>
