<template>
  <navigation></navigation>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: { Navigation },
  mounted(){
      this.$store.dispatch('getCredentials')
  }
}

</script>
<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container{
  box-shadow: 0px 4px 10px 4px rgba(34, 60, 80, 0.2);
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

.pointer{
  cursor: pointer;
}

.size-3{
  font-size: 3em;
}
.size-2{
  font-size: 2em;
}


.primary-text{
  color: var(--main-color);
}

.secondary-text{
  color: var(--second-color);
}


</style>
