<template>
  <loader id="page-preloader" v-if="loading" object="#81D9C7" color1="#57CCB5" color2="#3A8793" size="5" speed="2" bg="#ffffff" objectbg="#ffffff" opacity="100" name="circular"></loader>
</template>

<script>
import {loader} from "vue-ui-preloader";
export default {
  name: "preloader",
  data: function () {
    return{
      loading: false
    }
  },
  components: {
    loader
  },
  methods:{
    show(){
      this.loading = true
    },
    close(){
      this.loading = false
    }
  }
}
</script>

<style scoped>
preloader{
  opacity: 100;
}

</style>
