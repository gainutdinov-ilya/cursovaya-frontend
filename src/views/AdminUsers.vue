<template>
  <div class="display">
    <div v-for="user in users" :key="user.id">
      <div v-if="user.role !== 'admin'">
        <user-info-in-line v-bind:user="user"></user-info-in-line>
      </div>
    </div>
  </div>
</template>

<style>
.display{
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
  height: 80vh;
}

</style>

<script>
import UserInfoInLine from "@/components/UserInfoInLine";
export default {
  name: 'AdminListUsers',
  components:{
    UserInfoInLine
  },
  data: function (){
    return {
      users:{

      },
      offset: 0,
      limit: 20,
      count: 0,
    }
  },
  methods:{
    getUsers(){
      this.$store.dispatch('getUsers', this.offset, this.limit)
      .then(answer =>{
        this.users = answer
      })
    }
  },
  mounted() {
    this.count = this.$store.dispatch('getUsersCount')
    this.getUsers()
  }
}
</script>
