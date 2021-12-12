<template>
  <nav>
    <div class="branding"><RouterLink class="no-link" to="/"><h2>SuckMaster69</h2></RouterLink></div>
    <div class="navigation">
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link to="/about">Регистратура</router-link></li>
      <li><router-link to="/">Часы работы</router-link></li>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style>

nav{
  position: relative;
  top: 0;
  margin: 0;
  width: 1440px;
  height: 80px;
  left: calc(50% - 1440px/2);
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);

  background: white;
}

nav .navigation{

  position: absolute;
  font-size: 24px;
  right: 0px;
  height: 80px;
  display:inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
}

nav .branding{
  color: var(--main-color);
  position: absolute;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
}

nav .navigation li {
  position: relative;
  margin-right: 25px;
  list-style: none;
}

nav .navigation li a {
  color: var(--main-color) !important;
}

.no-link{
  color: var(--main-color) !important;
}
</style>
