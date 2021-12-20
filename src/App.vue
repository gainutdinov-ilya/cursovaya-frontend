<template>
  <navigation></navigation>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  mounted() {
    this.$store.dispatch('getCredentials')
    let interval = setInterval(() => {
      if (this.$store.getters.loggedIn !== true)
        return
      this.$store.dispatch('getCredentials')
          .catch(() => {
            alert("Похоже время вашего сеанса вышло, авторизуйтесь заново")
            this.$store.dispatch('logout')
            this.$router.push({path: `/login`})
            clearInterval(interval)
          })
    }, 30000)

  }
}

</script>
<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  box-shadow: 0px 4px 10px 4px rgba(34, 60, 80, 0.2);
  width: 1440px;
  margin-left: calc(50% - 1440px / 2);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

:root {
  --main-color: #57CCB5;
  --second-color: #3A8793;
  --another-color: #81D9C7;
}
*::-webkit-scrollbar-button {
  background-color: rgba(34, 60, 80, 0.1);
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

*::-webkit-scrollbar {
  z-index: 9999999;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(34, 60, 80, 0.1);
  border-radius: 50px;
}

.scroll{
  overflow: scroll;
}

h2 {
  margin: 0px;
}

.pointer {
  cursor: pointer;
}

.size-3 {
  font-size: 3em;
}

.size-2 {
  font-size: 2em;
}

.size-1 {
  font-size: 1em;
}
.primary-text {
  color: var(--main-color);
}

.secondary-text {
  color: var(--second-color);
}


.default-button {
  font-family: Roboto;
  font-size: 35px;
  margin-top: 25px;
  height: 65px;
  text-align: center;
  border-radius: 0px;
  border: 2px solid var(--main-color);
  padding: 0 0 0 0;
  color: var(--main-color);
  box-sizing: unset;
  background: transparent;
  transition: 1s;
  padding-left: 10px;
  padding-right: 10px;
}

.default-button:hover{
  transition: 2s;
  background-color: var(--main-color);
  color:white;
}

.default-button::placeholder{
  color: var(--main-color);
}

.default-button :focus::placeholder{
  color: var(--second-color);
}


.default-button-margin {
  font-family: Roboto;
  font-size: 35px;
  margin-top: 25px;
  height: 65px;
  text-align: center;
  border-radius: 0px;
  border: 2px solid var(--main-color);
  padding: 0 0 0 0;
  color: var(--main-color);
  box-sizing: unset;
  background: transparent;
  transition: 1s;
  padding-left: 10px;
  padding-right: 10px;
}
.default-button-margin:hover{
  transition: 2s;
  background-color: var(--main-color);
  color:white;
}

.default-button-margin::placeholder{
  color: var(--main-color);
}

.default-button-margin:focus::placeholder{
  color: var(--second-color);
}

.pointer {
  cursor: pointer;
}

.default-button-size {
  font-size: 32px
}

hr {
  background-color: #81D9C7
}

.display {
  height: 80vh;
  width: 1410px;
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
  padding-top: 15px;
}

.styled-input{
  font-family: Roboto;
  padding: 0;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px;
  color: #3A8793;
}


.styled-input:focus{
  padding: 0;
  outline: none;
  border: none;
  transition: 1s;
  border-bottom: solid 1px var(--second-color);
  width: 350px
}

</style>
