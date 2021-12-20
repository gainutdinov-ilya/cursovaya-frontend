<template>
  <div class="user">
    <div>{{user.id}}</div>
    <div>{{user.surname}}</div>
    <div>{{user.name}}</div>
    <div>{{user.second_name}}</div>
    <div>Роль:
      <div v-if="user.role === 'admin'">Администратор</div>
      <div v-else-if="user.role === 'client'">Клиент</div>
      <div v-else-if="user.role === 'personal'">Персонал</div>
      <div v-else-if="user.role === 'doctor'">Врач</div>
    </div>
    <button class="default-button pointer right resize" @click="goToEdit()">Редактировать</button>
  </div>
</template>

<script>
export default {
  name: "UserInfoInLine",
  props:{
    user: Object
  },
  methods:{
    goToEdit(){
      this.$router.push({path: "/user/"+ this.user.id} )
    }
  }
}
</script>

<style scoped>
.user{
  box-shadow: 0px 4px 10px 4px rgba(34, 60, 80, 0.2);
  display: inline-block;
  position: relative;
  margin-top: 30px;
  width: 1370px;
  padding: 5px;
  color: #57CCB5;
}

.user div{
  display: inline-block;
  position: relative;
  font-size: 32px;
  margin-right: 10px;
}

.user button{
  font-size: 18px;
}

.right{
  float:right;
}
.resize{
  height: 35px;
  margin: 0;
}
</style>
