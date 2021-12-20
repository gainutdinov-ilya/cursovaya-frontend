<template>
  <div class="display">
    <h2 class="primary-text size-3 first-text">Список пользователей</h2>
    <label v-bind:for="search" class="secondary-text size-2">Поиск по фамилии:</label>
    <input type="text" v-model="search_query" v-bind:id="search" class="styled-input size-2"
           @keydown.enter="query()" @keydown.esc="getUsers()"><br>
    <div class="search-result">
      <div v-for="user in users" :key="user.id">
        <template v-if="this.$store.getters.isAdmin || this.$store.getters.isPersonal && user.role === 'client'">
          <user-info-in-line style="margin-left: 5px"  v-bind:user="user"></user-info-in-line>
        </template>
      </div>
    </div>
    <button class="default-button page-button left pointer" v-if="0 <= (offset - limit)" @click="back(); getUsers()">Назад</button>
    <button class="disabled default-button page-button left" v-else>Назад</button>
    <button class="default-button page-button right pointer" v-if="count > (limit + offset)" @click="next(); getUsers()">Далее</button>
    <button class="default-button page-button right" v-else>Далее</button>
    <button class="default-button page-button middle pointer" @click="this.$router.push({path:'/user/register'})">Зарегестрировать нового пользователя</button>
  </div>
  <preloader ref="preloader"></preloader>
</template>


<script>
import UserInfoInLine from "@/components/UserInfoInLine";
import preloader from "@/components/Preloader";
export default {
  name: 'AdminListUsers',
  components:{
    UserInfoInLine,
    preloader
  },
  data: function (){
    return {
      users:{

      },
      offset: 0,
      limit: 6,
      count: 0,
      search_query: null
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
    query() {
      if (this.search_query === null || this.search_query === null) {
        alert("Введите фамилию клиента")
        return
      }
      this.$refs.preloader.show()
      this.$store.dispatch('searchUser', {search: this.search_query})
          .then(data => {
            this.users = data
            this.search_query = null
            this.$refs.preloader.close()
          })
          .catch(() => {
            this.$refs.preloader.close()
            alert("Пользователь не найден")
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

.middle{
  position: absolute;
  bottom: 30px;
  left: 300px;
}

.search-result{
  background: transparent;
  overflow-y: scroll;
  width: 1410px;
  height: 500px;
}
</style>
