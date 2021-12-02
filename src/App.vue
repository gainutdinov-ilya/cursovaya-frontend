<template>
  <navigation></navigation>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: { Navigation }
}

</script>
<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container{
  width: 1440px;
  margin-left: calc(50% - 1440px / 2);
}

a{
  text-decoration: none;
}
a:hover{
  text-decoration: none;
}

:root{
  --main-color: #57CCB5;
  --second-color: #3A8793;
  --another-color: #81D9C7;
}

</style>
