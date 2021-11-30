<template>
    <form id="login" class="login-form">
      <h2 class="text">Авторизация</h2>
      <input type="email" name="email" placeholder="Электронная почта" required><br>
      <input type="password" name="password" placeholder="Пароль" required><br>
      <input type="button" onclick="login();" value="Войти"><br>
      <a href="restore-password">Забыли пароль?</a><br>
      <a href="register">Нет аккаунта?</a>
    </form>

</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
.login-form{
  position: absolute;
  width: 800px;
  height: 600px;
  left: calc(50% - 800px/2);
  top: calc(50% - 600px/2);
  background: white;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  text-align: center;
}

.login-form input{
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

.login-form input::placeholder{
  color: var(--main-color);
}

.login-form input:focus::placeholder{
  color: var(--second-color);
}

.login-form input:focus{
  border-radius: 0px;
  border-color: var(--main-color);
  outline: none;
  color: white;
  transition: 1s;
  background: var(--main-color);
}

.login-form .text{
  font-family: Roboto;
  margin-top: 75px;
  color: var(--main-color);
  font-size: 48px;
}

.login-form input[type="submit" i]{
  background-color: white;
  transition: 2s;
}

.login-form input[type="submit" i]:hover{
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

.login-form input[type="password" i]{
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

.login-form a{
  font-family: Roboto;
  text-decoration: var(--second-color) solid;
  text-decoration-line: underline;
  color: var(--second-color);
  font-size: 28px;
  transition: 1s;
}

.login-form a:hover{
  color: var(--main-color);
  transition: 1s;
}

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
