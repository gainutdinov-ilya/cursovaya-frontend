<template>
  <navigation></navigation>
  <router-view/>
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
