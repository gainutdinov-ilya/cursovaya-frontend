<template>
  <form id="register" class="register-form" @submit.prevent="register()">
    <h2 class="text">Регистрация</h2>
    <input v-model="fio" type="text" name="personal_data" placeholder="Фамилия Имя Отчество" required><br>
    <input v-model="phone" type="tel" name="phone" placeholder="Номер телефона" minlength="10" maxlength="11" required><br>
    <input v-model="oms" type="text" name="oms" placeholder="Номер полиса ОМС" minlength="15" maxlength="16" required><br>
    <input v-model="email" type="email" name="email" placeholder="Электронная почта" required><br>
    <input v-model="password" type="password" name="password" placeholder="Пароль" required><br>
    <input v-model="password_repeated" type="password" name="password_r" placeholder="Повторите пароль" required><br>
    <input type="submit" value="Зарегестрироваться"><br>
    <router-link to="login">Уже есть аккаунта?</router-link>
  </form>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    register(){
      const fio = this.fio.split(' ');
      if(fio.length != 3){
        alert("Введите Фамилию Имя Отчество")
        return 0
      }
      fio.forEach(element => {
        if(element === ''){
          alert("Введите Фамилию Имя Отчество")
          return 0
        }
      })
      if(this.password !== this.password_repeated){
        alert("Введёные пароли не совпадают")
        return 0
      }
      const name = fio[1]
      const surname = fio[0]
      const second_name = fio[2]
      const creditanials = {
        name: name,
        surname: surname,
        second_name: second_name,
        oms: this.oms,
        password: this.password,
        email: this.email,
        phone_number: this.phone
      }
      this.$store.dispatch('register', creditanials)
        .then(() =>{
          alert("Вы успешно зарегестрированы")
        })
        .catch(() => {
          alert("Ошибка, может вы уже регистрировались?")
        })

    }
  }
}
</script>

<style scoped>
.register-form{
  position: absolute;
  width: 800px;
  height: 720px;
  left: calc(50% - 800px/2);
  top: calc(50% - 720px/2);
  background: white;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  text-align: center;
}

.register-form input{
  font-family: Roboto;
  font-size: 35px;
  margin-top: 15px;
  width: 450px;
  height: 65px;
  text-align: center;
  border-radius: 0px;
  border: 2px solid var(--main-color);
  padding: 0 0 0 0;
  color: var(--main-color);
  box-sizing: unset;
  background: transparent;
  transition: 1s;
}

.register-form input::placeholder{
  color: var(--main-color);
}

.register-form input:focus::placeholder{
  color: var(--second-color);
}

.register-form input:focus{
  border-radius: 0px;
  border-color: var(--main-color);
  outline: none;
  color: white;
  transition: 1s;
  background: var(--main-color);
}

.register-form .text{
  font-family: Roboto;
  margin-top: 20px;
  margin-bottom: 0px;
  color: var(--main-color);
  font-size: 48px;
}

.register-form input[type="submit" i]{
  background-color: white;
  transition: 2s;
}

.register-form input[type="submit" i]:hover{
  transition: 2s;
  background-color: var(--main-color);
  color:white;
}

@font-face {
  font-family: 'tooth';
  src: url('/assets/font/tooth.eot?0000');
  src: url('/assets/font/tooth.eot?0000#iefix') format('embedded-opentype'),
  url('/assets/font/tooth.woff2?0000') format('woff2'),
  url('/assets/font/tooth.woff?0000') format('woff'),
  url('/assets/font/tooth.ttf?0000') format('truetype'),
  url('/assets/font/tooth.svg?0000#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}

.register-form input[type="password" i]{
  font-family: "tooth";
  font-style: normal;
  font-weight: normal;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
}

.register-form a{
  font-family: Roboto;
  text-decoration: var(--second-color) solid;
  text-decoration-line: underline;
  color: var(--second-color);
  font-size: 28px;
  transition: 1s;
}

.register-form a:hover{
  color: var(--main-color);
  transition: 1s;
}

</style>
