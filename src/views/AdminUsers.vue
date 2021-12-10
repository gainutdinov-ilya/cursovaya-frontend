<template>
  <div class="display">
    <div v-for="user in users" :key="user.id">
      <div>
        <user-info-in-line v-bind:user="user"></user-info-in-line>
      </div>
    </div>
    <button class="default-button page-button left pointer" v-if="0 <= (offset - limit)" @click="back(); getUsers()">Назад</button>
    <button class="disabled default-button page-button left" v-else>Назад</button>
    <button class="default-button page-button right pointer" v-if="count > (limit + offset)" @click="next(); getUsers()">Далее</button>
    <button class="default-button page-button right" v-else>Далее</button>
  </div>
</template>


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
      limit: 8,
      count: 0,
    }
  },
  methods:{
    getUsers(){
      this.$store.dispatch('getUsers', {
        limit: this.limit,
        offset: this.offset
      })
      .then(answer =>{
        this.users = answer
      })
    },
    next(){
      this.offset = this.offset + this.limit
    },
    back(){
      this.offset = this.offset - this.limit
    }
  },
  mounted() {
    this.$store.dispatch('getUsersCount')
    .then(promise =>{
      this.count = promise.count
    })
    this.getUsers()
  }
}
</script>

<style scoped>
.display{
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
  height: 80vh;

}
.page-button{
  font-size: 32px;
}
.left{
  position: absolute;
  bottom: 30px;
}

.right{
  position: absolute;
  bottom: 30px;
  left: 150px;
}


</style>
