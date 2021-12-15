<template>
  <form @submit.prevent="create()" class="display">
    <h2 class="primary-text size-3 first-text">Создание пользователя</h2>
    <div>
      <span class="personal">Электронная почта: </span>
      <input
          class="personal personal-action-selected"
          type="email"
          v-model="credentials.email"
          maxlength="128"
          minlength="6"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Пароль: </span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.password"
          maxlength="128"
          minlength="6"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Фамилия:</span>
      <input
          tool-tip="Кликните на то что хотите изменить"
          class="personal personal-action-selected tool-tip"
          type="text"
          v-model="credentials.surname"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Имя:</span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.name"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Отчество:</span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.second_name"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Мобильный телефон: </span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.phone_number"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Номер полиса: </span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.oms"
          maxlength="16"
          minlength="14"
          required
      >
      <br>
    </div>
    <div>
      <span class="personal">Роль:</span>
      <select class="personal" v-model="credentials.role">
        <option value="admin">Администратор</option>
        <option value="personal">Персонал</option>
        <option value="client">Клиент</option>
        <option value="doctor">Врач</option>
      </select>
    </div>
    <div v-if="credentials.role === 'doctor'">
      <span class="personal">Специальность: </span>
      <input
          class="personal personal-action-selected"
          type="text"
          v-model="credentials.speciality"
          required
      >
      <br>
    </div>
    <button class="default-button default-button-size pointer" type="submit">Создать</button>
    <button type="button" class="default-button default-button-size pointer" @click="this.$router.go(-1);">Назад</button>
  </form>

</template>
<script>

export default {
  name: "AdminCreateAccount",
  data: function () {
    return {
      credentials: {
        email: null,
        name: null,
        surname: null,
        second_name: null,
        role: null,
        oms: null,
        phone_number: null,
        password: null,
        speciality: null,
      }
    }
  },
  methods: {
    create() {
      this.$store.dispatch('createUser', this.credentials)
          .then(() =>  {
            alert("Пользователь успешно создан")
            return
          })
          .catch(error =>{
            alert(error)
          })
      return
    }
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

select {
  outline: none;
  border: none;
}

button {
  margin-right: 10px;
}

</style>
