<template>
  <div class="user">
    <div>{{user.surname}}</div>
    <div>{{user.name}}</div>
    <div>{{user.second_name}}</div>
    <div>Роль: {{user.role}}</div>
  </div>
</template>

<script>
export default {
  name: "UserInfoInLine",
  props:{
    user: Object
  }
}
</script>

<style scoped>
.user{
  box-shadow: 0px 4px 10px 4px rgba(34, 60, 80, 0.2);
  display: inline-block;
  position: relative;
  width: 1350px;
  height: 40px;
  margin-top: 30px;
}

.user div{
  display: inline-block;
  position: relative;
  font-size: 32px;
  margin-right: 10px;
}

</style>
