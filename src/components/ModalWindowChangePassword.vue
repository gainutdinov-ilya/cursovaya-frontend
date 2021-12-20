<template>
  <div class="changePasswordWindow" v-if="show">
    <h2 style="margin-bottom: 40px" class="primary-text size-3">Изменить пароль</h2>
    <div v-on:click="close()" class="close pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
      </svg>
    </div>
    <form @submit.prevent="tryChange()">
      <input required v-if="noOld === false" type="password" minlength="6" v-model="old_password" placeholder="Введите старый пароль">
      <input required type="password" minlength="6" v-model="new_password" placeholder="Введите новый пароль">
      <input required type="password" minlength="6" v-model="new_password_r" placeholder="Повторите новый пароль">
      <input type="submit" value="Изменить">
    </form>
  </div>

</template>

<script>
export default {
  name: "ModalWindowChangePassword",
  props:{
    id: Number,
    noOld: Boolean
  },
  data: function (){
    return {
     old_password: null,
     new_password: null,
     new_password_r: null,
      show: false
    }
  },
  methods:{
    tryChange(){
      if(this.new_password !== this.new_password_r){
        alert("Новые пароли не совпадают")
        return;
      }
      else {
        if (this.noOld === true) {
          this.$store.dispatch('updatePassword', {
            id: this.id,
            new_password: this.new_password
          })
              .then(() => {
                alert("Пароль успешно обновлён")
              })
        } else {
          this.$store.dispatch('updatePassword', {
            old_password: this.old_password,
            new_password: this.new_password
          })
              .then(() => {
                alert("Пароль успешно обновлён")
              })
              .catch(() => {
                alert("Неверный старый пароль")
              })
        }
      }
    },
    close(){
      this.show = false
    },
    open(){
      this.show = true
    }
  }
}
</script>

<style scoped>
.changePasswordWindow {
  position: absolute;
  z-index: 9999;
  width: 770px;
  height: 570px;
  left: calc(50% - 800px / 2);
  top: calc(50% - 600px / 2);
  background: white;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding-top: 30px;
  padding-left: 30px;
  display: inline-block;
  text-align: center;
}

.changePasswordWindow .close {
  border: none;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 30px;
  top: 40px;
  color: transparent;
  z-index: 19999;
}

.changePasswordWindow input{
  font-family: Roboto;
  font-size: 35px;
  margin-top: 25px;
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

.changePasswordWindow input::placeholder{
  color: var(--main-color);
}

.changePasswordWindow input:focus::placeholder{
  color: var(--second-color);
}

.changePasswordWindow input:focus{
  border-radius: 0px;
  border-color: var(--main-color);
  outline: none;
  color: white;
  transition: 1s;
  background: var(--main-color);
}

</style>
