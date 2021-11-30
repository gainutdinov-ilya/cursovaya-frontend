<template>

  <div v-if="show" class="login" id="loginBlock">
    <div class="box">
      <div v-on:click="changeState()" class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
        </svg>
      </div>
      <div class="loginBlock"><router-link class="button-login" to="/login">Личный кабинет</router-link>
        <div class="block"></div>
        <div class="text">
          <li>Уже</li>
          <li>бывали</li>
          <li>у нас?</li>
          <li>Тогда</li>
          <li>вам в</li>
        </div>
      </div>
      <div class="registerBlock"><router-link class="button-register" to="#">Присоедениться</router-link>
        <div class="text">
          <li>если</li>
          <li>ещё не</li>
          <li>бывали</li>
          <li>у нас</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  data: function () {
    return {
      show: false
    }
  },
  methods: {
    changeState: function () {
      this.show = !this.show
    }
  }
}
</script>

<style>.login {
  z-index: 9998;
  position: fixed;
  backdrop-filter: blur(24px);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.login .box {
  position: absolute;
  z-index: 9999;
  width: 800px;
  height: 600px;
  left: calc(50% - 800px / 2);
  top: calc(50% - 600px / 2);
  background: white;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.login .close {
  border: none;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 50px;
  top: 50px;
  color: transparent;
}

.login .close:focus {
  border: none;
}

.login .box .loginBlock {
  position: absolute;
  width: 320px;
  height: 450px;
  left: 100px;
  top: 100px;
}

.login .box .loginBlock .block {
  background: var(--second-color);
  position: absolute;
  z-index: 10000;
  width: 50px;
  top: 15px;
  height: 400px;
}

.login .box .loginBlock .text {
  position: absolute;
  left: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 70px;
  color: var(--second-color);
}

.login .box .loginBlock .text li {
  list-style: none;
}

.login .box .loginBlock .button-login {
  background: var(--main-color);
  color: var(--second-color);
  position: absolute;
  padding-left: 10px;
  padding-right: 10px;
  height: 65px;
  top: 350px;
  left: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
}

.login .box .registerBlock {
  position: absolute;
  width: 260px;
  height: 450px;
  left: 420px;
  top: 100px;
}

.login .box .registerBlock .button-register {
  position: absolute;
  padding-left: 15px;
  padding-right: 15px;
  height: 65px;
  color: white;
  background: var(--second-color);
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
}

.login .box .registerBlock .text {
  margin-top: 70px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 65px;
  line-height: 70px;
  color: var(--main-color);
}

.login .box .registerBlock .text li {
  list-style-type: none;
}
</style>
